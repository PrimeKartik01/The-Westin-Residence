export function FloorPlans({
    containerId,
    plans = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <section class="py-24 bg-royal-cream border-b border-royal-gold/10">

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

                        <div class=" bg-white rounded-3xl overflow-hidden border border-royal-gold/10 shadow-md hover:shadow-2xl transition-all duration-500 group">

                            <!-- Image -->

                            <div class="relative overflow-hidden aspect-[4/3] bg-royal-cream">

                                <img
                                    src="${plan.image}"
                                    alt="${plan.title}"
                                    class=" w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                >

                                <div
                                    class=" absolute top-4 left-4 bg-royal-navy/90 text-royal-gold text-[10px] tracking-widest px-4 py-2 rounded-full uppercase font-sans border border-royal-gold/20 backdrop-blur-sm"
                                >
                                    ${plan.title}
                                </div>

                            </div>

                            <!-- Content -->

                            <div class="p-6">

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

                                <button
                                    class="
                                        mt-6
                                        w-full
                                        bg-royal-navy
                                        hover:bg-royal-gold
                                        text-white
                                        hover:text-royal-navy
                                        border
                                        border-royal-navy
                                        hover:border-royal-gold
                                        py-3
                                        rounded-full
                                        font-serif
                                        uppercase
                                        tracking-widest
                                        text-[10px]
                                        font-semibold
                                        shadow-lg
                                        shadow-royal-navy/5
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Request Floor Plan
                                </button>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        </section>

    `;

}