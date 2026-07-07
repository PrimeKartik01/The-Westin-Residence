export function Gallery({
    containerId,
    images = [],
    video = "",
    interval = 5000
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    let current = 0;

    container.innerHTML = `

        <section class="py-20 bg-royal-navy text-white">

            <div class="container mx-auto px-6">

                <div class="text-center mb-12">

                    <h2 class="text-4xl lg:text-5xl font-serif font-bold text-royal-gold">
                        Gallery & Video Tour
                    </h2>

                    <p class="text-slate-300 mt-4 max-w-2xl mx-auto font-sans font-light">
                        Explore our premium project through images and an immersive walkthrough.
                    </p>

                </div>

                <div class="grid lg:grid-cols-2 gap-10 items-center">

                    <!-- Image Slider -->
                    <div class="relative overflow-hidden rounded-3xl shadow-2xl h-[450px] border border-royal-gold/20">

                        <div id="gallery-slider" class="relative w-full h-full">

                            ${images.map((image, index) => `
                                <img
                                    src="${image}"
                                    class="
                                        gallery-slide
                                        absolute
                                        inset-0
                                        w-full
                                        h-full
                                        object-cover
                                        transition-opacity
                                        duration-700
                                        ${index === 0 ? "opacity-100" : "opacity-0"}
                                    "
                                >
                            `).join("")}

                        </div>
                        <!-- Previous -->
                        <button
                            id="gallery-prev"
                            class="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                bg-royal-navy/85
                                border
                                border-royal-gold/30
                                text-royal-gold
                                hover:bg-royal-gold
                                hover:text-royal-navy
                                backdrop-blur-md
                                rounded-full
                                w-12
                                h-12
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                transition-all
                                duration-300
                                cursor-pointer
                            "
                        >
                            ❮
                        </button>

                        <!-- Next -->
                        <button
                            id="gallery-next"
                            class="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                bg-royal-navy/85
                                border
                                border-royal-gold/30
                                text-royal-gold
                                hover:bg-royal-gold
                                hover:text-royal-navy
                                backdrop-blur-md
                                rounded-full
                                w-12
                                h-12
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                transition-all
                                duration-300
                                cursor-pointer
                            "
                        >
                            ❯
                        </button>

                    </div>

                    <!-- Video -->
                    <div class="rounded-3xl overflow-hidden shadow-2xl border border-royal-gold/20">

                        <iframe
                            class="w-full h-[450px]"
                            src="${video}"
                            allowfullscreen
                        ></iframe>

                    </div>

                </div>

            </div>

        </section>

    `;

    const slides =
        container.querySelectorAll(".gallery-slide");

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("opacity-100");
            slide.classList.add("opacity-0");
        });

        slides[index].classList.remove("opacity-0");
        slides[index].classList.add("opacity-100");

    }

    function nextSlide() {

        current =
            (current + 1) % slides.length;

        showSlide(current);

    }

    function prevSlide() {

        current =
            (current - 1 + slides.length) % slides.length;

        showSlide(current);

    }

    container.querySelector("#gallery-next")
        .addEventListener("click", nextSlide);

    container.querySelector("#gallery-prev")
        .addEventListener("click", prevSlide);

    setInterval(nextSlide, interval);

}