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
            <section class="py-16 md:py-24 bg-gradient-to-b from-[#0b1325] via-[#0f1a35] to-[#0b1325] border-b border-royal-gold/10 relative overflow-hidden">
                
                <!-- Decorative elements -->
                <div class="absolute top-0 left-0 w-72 h-72 bg-royal-gold/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-royal-gold/3 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-royal-gold/5 rounded-full opacity-30"></div>

                <div class="container mx-auto px-6 relative z-10">

                    <!-- Section Header -->
                    <div class="text-center mb-12 md:mb-16">
                        <span class="inline-block px-6 py-2.5 rounded-full bg-royal-gold/10 text-royal-gold font-serif tracking-[0.2em] uppercase text-xs border border-royal-gold/20 font-semibold mb-6">
                            Site Overview
                        </span>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mt-4 leading-tight">
                            Master <span class="text-royal-gold">Plan</span>
                        </h2>
                        <p class="text-slate-400 mt-5 max-w-xl mx-auto font-sans font-light leading-relaxed text-sm md:text-base">
                            Explore the meticulously designed layout of The Westin Residence — 
                            where every detail is crafted for an elevated living experience.
                        </p>
                    </div>

                    <!-- Master Plan Image Container -->
                    <div class="relative max-w-5xl mx-auto">
                        
                        <!-- Outer glow frame -->
                        <div class="absolute -inset-1 bg-gradient-to-br from-royal-gold/20 via-transparent to-royal-gold/20 rounded-[2rem] blur-sm"></div>
                        
                        <div class="relative rounded-[1.8rem] overflow-hidden border border-royal-gold/25 shadow-[0_20px_80px_-20px_rgba(197,168,128,0.15)] bg-[#0a0f1e]">

                            <!-- Top info bar -->
                            <div class="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-[#0d1529] via-[#111d3a] to-[#0d1529] border-b border-royal-gold/10">
                                <div class="flex items-center gap-3">
                                    <div class="w-2.5 h-2.5 rounded-full bg-royal-gold/70 animate-pulse"></div>
                                    <span class="text-royal-gold/80 text-[11px] font-sans tracking-widest uppercase font-medium">
                                        ${masterPlanTitle}
                                    </span>
                                </div>
                                ${isSubmitted ? `
                                    <div class="flex items-center gap-2 text-emerald-400/80 text-[11px] font-sans tracking-wider uppercase">
                                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                        Unlocked
                                    </div>
                                ` : `
                                    <div class="flex items-center gap-2 text-slate-500 text-[11px] font-sans tracking-wider uppercase">
                                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        Locked
                                    </div>
                                `}
                            </div>

                            <!-- The image -->
                            <div class="relative">
                                <img
                                    src="${masterPlanImage}"
                                    alt="${masterPlanTitle}"
                                    id="master-plan-img"
                                    class="w-full object-cover transition-all duration-700 ${isSubmitted ? "" : "blur-xl scale-105 select-none pointer-events-none"}"
                                >

                                <!-- Lock Overlay (shown only if not submitted) -->
                                ${isSubmitted ? "" : `
                                    <div id="master-plan-overlay" class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 flex flex-col items-center justify-center text-white text-center px-6">

                                        <!-- Animated lock icon -->
                                        <div class="relative mb-6">
                                            <div class="absolute inset-0 bg-royal-gold/10 rounded-full blur-2xl scale-150 animate-pulse"></div>
                                            <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-royal-gold/20 to-royal-gold/5 border border-royal-gold/30 flex items-center justify-center backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-royal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <h3 class="text-2xl md:text-3xl font-bold font-serif text-royal-gold mb-2">
                                            Exclusive Access
                                        </h3>
                                        <p class="text-slate-300/80 mt-2 text-sm font-sans font-light max-w-sm mx-auto leading-relaxed">
                                            Submit your enquiry to unlock the complete master plan 
                                            of The Westin Residence.
                                        </p>

                                        <button
                                            id="unlock-master-plan-btn"
                                            class="
                                                mt-8
                                                group
                                                relative
                                                inline-flex items-center gap-3
                                                px-10 py-3.5
                                                bg-gradient-to-r from-royal-gold to-[#d4b88e]
                                                hover:from-royal-gold-dark hover:to-royal-gold
                                                text-royal-navy
                                                font-serif
                                                font-bold
                                                uppercase
                                                tracking-[0.15em]
                                                text-xs
                                                rounded-full
                                                shadow-xl shadow-royal-gold/25
                                                transition-all duration-300
                                                hover:scale-105 hover:shadow-royal-gold/40
                                            "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                            </svg>
                                            Unlock Master Plan
                                        </button>
                                    </div>
                                `}
                            </div>

                        </div>
                    </div>

                    <!-- Action buttons row -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        ${isSubmitted ? `
                            <a
                                href="${masterPlanImage}"
                                download="${masterPlanTitle.replace(/\\s+/g, "_")}.jpg"
                                class="
                                    inline-flex items-center gap-3
                                    px-10 py-4
                                    bg-gradient-to-r from-royal-gold to-[#d4b88e]
                                    hover:from-royal-gold-dark hover:to-royal-gold
                                    text-royal-navy
                                    font-serif
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-xs
                                    rounded-full
                                    shadow-xl shadow-royal-gold/25
                                    transition-all duration-300
                                    hover:scale-105 hover:shadow-royal-gold/40
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Master Plan
                            </a>
                        ` : `
                            <button
                                id="masterplan-enquire-btn"
                                class="
                                    inline-flex items-center gap-3
                                    px-10 py-4
                                    bg-gradient-to-r from-royal-gold to-[#d4b88e]
                                    hover:from-royal-gold-dark hover:to-royal-gold
                                    text-royal-navy
                                    font-serif
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-xs
                                    rounded-full
                                    shadow-xl shadow-royal-gold/25
                                    transition-all duration-300
                                    hover:scale-105 hover:shadow-royal-gold/40
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                                Enquire Now
                            </button>
                        `}
                    </div>

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

        // "Enquire Now" button below the master plan image
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
            downloadDiv.className = "flex items-center justify-center mt-10";
            downloadDiv.id = "master-download-btn";
            downloadDiv.innerHTML = `
                <a
                    href="${masterPlanImage}"
                    download="${masterPlanTitle.replace(/\\s+/g, "_")}.jpg"
                    class="
                        inline-flex items-center gap-3
                        px-10 py-4
                        bg-gradient-to-r from-royal-gold to-[#d4b88e]
                        hover:from-royal-gold-dark hover:to-royal-gold
                        text-royal-navy
                        font-serif
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-xs
                        rounded-full
                        shadow-xl shadow-royal-gold/25
                        transition-all duration-300
                        hover:scale-105 hover:shadow-royal-gold/40
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Master Plan
                </a>
            `;

            // Remove the enquire button row if present
            const enquireRow = container.querySelector("#masterplan-enquire-btn")?.closest(".flex");
            if (enquireRow) enquireRow.remove();

            section.appendChild(downloadDiv);
        }

        // Update status bar
        const statusBar = container.querySelector(".border-b.border-royal-gold\\/10 .text-slate-500");
        if (statusBar) {
            statusBar.innerHTML = `
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Unlocked
            `;
            statusBar.className = "flex items-center gap-2 text-emerald-400/80 text-[11px] font-sans tracking-wider uppercase";
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

        // Small timeout to ensure transition triggers reliably
        setTimeout(() => {
            modal.classList.remove("opacity-0", "pointer-events-none");
            const content = modal.querySelector("#modal-content-container");
            if (content) content.classList.remove("scale-95");
        }, 20);

        const closeModal = () => {
            modal.classList.add("opacity-0", "pointer-events-none");
            const content = modal.querySelector("#modal-content-container");
            if (content) content.classList.add("scale-95");
            // Remove the modal from DOM completely after it transition closes
            setTimeout(() => {
                modal.remove();
            }, 300);
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
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        unlockMasterPlan();
    });

    render();
}
