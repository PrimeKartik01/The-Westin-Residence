export function Amenities({
    containerId,
    amenities = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <section class="py-24 bg-white border-b border-royal-gold/10">

            <div class="container mx-auto px-6">

                <!-- Header -->

                <div class="text-center mb-16">

                    <span class="inline-block px-5 py-2 rounded-full bg-royal-gold/10 text-royal-gold font-serif tracking-widest uppercase text-xs border border-royal-gold/20 font-semibold">
                        Amenities
                    </span>

                    <h2 class="text-4xl lg:text-5xl font-bold font-serif text-royal-navy mt-4">
                        World-Class Club & Amenities
                    </h2>

                    <p class="text-slate-600 mt-4 max-w-2xl mx-auto font-sans font-light leading-relaxed">
                        Indulge in a curated suite of premium amenities designed to offer you
                        the ultimate in recreation, relaxation, and wellness.
                    </p>

                </div>

                <!-- Grid -->

                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    ${amenities.map(item => `

                        <div class="bg-royal-cream rounded-3xl p-8 border border-royal-gold/10 hover:border-royal-gold/45 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">

                            <!-- Icon Wrapper -->

                            <div class="w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-royal-gold/20">
                                <i data-lucide="${item.icon}" class="w-8 h-8 text-royal-gold"></i>
                            </div>

                            <!-- Title -->

                            <h3 class="text-xl font-bold font-serif text-royal-navy mb-3">
                                ${item.title}
                            </h3>

                            <!-- Description -->

                            <p class="text-slate-500 text-sm font-sans font-light leading-relaxed">
                                ${item.description}
                            </p>

                        </div>

                    `).join("")}

                </div>

            </div>

        </section>

    `;

    const renderIcons = () => {
        window.lucide?.createIcons();
    };

    if (window.lucide?.createIcons) {
        renderIcons();
    } else {
        window.addEventListener("load", renderIcons, { once: true });
    }

}