import { LeadForm, initLeadForm } from "../leadform/LeadForm.js";

export function FloorPlans({
    containerId,
    plans = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    let targetPlanToDownload = null;
    let pendingBHK = null;

    function checkSubmitted() {
        return localStorage.getItem("leadSubmitted") === "true";
    }

    function triggerDownload(imagePath, fileName) {
        const link = document.createElement("a");
        link.href = imagePath;
        link.download = fileName || "floor-plan.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function render() {
        const isSubmitted = checkSubmitted();

        container.innerHTML = `

            <section class="py-8 bg-royal-cream border-b border-royal-gold/10">

                <div class="container mx-auto px-6">

                    <div class="text-center mb-16">

                        <span class="inline-block px-5 py-2 rounded-full bg-royal-gold/10 text-royal-gold font-serif tracking-widest uppercase text-xs border border-royal-gold/20 font-semibold">
                            Floor Plans
                        </span>

                        <h2 class="text-4xl lg:text-5xl font-bold font-serif text-royal-navy mt-4">
                            Choose Your Perfect Residence
                        </h2>

                        <p class="text-slate-600 mt-4 max-w-2xl mx-auto font-sans font-light leading-relaxed">
                            Discover thoughtfully designed floor plans featuring expansive layouts,
                            sophisticated architecture, and premium luxury finishes.
                        </p>

                    </div>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        ${plans.map(plan => `

                            <div class="bg-white rounded-3xl overflow-hidden border border-royal-gold/10 shadow-md hover:shadow-2xl transition-all duration-500 group">

                                <!-- Image -->

                                <div class="relative overflow-hidden aspect-[4/3] bg-royal-cream">

                                    <img
                                        src="${plan.image}"
                                        alt="${plan.title}"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isSubmitted ? "" : "blur-md select-none pointer-events-none"}"
                                    >

                                    ${isSubmitted ? "" : `
                                        <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-royal-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span class="text-xs uppercase tracking-wider font-semibold font-sans">Unlock on Enquiry</span>
                                        </div>
                                    `}

                                    <div
                                        class="absolute top-4 left-4 bg-royal-navy/90 text-royal-gold text-[10px] tracking-widest px-4 py-2 rounded-full uppercase font-sans border border-royal-gold/20 backdrop-blur-sm"
                                    >
                                        ${plan.title}
                                    </div>

                                </div>

                                <!-- Content -->

                                <div class="px-2 py-4">

                                    <div class="flex justify-between items-center py-1">

                                        <span class="text-slate-400 font-sans text-xs uppercase tracking-wider">
                                            Super Built-up Area
                                        </span>

                                        <span class="font-sans text-xs uppercase tracking-wider">
                                            ${plan.size}
                                        </span>

                                    </div>

                                    <div class="border-t border-royal-gold/10 my-4"></div>

                                    <div class="flex justify-between items-center py-1">

                                        <span class="text-slate-400 font-sans text-xs uppercase tracking-wider">
                                            Starting Price
                                        </span>

                                        <span class="font-sans text-xs uppercase tracking-wider text-royal-gold">
                                            ${plan.price}
                                        </span>

                                    </div>

                                    <!-- Enquiry Now Button -->
                                 

                                    <!-- Download / Request Floor Plan Button -->
                                    <button
                                        data-title="${plan.title}"
                                        data-image="${plan.image}"
                                        class=" floor-plan-btn mt-3 w-full bg-royal-navy hover:bg-royal-gold text-white hover:text-royal-navy border border-royal-navy  hover:border-royal-gold py-3 rounded-full font-serif uppercase tracking-widest text-[10px] font-semibold shadow-lg shadow-royal-navy/5 transition-all duration-300">
                                        ${isSubmitted ? "Download Floor Plan" : "Request Floor Plan"}
                                    </button>

                                </div>

                            </div>

                        `).join("")}

                    </div>

                </div>

            </section>

        `;

        setupListeners();
    }

    function setupListeners() {
        // Enquiry Now buttons — open modal with BHK pre-selected
        const enquiryBtns = container.querySelectorAll(".floor-plan-enquiry-btn");
        enquiryBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const title = btn.getAttribute("data-title");
                pendingBHK = title;
                openModal(title);
            });
        });

        // Download / Request Floor Plan buttons
        const buttons = container.querySelectorAll(".floor-plan-btn");
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const title = btn.getAttribute("data-title");
                const image = btn.getAttribute("data-image");

                if (checkSubmitted()) {
                    triggerDownload(image, `${title.replace(/\s+/g, "_")}_floor_plan.jpg`);
                } else {
                    targetPlanToDownload = { title, image };
                    pendingBHK = title;
                    openModal(title);
                }
            });
        });
    }

    function openModal(preSelectBHK = null) {
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

        // Pre-select BHK dropdown
        if (preSelectBHK) {
            const selectEl = modal.querySelector("select[name='requirement']");
            if (selectEl) {
                selectEl.value = preSelectBHK;
            }
        }

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
            const modalContent = modal.querySelector("#modal-content-container");
            if (modalContent) modalContent.classList.add("scale-95");
            setTimeout(() => {
                modal.remove();
            }, 300);
        }

        render();

        if (targetPlanToDownload) {
            triggerDownload(targetPlanToDownload.image, `${targetPlanToDownload.title.replace(/\s+/g, "_")}_floor_plan.jpg`);
            targetPlanToDownload = null;
        }

        // Unlock master plan section
        const masterPlanSection = document.getElementById("master-plan");
        if (masterPlanSection) {
            masterPlanSection.dispatchEvent(new CustomEvent("unlock-master-plan"));
        }
    });

    window.addEventListener("open-lead-modal", () => {
        openModal();
    });

    // Auto-popup logic (triggers 10s and 50s after site opening, up to 2 times, if not already submitted)
    let autoPopupCount = 0;
    const maxAutoPopups = 2;

    function triggerAutoPopup() {
        if (checkSubmitted() || autoPopupCount >= maxAutoPopups) return;

        const modal = document.getElementById("lead-modal-popup");
        if (modal && !modal.classList.contains("opacity-0")) return;

        autoPopupCount++;
        openModal();
    }

    if (!checkSubmitted()) {
        setTimeout(triggerAutoPopup, 10000); // 10 seconds
        setTimeout(triggerAutoPopup, 50000); // 50 seconds
    }

    render();

}