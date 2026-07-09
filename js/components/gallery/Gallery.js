export function Gallery({
    containerId,
    images = []
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <section class="py-20 bg-royal-cream border-y border-royal-gold/10">

            <div class="container mx-auto px-6">

                <!-- Heading -->

                <div class="text-center max-w-3xl mx-auto mb-14">

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

                <!-- Gallery Grid -->

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    ${images.slice(0, 7).map((image, index) => `

                        <div class="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 shadow-lg cursor-pointer">

                            <img
                                src="${image}"
                                alt="Gallery Image ${index + 1}"
                                class="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                            >

                            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition duration-300"></div>

                            <div class="absolute inset-0 border border-white/10 rounded-3xl"></div>

                            <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                                <span class="text-royal-gold uppercase tracking-[0.25em] text-xs">
                                    Luxury Living
                                </span>

                                <h3 class="mt-2 text-white text-xl font-serif">
                                    Gallery Image ${index + 1}
                                </h3>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        </section>

    `;

}