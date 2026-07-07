import { leadFormData } from "../../data/leadFormData.js";

export function LeadForm() {

    const requirementOptions = leadFormData.requirements
        .map(option => `
            <option value="${option.value}">
                ${option.label}
            </option>
        `)
        .join("");

    return `
        <div class="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden mt-8">

            <div class="bg-royal-navy px-8 py-6 ">
                <h2 class="text-3xl font-bold font-serif text-royal-gold">
                    Enquire Now
                </h2>

                <p class="text-slate-300 mt-2 font-sans font-light text-sm">
                    Fill the details and our residence expert will contact you shortly.
                </p>
            </div>

            <form
                id="lead-form"
                class="p-8 space-y-5 bg-white"
            >

                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        class="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-colors font-sans"
                        required
                    >
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        class="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-colors font-sans"
                        required
                    >
                </div>

                <div>
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        class="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-colors font-sans"
                        required
                    >
                </div>

                <div>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        class="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-colors font-sans"
                    >
                </div>

                <div>
                    <select
                        name="requirement"
                        class="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-colors font-sans"
                        required
                    >
                        <option value="">
                            Select Requirement
                        </option>

                        ${requirementOptions}
                    </select>
                </div>

                <button
                    type="submit"
                    class="w-full bg-royal-gold hover:bg-royal-gold-dark transition-all duration-300 text-royal-navy font-serif font-bold tracking-widest uppercase py-3.5 rounded-lg shadow-md hover:shadow-royal-gold/20"
                >
                    Submit Enquiry
                </button>

            </form>

        </div>
    `;

}