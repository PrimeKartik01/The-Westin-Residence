import { LeadForm, initLeadForm } from "../leadform/LeadForm.js";

export function initHeroSlider({
    containerId,
    slides,
    interval = 6000
}) {

    const container = document.getElementById(containerId);

    if (!container || !slides?.length) return;

    slides.forEach(slide => {
        const img = new Image();
        img.src = slide.image;
    });

    container.className = "relative bg-white";

    container.innerHTML = `

        <div class="relative h-[25rem]  md:h-[48rem] overflow-hidden">

            <!-- Slides -->
            <div class="absolute inset-0">

                ${slides.map((slide, index) => `

                    <div
                        class="
                            hero-slide
                            absolute
                            inset-0
                            transition-opacity
                            duration-[1500ms]
                            ease-in-out
                            ${index === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}
                        "
                    >

                        <img
                            src="${slide.image}"
                            alt="${slide.title}"
                            class="
                                hero-image
                                absolute
                                inset-0
                                w-full
                                h-full
                                object-cover
                            "
                        >

                        <div class="absolute inset-0 bg-black/55"></div>

                    </div>

                `).join("")}

            </div>

            <!-- Content -->
            <div class="relative z-20 h-full">

                <div class="container mx-auto px-6 h-full">

                    <div class="grid lg:grid-cols-2 gap-12 h-full items-center">

                        <!-- Left -->
                        <div class="text-white text-center lg:text-left space-y-6">
                            <h1
                                id="hero-title"
                                class="text-2xl lg:text-7xl font-bold font-serif leading-tight transition-all duration-500"
                            >
                                ${slides[0].title}
                            </h1>

                            <p
                                id="hero-subtitle"
                                class="text-md lg:text-2xl text-royal-gold font-sans font-light tracking-widest transition-all duration-500 uppercase"
                            >
                                ${slides[0].subtitle}
                            </p>

                        </div>

                        <!-- Right -->
                        <div
                            class="
                                hidden
                                lg:flex
                                justify-end
                            "
                        >

                            ${LeadForm()}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;
    initLeadForm();

    const slideElements =
        container.querySelectorAll(".hero-slide");

    const heroTitle =
        container.querySelector("#hero-title");

    const heroSubtitle =
        container.querySelector("#hero-subtitle");

    let current = 0;

    // First slide zoom animation
    const firstImage =
        slideElements[0].querySelector(".hero-image");

    firstImage.style.animation =
        `heroZoom ${interval}ms ease-out forwards`;

    const changeSlide = () => {

        const next =
            (current + 1) % slides.length;

        // Hide Current
        slideElements[current]
            .classList.remove("opacity-100", "z-10");

        slideElements[current]
            .classList.add("opacity-0", "z-0");

        // Show Next
        slideElements[next]
            .classList.remove("opacity-0", "z-0");

        slideElements[next]
            .classList.add("opacity-100", "z-10");

        // Restart Zoom Animation
        const nextImage =
            slideElements[next].querySelector(".hero-image");

        nextImage.style.animation = "none";

        void nextImage.offsetWidth;

        nextImage.style.animation =
            `heroZoom ${interval}ms ease-out forwards`;

        // Fade Out Text
        heroTitle.classList.add(
            "opacity-0",
            "translate-y-5"
        );

        heroSubtitle.classList.add(
            "opacity-0",
            "translate-y-5"
        );

        setTimeout(() => {

            heroTitle.innerHTML =
                slides[next].title;

            heroSubtitle.innerHTML =
                slides[next].subtitle;

            heroTitle.classList.remove(
                "opacity-0",
                "translate-y-5"
            );

            heroSubtitle.classList.remove(
                "opacity-0",
                "translate-y-5"
            );

        }, 400);

        current = next;

    };

    setInterval(changeSlide, interval);

}