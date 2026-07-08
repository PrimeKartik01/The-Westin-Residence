import { LeadForm, initLeadForm } from "../leadform/LeadForm.js";

export function MasterPlan({
    containerId,
    masterPlanImage = "/img/img1.webp",
    masterPlanTitle = "Master Plan"
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    function checkSubmitted() {
        return localStorage.getItem("leadSubmitted") === "true";
    }

    function render() {
        const isSubmitted = checkSubmitted();

        container.innerHTML = `
            <section class="py-24 bg-[#0b1325] border-b border-royal-gold/10">
                <div class="container mx-auto px-6">

                    <!-- Section Header -->
                    <div class="text-center mb-10">
                        <span class="inline-block px-5 py-2 rounded-full bg-royal-gold/10 text-royal-gold font-serif tracking-widest uppercase text-xs border border-royal-gold/20 font-semibold">
                            Site Overview
                        </span>
                        <h2 class="text-4xl lg:text-5xl font-bold font-serif text-white mt-4">
                            Master Plan
                        </h2>
                        
                        </div>
                    </div>

                    <!-- Master Plan Image Container -->
                    <div class="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-royal-gold/20 shadow-2xl shadow-black/60">

                        <!-- The image (blurred until submitted) -->
                        <img
                            src="${masterPlanImage}"
                            alt="${masterPlanTitle}"
                            id="master-plan-img"
                            class="w-full object-cover transition-all duration-700 ${isSubmitted ? "" : "blur-xl scale-105 select-none pointer-events-none"}"
                        >

                        <!-- Lock Overlay (shown only if not submitted) -->
                        ${isSubmitted ? "" : `
                            <div id="master-plan-overlay" class="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white text-center px-6">

                                <div class="mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-royal-gold mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <h3 class="text-2xl font-bold font-serif text-royal-gold">Exclusive Access</h3>
                                    <p class="text-slate-300 mt-3 text-sm font-sans font-light max-w-xs mx-auto leading-relaxed">
                                        Fill in the enquiry form to unlock the full master plan of The Westin Residence.
                                    </p>
                                </div>

                                <button
                                    id="unlock-master-plan-btn"
                                    class="
                                        mt-2
                                        px-10 py-3
                                        bg-royal-gold
                                        hover:bg-royal-gold-dark
                                        text-royal-navy
                                        font-serif
                                        font-semibold
                                        uppercase
                                        tracking-widest
                                        text-xs
                                        rounded-full
                                        shadow-lg shadow-royal-gold/20
                                        transition-all duration-300
                                        hover:scale-105
                                    "
                                >
                                    Unlock Master Plan
                                </button>

                            </div>
                        `}

                    </div>

                    <!-- Download button (only after submission) -->
                    ${isSubmitted ? `
                        <div class="text-center mt-10">
                            <a
                                href="${masterPlanImage}"
                                download="${masterPlanTitle.replace(/\s+/g, "_")}.jpg"
                                class="
                                    inline-flex items-center gap-3
                                    px-10 py-4
                                    bg-royal-gold
                                    hover:bg-royal-gold-dark
                                    text-royal-navy
                                    font-serif
                                    font-semibold
                                    uppercase
                                    tracking-widest
                                    text-xs
                                    rounded-full
                                    shadow-lg shadow-royal-gold/20
                                    transition-all duration-300
                                    hover:scale-105
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Master Plan
                            </a>
                        </div>
                    ` : ""}

                </div>
            </section>
        `;

        setupListeners();
    }

    function setupListeners() {
        const unlockBtn = container.querySelector("#unlock-master-plan-btn");
        if (unlockBtn) {
            unlockBtn.addEventListener("click", () => {
                openModal();
            });
        }

        // "Enquire Now" button above the master plan image
        const enquireBtn = container.querySelector("#masterplan-enquire-btn");
        if (enquireBtn) {
            enquireBtn.addEventListener("click", () => {
                openModal();
            });
        }

        // Listen for unlock from floor plan section
        container.addEventListener("unlock-master-plan", () => {
            unlockMasterPlan();
        });
    }

    function unlockMasterPlan() {
        const img = container.querySelector("#master-plan-img");
        const overlay = container.querySelector("#master-plan-overlay");

        if (img) {
            img.classList.remove("blur-xl", "scale-105", "select-none", "pointer-events-none");
        }

        if (overlay) {
            overlay.style.transition = "opacity 0.7s ease";
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 700);
        }

        // Add download button
        const section = container.querySelector("section > div");
        if (section && !container.querySelector("#master-download-btn")) {
            const downloadDiv = document.createElement("div");
            downloadDiv.className = "text-center mt-10";
            downloadDiv.id = "master-download-btn";
            downloadDiv.innerHTML = `
                <a
                    href="${masterPlanImage}"
                    download="${masterPlanTitle.replace(/\s+/g, "_")}.jpg"
                    class="
                        inline-flex items-center gap-3
                        px-10 py-4
                        bg-royal-gold
                        hover:bg-royal-gold-dark
                        text-royal-navy
                        font-serif
                        font-semibold
                        uppercase
                        tracking-widest
                        text-xs
                        rounded-full
                        shadow-lg shadow-royal-gold/20
                        transition-all duration-300
                        hover:scale-105
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Master Plan
                </a>
            `;
            section.appendChild(downloadDiv);
        }
    }

    function openModal() {
        let modal = document.getElementById("lead-modal-popup");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "lead-modal-popup";
            modal.className = "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300";
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="relative w-full max-w-md scale-95 transition-transform duration-300 ease-out" id="modal-content-container">
                <button id="close-modal-btn" class="absolute top-4 right-4 text-royal-gold hover:text-royal-gold-dark z-50 font-bold text-2xl" aria-label="Close modal">
                    &times;
                </button>
                ${LeadForm("-modal")}
            </div>
        `;

        initLeadForm("-modal");

        requestAnimationFrame(() => {
            modal.classList.remove("opacity-0", "pointer-events-none");
            modal.querySelector("#modal-content-container").classList.remove("scale-95");
        });

        const closeModal = () => {
            modal.classList.add("opacity-0", "pointer-events-none");
            modal.querySelector("#modal-content-container").classList.add("scale-95");
        };

        modal.querySelector("#close-modal-btn").addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    window.addEventListener("lead-submitted", () => {
        const modal = document.getElementById("lead-modal-popup");
        if (modal) {
            modal.classList.add("opacity-0", "pointer-events-none");
            const mc = modal.querySelector("#modal-content-container");
            if (mc) mc.classList.add("scale-95");
        }
        unlockMasterPlan();
    });

    render();
}
