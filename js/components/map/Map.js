export function Map({
    containerId,
    data
}) {

    const container = document.getElementById(containerId);

    if (!container || !data) return;

    const { baseLocation, locations } = data;

    container.innerHTML = `

        <section class="py-24 bg-royal-cream border-b border-royal-gold/10">

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
                        Strategically located with seamless connectivity to major highways,
                        business districts, schools, hospitals and entertainment hubs.
                    </p>

                </div>

                <!-- Map + Locations Grid -->

                <div class="grid lg:grid-cols-3 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-royal-gold/10">

                    <!-- Location List -->

                    <div class="bg-royal-navy text-white overflow-y-auto max-h-[580px] custom-scrollbar">

                        <!-- Header -->
                        <div class="px-6 py-5 border-b border-royal-gold/20 bg-royal-navy sticky top-0 z-10">
                            <p class="text-royal-gold uppercase tracking-widest text-xs font-semibold">Nearby Landmarks</p>
                            <h3 class="text-lg font-serif text-white mt-1">${baseLocation.name}</h3>
                            <p class="text-xs text-slate-400 mt-1">Click a location to view route</p>
                        </div>

                        <!-- Route Info Banner (hidden by default) -->
                        <div id="route-info-banner" class="hidden px-6 py-4 bg-royal-gold/10 border-b border-royal-gold/20">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p id="route-dest-name" class="text-white font-serif text-sm font-bold"></p>
                                    <p class="text-royal-gold text-xs mt-1 uppercase tracking-wider">Route Details</p>
                                </div>
                                <button id="clear-route-btn" class="text-slate-400 hover:text-royal-gold text-lg transition-colors" title="Clear Route">✕</button>
                            </div>
                            <div class="flex gap-4 mt-3">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-royal-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                                    </svg>
                                    <span id="route-distance" class="text-white text-sm font-bold"></span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-royal-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span id="route-duration" class="text-white text-sm font-bold"></span>
                                </div>
                            </div>
                        </div>

                        <!-- Location Items -->
                        <ul class="divide-y divide-white/5" id="location-list">
                            ${locations.map((loc, i) => `
                                <li
                                    data-index="${i}"
                                    class="location-item flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-royal-gold/10 transition-all duration-200 group"
                                >
                                    <div class="flex items-center gap-3">
                                        <div class="loc-dot w-2 h-2 rounded-full bg-royal-gold/40 group-hover:bg-royal-gold transition-colors"></div>
                                        <span class="text-sm font-sans text-slate-200 group-hover:text-white transition-colors">${loc.name}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-xs font-semibold text-royal-gold bg-royal-gold/10 border border-royal-gold/20 px-3 py-1 rounded-full">${loc.distance}</span>
                                        <span class="loc-route-loader hidden text-royal-gold text-xs animate-pulse">...</span>
                                    </div>
                                </li>
                            `).join("")}
                        </ul>

                    </div>

                    <!-- Leaflet Map -->

                    <div id="leaflet-map" class="lg:col-span-2 h-[580px] z-0"></div>

                </div>

            </div>

        </section>

        <style>
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(197,168,128,0.3); border-radius: 4px; }
            .location-item.active { background: rgba(197,168,128,0.12); }
            .location-item.active .loc-dot { background: #c5a880 !important; }
            .location-item.active span { color: white !important; }
        </style>

    `;

    setTimeout(() => {

        const L = window.L;
        if (!L) return;

        // Init map
        const map = L.map("leaflet-map", {
            zoomControl: false,
            scrollWheelZoom: false
        }).setView([baseLocation.lat, baseLocation.lng], 12);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
            maxZoom: 19
        }).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Base marker icon
        const baseIcon = L.divIcon({
            className: "",
            html: `<div style="
                width:48px;height:48px;
                background:#c5a880;
                border:3px solid #fff;
                border-radius:50%;
                display:flex;align-items:center;justify-content:center;
                box-shadow:0 4px 18px rgba(0,0,0,0.4);
            ">
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
            </div>`,
            iconSize: [48, 48],
            iconAnchor: [24, 24]
        });

        function makeLocIcon(active = false) {
            return L.divIcon({
                className: "",
                html: `<div style="
                    width:${active ? 38 : 22}px;
                    height:${active ? 38 : 22}px;
                    background:${active ? "#c5a880" : "#0b1325"};
                    border:2px solid ${active ? "#fff" : "#c5a880"};
                    border-radius:50%;
                    box-shadow:0 2px 10px rgba(0,0,0,0.3);
                    transition:all 0.3s;
                "></div>`,
                iconSize: [active ? 38 : 22, active ? 38 : 22],
                iconAnchor: [active ? 19 : 11, active ? 19 : 11]
            });
        }

        // Add base marker
        L.marker([baseLocation.lat, baseLocation.lng], { icon: baseIcon })
            .addTo(map)
            .bindPopup(`
                <div style="font-family:serif;padding:4px 8px;">
                    <strong style="color:#0b1325;">${baseLocation.name}</strong><br>
                    <span style="color:#c5a880;font-size:11px;">📍 Project Location</span>
                </div>
            `)
            .openPopup();

        // Add location markers
        const markers = locations.map(loc => {
            return L.marker([loc.lat, loc.lng], { icon: makeLocIcon(false) })
                .addTo(map)
                .bindPopup(`
                    <div style="font-family:sans-serif;padding:4px 8px;min-width:140px;">
                        <strong style="color:#0b1325;">${loc.name}</strong><br>
                        <span style="color:#c5a880;font-size:12px;">${loc.distance} from project</span>
                    </div>
                `);
        });

        // Route layer
        let currentRouteLine = null;
        let activeIndex = null;

        const items = container.querySelectorAll(".location-item");
        const banner = container.querySelector("#route-info-banner");
        const routeDestName = container.querySelector("#route-dest-name");
        const routeDistance = container.querySelector("#route-distance");
        const routeDuration = container.querySelector("#route-duration");
        const clearBtn = container.querySelector("#clear-route-btn");

        function clearRoute() {
            if (currentRouteLine) {
                map.removeLayer(currentRouteLine);
                currentRouteLine = null;
            }
            if (activeIndex !== null) {
                markers[activeIndex].setIcon(makeLocIcon(false));
                markers[activeIndex].closePopup();
                items[activeIndex].classList.remove("active");
                activeIndex = null;
            }
            banner.classList.add("hidden");
            map.setView([baseLocation.lat, baseLocation.lng], 12, { animate: true, duration: 1 });
        }

        clearBtn.addEventListener("click", clearRoute);

        async function fetchAndDrawRoute(loc, index) {

            // Show loader on item
            const loader = items[index].querySelector(".loc-route-loader");
            loader.classList.remove("hidden");

            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${baseLocation.lng},${baseLocation.lat};${loc.lng},${loc.lat}?overview=full&geometries=geojson`;
                const res = await fetch(url);
                const json = await res.json();

                if (!json.routes || !json.routes.length) throw new Error("No route found");

                const route = json.routes[0];
                const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

                // Remove old route
                if (currentRouteLine) map.removeLayer(currentRouteLine);

                // Draw new route as animated gold line
                currentRouteLine = L.polyline(coords, {
                    color: "#c5a880",
                    weight: 4,
                    opacity: 0.85,
                    smoothFactor: 1,
                    dashArray: "8, 6"
                }).addTo(map);

                // Fit map to route
                map.fitBounds(currentRouteLine.getBounds(), { padding: [50, 50], animate: true, duration: 1.2 });

                // Format distance and duration
                const distanceKm = (route.distance / 1000).toFixed(1);
                const durationMin = Math.round(route.duration / 60);
                const durationText = durationMin >= 60
                    ? `${Math.floor(durationMin / 60)}h ${durationMin % 60}m`
                    : `${durationMin} min`;

                // Update banner
                routeDestName.textContent = loc.name;
                routeDistance.textContent = `${distanceKm} km`;
                routeDuration.textContent = durationText;
                banner.classList.remove("hidden");

                // Update marker popup with real data
                markers[index].setPopupContent(`
                    <div style="font-family:sans-serif;padding:6px 10px;min-width:160px;">
                        <strong style="color:#0b1325;font-size:13px;">${loc.name}</strong><br>
                        <div style="margin-top:6px;display:flex;gap:12px;">
                            <span style="color:#c5a880;font-size:12px;font-weight:600;">🛣️ ${distanceKm} km</span>
                            <span style="color:#0b1325;font-size:12px;">🕐 ${durationText}</span>
                        </div>
                    </div>
                `).openPopup();

            } catch (err) {
                console.error("Route fetch error:", err);
                // Fallback: just fly to location
                map.flyTo([loc.lat, loc.lng], 13, { duration: 1.2 });
                markers[index].openPopup();
            }

            loader.classList.add("hidden");
        }

        items.forEach((item, i) => {
            item.addEventListener("click", async () => {

                // Reset previous active
                if (activeIndex !== null && activeIndex !== i) {
                    items[activeIndex].classList.remove("active");
                    markers[activeIndex].setIcon(makeLocIcon(false));
                    markers[activeIndex].closePopup();
                }

                // Toggle off if same item
                if (activeIndex === i) {
                    clearRoute();
                    return;
                }

                // Activate
                item.classList.add("active");
                markers[i].setIcon(makeLocIcon(true));
                activeIndex = i;

                await fetchAndDrawRoute(locations[i], i);

            });
        });

    }, 100);

}