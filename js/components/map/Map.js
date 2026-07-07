export function Map({
    containerId,
    mapUrl
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <section class="py-24 bg-white border-y border-royal-gold/10">

            <div class="container mx-auto px-6">

                <!-- Heading -->

                <div class="text-center max-w-3xl mx-auto mb-14">

                    <span class="inline-block px-5 py-2 rounded-full bg-royal-gold/10 border border-royal-gold/20 text-royal-gold uppercase tracking-[0.25em] text-xs font-semibold">
                        Location
                    </span>

                    <h2 class="mt-5 text-4xl lg:text-5xl font-serif font-bold text-royal-navy">
                        Prime Location
                    </h2>

                    <p class="mt-5 text-slate-600 leading-8">
                        Strategically located with seamless connectivity to major
                        highways, business districts, schools, hospitals and
                        entertainment hubs.
                    </p>

                </div>

                <!-- Map -->

                <div class="overflow-hidden rounded-3xl shadow-2xl border border-royal-gold/10">

                    <iframe
                        src="${mapUrl}"
                        width="100%"
                        height="600"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>

                </div>

            </div>

        </section>

    `;

}