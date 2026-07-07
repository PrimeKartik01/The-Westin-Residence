export function initNavbar({
    containerId,
    data
}) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `
    
    <nav
        id="main-navbar"
        class="fixed top-0 pt-4 max-w-[1700px] left-1/2 -translate-x-1/2 w-full z-50 transition-all duration-500"
    >

        <div
            class="w-full  px-6 lg:px-8"
        >

            <div
                class="flex items-center justify-between h-20"
            >

                <!-- Logo -->
                <a href="index.html">

                    <img
                        src="${data.logo}"
                        alt="Logo"
                        class="h-20 object-cover"
                    >

                </a>

                

                <!-- Right Actions -->
                <div class="flex items-center gap-6">

                    <!-- Desktop CTA -->
                    <a
                        href="javascript:void(0)"
                        class="enquire-now-cta hidden  lg:inline-flex items-center px-6 py-3 z-10 bg-white text-royal-navy font-bold rounded-full hover:scale-105 hover:bg-royal-gold-dark transition-all duration-300 font-serif tracking-widest uppercase text-xs shadow-md shadow-royal-gold/15"
                    >
                        ${data.ctaText}
                    </a>

                    <!-- Toggle Button -->
                    <button
                        id="mobile-menu-btn"
                        class="text-white hover:text-royal-gold transition-colors duration-300 text-3xl cursor-pointer"
                    >
                        ☰
                    </button>

                </div>

            </div>

        </div>

    </nav>

    <!-- Overlay -->
    <div
        id="mobile-overlay"
        class="fixed inset-0 bg-black/50 opacity-0 invisible transition-all duration-300 z-[60]"
    ></div>

    <!-- Drawer (Visible on both mobile & desktop) -->
    <div
        id="mobile-menu"
        class="fixed top-0 right-0 h-screen w-[280px] bg-black backdrop-blur-xl translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-[70]"
    >
            <div class="p-6">

            <div class="flex justify-end">

                <button
                     id="close-menu"
                     class="text-white text-3xl"
                >
                     ×
                </button>

            </div>

            <div
                class="flex flex-col gap-8 mt-10"
            >

                ${data.links.map(link => `
                    <a
                        href="${link.href}"
                        class="text-white font-serif uppercase tracking-widest text-xs hover:text-royal-gold transition-colors duration-300"
                    >
                        ${link.label}
                    </a>
                `).join("")}

                <a
                    href="javascript:void(0)"
                    class="enquire-now-cta mt-4 px-5 py-3 bg-royal-gold text-royal-navy hover:bg-royal-gold-dark rounded-full text-center font-serif font-bold tracking-widest uppercase text-xs transition-colors duration-300"
                >
                    ${data.ctaText}
                </a>

            </div>

        </div>

    </div>
    `;

    const navbar =
        document.getElementById("main-navbar");

    const mobileBtn =
        document.getElementById("mobile-menu-btn");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileOverlay =
        document.getElementById("mobile-overlay");

    const closeMenu =
        document.getElementById("close-menu");

    function openMenu() {

        document.body.style.overflow = "hidden";

        mobileMenu.classList.remove(
            "translate-x-full"
        );

        mobileOverlay.classList.remove(
            "opacity-0",
            "invisible"
        );

    }

    function closeMobileMenu() {

        document.body.style.overflow = "";

        mobileMenu.classList.add(
            "translate-x-full"
        );

        mobileOverlay.classList.add(
            "opacity-0",
            "invisible"
        );

    }

    mobileBtn.addEventListener(
        "click",
        openMenu
    );

    closeMenu.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

    // Bind click event to Enquire Now CTAs to open modal popup
    container.querySelectorAll(".enquire-now-cta").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("open-lead-modal"));
        });
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.classList.add(
                "bg-royal-navy/90",
                "backdrop-blur-md",
                "shadow-lg",
                "border-b",
                "border-royal-gold/20"
            );

        } else {

            navbar.classList.remove(
                "bg-royal-navy/90",
                "backdrop-blur-md",
                "shadow-lg",
                "border-b",
                "border-royal-gold/20"
            );

        }

    });

}