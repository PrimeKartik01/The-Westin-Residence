export function Footer({
    containerId
}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <footer class="bg-royal-navy text-white border-t border-royal-gold/20">

            <div class="container mx-auto px-6 py-20">

                <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    <!-- Brand -->

                    <div>

                        <h2 class="text-3xl font-serif font-bold text-royal-gold">
                            THE WESTIN
                        </h2>

                        <p class="mt-6 text-slate-300 leading-8">
                            Discover luxury residences crafted with timeless elegance,
                            premium amenities, and an unmatched lifestyle experience
                            in the heart of Gurgaon.
                        </p>

                    </div>

                    <!-- Quick Links -->

                    <div>

                        <h3 class="text-xl font-serif text-royal-gold mb-6">
                            Quick Links
                        </h3>

                        <ul class="space-y-4">

                            <li>
                                <a href="#hero-slider" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="#about-section" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    About
                                </a>
                            </li>

                            <li>
                                <a href="#amenities" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    Amenities
                                </a>
                            </li>

                            <li>
                                <a href="#gallery" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    Gallery
                                </a>
                            </li>

                            <li>
                                <a href="#floor-plans" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    Floor Plans
                                </a>
                            </li>

                            <li>
                                <a href="#footer" class="text-slate-300 hover:text-royal-gold transition footer-scroll-link">
                                    Contact
                                </a>
                            </li>

                        </ul>

                    </div>

                    <!-- Property -->

                    <div>

                        <h3 class="text-xl font-serif text-royal-gold mb-6">
                            Property
                        </h3>

                        <ul class="space-y-4">

                            <li class="text-slate-300">
                                3 BHK Luxury Residences
                            </li>

                            <li class="text-slate-300">
                                4 BHK Luxury Residences
                            </li>

                            <li class="text-slate-300">
                                Penthouses
                            </li>

                            <li class="text-slate-300">
                                Club & Amenities
                            </li>

                            <li class="text-slate-300">
                                Floor Plans
                            </li>

                        </ul>

                    </div>

                    <!-- Contact -->

                    <div>

                        <h3 class="text-xl font-serif text-royal-gold">
                            Contact Us
                        </h3>

                        <div class="space-y-5 text-slate-300">

                            <div>
                                <p class="text-royal-gold text-sm uppercase tracking-widest">
                                    Address
                                </p>

                                <p class="mt-2">
                                    Sector 103,
                                    Dwarka Expressway,
                                    Gurgaon,
                                    Haryana
                                </p>

                            </div>

                            <div>

                                <p class="text-royal-gold text-sm uppercase tracking-widest">
                                    Phone
                                </p>

                                <a href="tel:+919999999999" class="block mt-2 hover:text-royal-gold transition">
                                    +91 99999 99999
                                </a>

                            </div>

                            <div>

                                <p class="text-royal-gold text-sm uppercase tracking-widest">
                                    Email
                                </p>

                                <a href="mailto:info@thewestinresidences.com" class="block mt-2 hover:text-royal-gold transition">
                                    info@thewestinresidences.com
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </footer>

    `;

    // Smooth scroll for footer links
    container.querySelectorAll(".footer-scroll-link").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

}