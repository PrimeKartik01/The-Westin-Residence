import { leadFormData } from "../../data/leadFormData.js";

export function LeadForm(idSuffix = "") {

    const requirementOptions = leadFormData.requirements
        .map(option => `
            <option value="${option.value}">
                ${option.label}
            </option>
        `)
        .join("");

    return `
        <div class="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div class="bg-royal-navy px-8 py-6">
                <h2 class="text-3xl font-bold font-serif text-royal-gold">
                    Enquire Now
                </h2>
                <p class="text-slate-300 mt-2 text-sm">
                    Fill the details and our residence expert will contact you shortly.
                </p>
            </div>

            <!-- Step 1: Lead Details Form -->
            <form
                id="lead-form${idSuffix}"
                class="p-8 space-y-5 bg-white"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all"
                    required
                >

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all"
                    required
                >

                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all"
                    required
                >

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all"
                >

                <select
                    name="requirement"
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all"
                    required
                >
                    <option value="">Select Requirement</option>

                    ${requirementOptions}

                </select>

                <button
                    id="lead-submit-btn${idSuffix}"
                    type="submit"
                    class="w-full bg-royal-gold hover:bg-royal-gold-dark text-royal-navy py-3 rounded-lg font-bold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                >
                    Send OTP & Continue
                </button>

            </form>

            <!-- Step 2: OTP Verification (hidden by default) -->
            <div
                id="otp-step${idSuffix}"
                class="hidden p-8 space-y-5 bg-white"
            >
                <div class="text-center mb-2">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-royal-gold/10 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-royal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold font-serif text-royal-navy">Verify Your Email</h3>
                    <p class="text-slate-500 text-sm mt-1" id="otp-sent-msg${idSuffix}">
                        An OTP has been sent to your email address.
                    </p>
                </div>

                <!-- OTP Digit Inputs -->
                <div class="flex gap-1  md:gap-3 justify-center" id="otp-inputs${idSuffix}">
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                    <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]"
                        class="otp-digit w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-royal-gold transition-all bg-slate-50 text-royal-navy"
                        data-suffix="${idSuffix}"
                    >
                </div>

                <!-- Error message -->
                <p id="otp-error${idSuffix}" class="text-red-500 text-sm text-center hidden"></p>

                <!-- Verify button -->
                <button
                    id="otp-verify-btn${idSuffix}"
                    type="button"
                    class="w-full bg-royal-gold hover:bg-royal-gold-dark text-royal-navy py-3 rounded-lg font-bold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                >
                    Verify OTP
                </button>

                <!-- Resend OTP -->
                <p class="text-center text-sm text-slate-500">
                    Didn't receive it?
                    <button
                        id="resend-otp-btn${idSuffix}"
                        type="button"
                        class="text-royal-gold font-semibold hover:underline ml-1 disabled:opacity-40"
                    >
                        Resend OTP
                    </button>
                </p>

                <!-- Go back -->
                <button
                    id="otp-back-btn${idSuffix}"
                    type="button"
                    class="w-full text-slate-400 hover:text-royal-navy text-sm transition-colors"
                >
                    ← Edit Details
                </button>
            </div>

        </div>
    `;
}

export function initLeadForm(idSuffix = "") {

    const form = document.getElementById(`lead-form${idSuffix}`);
    const otpStep = document.getElementById(`otp-step${idSuffix}`);

    if (!form) return;

    let formData = {};

    // ── Step 1: Submit form → send OTP ───────────────────────────────────────
    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button = document.getElementById(`lead-submit-btn${idSuffix}`);

        button.disabled = true;
        button.innerText = "Sending OTP...";

        formData = {
            name: form.name.value,
            email: form.email.value,
            mobile: form.mobile.value,
            city: form.city.value,
            requirement: form.requirement.value
        };

        try {

            const response = await fetch("http://localhost:3000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email })
            });

            const result = await response.json();

            if (result.success) {
                // Show OTP step
                const sentMsg = document.getElementById(`otp-sent-msg${idSuffix}`);
                if (sentMsg) {
                    sentMsg.textContent = `OTP sent to ${formData.email}`;
                }
                form.classList.add("hidden");
                otpStep.classList.remove("hidden");

                // Focus first OTP input
                const firstInput = otpStep.querySelector(".otp-digit");
                if (firstInput) firstInput.focus();

            } else {
                alert(result.message || "Failed to send OTP.");
            }

        } catch (err) {
            console.error(err);
            alert("Unable to send OTP. Please try again.");
        }

        button.disabled = false;
        button.innerText = "Send OTP & Continue";
    });

    // ── OTP input: auto-advance & backspace ──────────────────────────────────
    if (otpStep) {
        const digitInputs = otpStep.querySelectorAll(".otp-digit");

        digitInputs.forEach((input, idx) => {
            input.addEventListener("input", (e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                e.target.value = val;
                if (val && idx < digitInputs.length - 1) {
                    digitInputs[idx + 1].focus();
                }
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && !input.value && idx > 0) {
                    digitInputs[idx - 1].focus();
                }
            });

            // Allow paste of full OTP
            input.addEventListener("paste", (e) => {
                e.preventDefault();
                const pasted = (e.clipboardData || window.clipboardData).getData("text").replace(/[^0-9]/g, "");
                [...pasted].slice(0, digitInputs.length).forEach((char, i) => {
                    if (digitInputs[i]) digitInputs[i].value = char;
                });
                const lastFilled = Math.min(pasted.length, digitInputs.length) - 1;
                if (digitInputs[lastFilled]) digitInputs[lastFilled].focus();
            });
        });

        // ── Verify OTP button ────────────────────────────────────────────────
        const verifyBtn = document.getElementById(`otp-verify-btn${idSuffix}`);
        const otpError = document.getElementById(`otp-error${idSuffix}`);

        if (verifyBtn) {
            verifyBtn.addEventListener("click", async () => {

                const digits = [...digitInputs].map(i => i.value.trim());
                const otp = digits.join("");

                // Ensure every digit box has a value
                const allFilled = digits.every(d => d.length === 1 && /^[0-9]$/.test(d));
                if (!allFilled) {
                    otpError.textContent = "Please enter all 6 digits.";
                    otpError.classList.remove("hidden");
                    return;
                }

                otpError.classList.add("hidden");
                verifyBtn.disabled = true;
                verifyBtn.innerText = "Verifying...";

                console.log("[OTP] Sending verify request:", { email: formData.email, otp });

                try {

                    // Verify OTP
                    const verifyRes = await fetch("http://localhost:3000/api/verify-otp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: formData.email, otp })
                    });

                    const verifyResult = await verifyRes.json();
                    console.log("[OTP] Verify response:", verifyResult);

                    if (!verifyResult.success) {
                        otpError.textContent = verifyResult.message || "Invalid OTP.";
                        otpError.classList.remove("hidden");
                        verifyBtn.disabled = false;
                        verifyBtn.innerText = "Verify OTP";
                        return;
                    }

                    // OTP verified → submit lead
                    const leadRes = await fetch("http://localhost:3000/api/lead", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });

                    const leadResult = await leadRes.json();

                    if (leadResult.success) {
                        form.reset();
                        localStorage.setItem("leadSubmitted", "true");
                        window.dispatchEvent(new CustomEvent("lead-submitted"));
                    } else {
                        alert(leadResult.message || "Could not submit enquiry.");
                        verifyBtn.disabled = false;
                        verifyBtn.innerText = "Verify OTP";
                    }

                } catch (err) {
                    console.error(err);
                    otpError.textContent = "Something went wrong. Please try again.";
                    otpError.classList.remove("hidden");
                    verifyBtn.disabled = false;
                    verifyBtn.innerText = "Verify OTP";
                }

            });
        }

        // ── Resend OTP ───────────────────────────────────────────────────────
        const resendBtn = document.getElementById(`resend-otp-btn${idSuffix}`);
        if (resendBtn) {
            resendBtn.addEventListener("click", async () => {
                if (!formData.email) return;
                resendBtn.disabled = true;
                resendBtn.innerText = "Sending...";

                try {
                    const res = await fetch("http://localhost:3000/api/send-otp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: formData.email })
                    });
                    const result = await res.json();
                    if (result.success) {
                        // Reset inputs
                        digitInputs.forEach(i => i.value = "");
                        digitInputs[0].focus();
                        if (otpError) otpError.classList.add("hidden");
                        resendBtn.innerText = "Sent!";
                        setTimeout(() => {
                            resendBtn.disabled = false;
                            resendBtn.innerText = "Resend OTP";
                        }, 30000);
                    } else {
                        resendBtn.disabled = false;
                        resendBtn.innerText = "Resend OTP";
                    }
                } catch {
                    resendBtn.disabled = false;
                    resendBtn.innerText = "Resend OTP";
                }
            });
        }

        // ── Back button ──────────────────────────────────────────────────────
        const backBtn = document.getElementById(`otp-back-btn${idSuffix}`);
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                otpStep.classList.add("hidden");
                form.classList.remove("hidden");
                digitInputs.forEach(i => i.value = "");
                if (otpError) otpError.classList.add("hidden");
            });
        }
    }

}