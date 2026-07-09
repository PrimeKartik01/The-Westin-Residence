export function FloatingCTA() {

    // Don't inject twice
    if (document.getElementById("floating-cta-wrapper")) return;

    const wrapper = document.createElement("div");
    wrapper.id = "floating-cta-wrapper";
    wrapper.innerHTML = `
        <div class="fixed bottom-6 right-6 z-[45] flex flex-col items-end gap-3">

            <!-- Call Button -->
            <a
                id="floating-call-btn"
                href="tel:+919999999999"
                class="
                    group
                    flex items-center gap-3
                    bg-gradient-to-r from-emerald-600 to-emerald-500
                    hover:from-emerald-700 hover:to-emerald-600
                    text-white
                    pl-5 pr-6 py-3.5
                    rounded-full
                    shadow-lg shadow-emerald-600/30
                    hover:shadow-emerald-600/50
                    transition-all duration-300
                    hover:scale-105
                    font-sans font-semibold text-sm
                    tracking-wide
                "
                aria-label="Call us now"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="hidden sm:inline">Call Now</span>
            </a>

            <!-- Enquire / Form Button -->
            <button
                id="floating-enquire-btn"
                class="
                    group
                    flex items-center gap-3
                    bg-gradient-to-r from-royal-gold to-[#d4b88e]
                    hover:from-royal-gold-dark hover:to-royal-gold
                    text-royal-navy
                    pl-5 pr-6 py-3.5
                    rounded-full
                    shadow-lg shadow-royal-gold/30
                    hover:shadow-royal-gold/50
                    transition-all duration-300
                    hover:scale-105
                    font-serif font-bold text-sm
                    tracking-widest uppercase
                "
                aria-label="Enquire now"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="hidden sm:inline">Enquire Now</span>
            </button>

        </div>
    `;

    document.body.appendChild(wrapper);

    // Enquire button opens the lead modal
    const enquireBtn = wrapper.querySelector("#floating-enquire-btn");
    if (enquireBtn) {
        enquireBtn.addEventListener("click", () => {
            window.dispatchEvent(new CustomEvent("open-lead-modal"));
        });
    }

    // Show/hide based on scroll (appear after hero section)
    const cta = wrapper.querySelector(".fixed");
    let visible = false;

    function toggleVisibility() {
        if (window.scrollY > 400) {
            if (!visible) {
                cta.style.opacity = "1";
                cta.style.transform = "translateY(0)";
                cta.style.pointerEvents = "auto";
                visible = true;
            }
        } else {
            if (visible) {
                cta.style.opacity = "0";
                cta.style.transform = "translateY(20px)";
                cta.style.pointerEvents = "none";
                visible = false;
            }
        }
    }

    // Initial state: hidden
    cta.style.opacity = "0";
    cta.style.transform = "translateY(20px)";
    cta.style.pointerEvents = "none";
    cta.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
}
