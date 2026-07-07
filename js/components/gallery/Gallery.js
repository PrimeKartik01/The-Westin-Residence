export function Gallery({
    containerId,
    images = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <section class="py-24 bg-royal-cream border-y border-royal-gold/10">

            <div class="container mx-auto px-6">

                <!-- Heading -->

                <div class="text-center max-w-3xl mx-auto mb-16">

                    <span class="inline-block px-5 py-2 rounded-full bg-royal-gold/10 border border-royal-gold/20 text-royal-gold uppercase tracking-[0.25em] text-xs font-semibold">
                        Project Gallery
                    </span>

                    <h2 class="mt-5 text-4xl lg:text-5xl font-serif font-bold text-royal-navy">
                        Experience Timeless Luxury
                    </h2>

                    <p class="mt-5 text-slate-600 leading-8">
                        Every corner of The Westin Residences reflects sophistication,
                        elegance and world-class architecture designed for modern luxury living.
                    </p>

                </div>

                <!-- Gallery -->

                <div class="grid grid-cols-12 gap-5">

                    <!-- Large Image -->

                    <div class="col-span-12 lg:col-span-6">

                        <div class="group relative overflow-hidden rounded-3xl h-full min-h-[620px]">

                            <img
                                src="${images[0]}"
                                class="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                            >

                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                            <div class="absolute bottom-0 left-0 p-10">

                                <span class="text-royal-gold uppercase tracking-[0.35em] text-xs">
                                    Luxury Living
                                </span>

                                <h3 class="text-white text-4xl font-serif mt-3">
                                    Designed For The Elite
                                </h3>

                            </div>

                        </div>

                    </div>

                    <!-- Small Images -->

                    <div class="col-span-12 lg:col-span-6">

                        <div class="grid grid-cols-2 gap-5 h-full">

                            ${images.slice(1, 7).map(image => `

                                <div class="group relative overflow-hidden rounded-3xl min-h-[300px]">

                                    <img
                                        src="${image}"
                                        class="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    >

                                    <div class="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition"></div>

                                    <div class="absolute inset-0 border border-white/10 rounded-3xl"></div>

                                </div>

                            `).join("")}

                        </div>

                    </div>

                </div>

            </div>

        </section>

    `;

}