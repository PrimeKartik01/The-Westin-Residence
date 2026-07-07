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

            <div class="bg-royal-navy px-8 py-6">
                <h2 class="text-3xl font-bold font-serif text-royal-gold">
                    Enquire Now
                </h2>

                <p class="text-slate-300 mt-2 text-sm">
                    Fill the details and our residence expert will contact you shortly.
                </p>
            </div>

            <form
                id="lead-form"
                class="p-8 space-y-5 bg-white"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    class="w-full border rounded-lg px-4 py-3"
                    required
                >

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    class="w-full border rounded-lg px-4 py-3"
                    required
                >

                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    class="w-full border rounded-lg px-4 py-3"
                    required
                >

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    class="w-full border rounded-lg px-4 py-3"
                >

                <select
                    name="requirement"
                    class="w-full border rounded-lg px-4 py-3"
                    required
                >
                    <option value="">Select Requirement</option>

                    ${requirementOptions}

                </select>

                <button
                    id="lead-submit-btn"
                    type="submit"
                    class="w-full bg-royal-gold py-3 rounded-lg font-bold"
                >
                    Submit Enquiry
                </button>

            </form>

        </div>
    `;
}

export function initLeadForm() {

    const form = document.getElementById("lead-form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button =
            document.getElementById("lead-submit-btn");

        button.disabled = true;
        button.innerText = "Submitting...";

        const data = {

            name: form.name.value,

            email: form.email.value,

            mobile: form.mobile.value,

            city: form.city.value,

            requirement: form.requirement.value

        };

        try {

            const response = await fetch("http://localhost:3000/api/lead", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });

            const result =
                await response.json();

            alert(result.message);

            if (result.success) {

                form.reset();

            }

        } catch (error) {

            console.error(error);

            alert("Unable to submit enquiry.");

        }

        button.disabled = false;
        button.innerText = "Submit Enquiry";

    });

}