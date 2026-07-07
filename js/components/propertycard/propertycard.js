export function initPropertyCard({
    containerId,
    properties,
    cardClass = "property-card",
    imageHeight = "280px",
    showPrice = true,
    showDetails = true,
    showBadge = true,
    showAgent = false,
    currency = "$",
    onCardClick = null,
    columns = {
        sm: 2,
        lg: 3,
        xl: 3
    },
    staggerDelay = 0.1,
    animationDuration = 0.8,
    threshold = 0.05,
    translateY = 50
}) {

    const container = document.getElementById(containerId);

    if (!container || !properties?.length) return;

    container.innerHTML = "";

    const smCol = columns.sm === 1 ? 'sm:grid-cols-1' : columns.sm === 2 ? 'sm:grid-cols-2' : columns.sm === 3 ? 'sm:grid-cols-3' : columns.sm === 4 ? 'sm:grid-cols-4' : '';
    const lgCol = columns.lg === 1 ? 'lg:grid-cols-1' : columns.lg === 2 ? 'lg:grid-cols-2' : columns.lg === 3 ? 'lg:grid-cols-3' : columns.lg === 4 ? 'lg:grid-cols-4' : '';
    const xlCol = columns.xl === 1 ? 'xl:grid-cols-1' : columns.xl === 2 ? 'xl:grid-cols-2' : columns.xl === 3 ? 'xl:grid-cols-3' : columns.xl === 4 ? 'xl:grid-cols-4' : '';
    const gridCols = `grid-cols-1 ${smCol} ${lgCol} ${xlCol}`;

    const grid = document.createElement("div");
    grid.className = `grid ${gridCols} gap-6`;

    const totalProperties = properties.length;
    const cards = [];

    properties.forEach((property, index) => {

        let priceHTML = "";
        if (showPrice) {
            const formattedPrice = property.price ? property.price.toLocaleString() : "0";
            const priceLabel = property.status === "rent" ? "/month" : "";
            priceHTML = `
                <div class="flex items-center mt-3">
                    <span class="text-2xl font-bold text-gray-900">${currency}${formattedPrice}</span>
                    <span class="text-gray-500 text-sm ml-1">${priceLabel}</span>
                </div>
            `;
        }

        let detailsHTML = "";
        if (showDetails) {
            const beds = property.beds || 0;
            const baths = property.baths || 0;
            const sqft = property.sqft ? property.sqft.toLocaleString() : "0";
            const garage = property.garage || 0;
            detailsHTML = `
                <div class="flex justify-center md:justify-start items-center gap-4 mt-3 text-gray-600 text-sm">
                    <div class="flex md:flex-row items-center gap-1"><span>🛏</span><span>${beds} Beds</span></div>
                    <div class="flex md:flex-row items-center gap-1"><span>🛁</span><span>${baths} Baths</span></div>
                    <div class="flex md:flex-row items-center gap-1"><span>📐</span><span>${sqft} sqft</span></div>
                    ${garage > 0 ? `<div class="flex items-center gap-1"><span>🚗</span><span>${garage}</span></div>` : ""}
                </div>
            `;
        }

        let typeBadgeHTML = "";
        if (property.type) {
            const typeColors = {
                "house": "bg-blue-500",
                "apartment": "bg-purple-500",
                "condo": "bg-pink-500",
                "villa": "bg-emerald-500",
                "townhouse": "bg-orange-500",
                "commercial": "bg-gray-700"
            };
            const typeColor = typeColors[property.type.toLowerCase()] || "bg-gray-500";
            typeBadgeHTML = `<span class="px-2 py-1 text-xs font-medium text-white rounded-md ${typeColor}">${property.type}</span>`;
        }

        let statusBadgeHTML = "";
        if (property.status) {
            const statusColors = {
                "sale": "bg-green-500",
                "rent": "bg-blue-500",
                "sold": "bg-red-500",
                "pending": "bg-yellow-500"
            };
            const statusColor = statusColors[property.status.toLowerCase()] || "bg-gray-500";
            const statusText = property.status === "sale" ? "For Sale" :
                property.status === "rent" ? "For Rent" :
                    property.status === "sold" ? "Sold" :
                        property.status === "pending" ? "Pending" : property.status;
            statusBadgeHTML = `<span class="px-2 py-1 text-xs font-bold text-white rounded-md ${statusColor}">${statusText}</span>`;
        }

        let badgeHTML = "";
        if (showBadge && property.featured) {
            badgeHTML = `<div class="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold text-white rounded-full bg-red-500">Featured</div>`;
        }

        const locationHTML = property.location ? `
            <div class="flex items-center gap-1 text-gray-500 text-sm mt-2">
                <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-slate-700">
                        <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <span>${property.location}</span>
            </div>
        ` : "";

        let agentHTML = "";
        if (showAgent && property.agent) {
            agentHTML = `
                <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <img src="${property.agent.image || "https://via.placeholder.com/40"}" alt="${property.agent.name}" class="w-10 h-10 rounded-full object-cover">
                    <div>
                        <p class="text-sm font-semibold text-gray-900">${property.agent.name}</p>
                        <p class="text-xs text-gray-500">${property.agent.phone || ""}</p>
                    </div>
                </div>
            `;
        }

        const cardDelay = index * staggerDelay;

        const card = document.createElement("div");
        card.className = `${cardClass} group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer property-card-hidden`;
        card.dataset.delay = cardDelay;
        card.dataset.duration = animationDuration;
        card.dataset.translateY = translateY;

        if (onCardClick) {
            card.addEventListener("click", () => onCardClick(property));
        }

        const imageSrc = property.image || property.images?.[0] || "img/placeholder.webp";
        const photoCount = property.images ? property.images.length : 1;
        const photoBadge = photoCount > 1 ? `
            <div class="absolute bottom-3 right-3 z-10 px-2 py-1 bg-black/60 text-white text-xs rounded-md flex items-center gap-1">
                <span>📷</span><span>${photoCount}</span>
            </div>
        ` : "";

        card.innerHTML = `
            <div class="relative" style="height: ${imageHeight}">
                ${badgeHTML}
                <img src="${imageSrc}" alt="${property.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
                ${photoBadge}
                <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p class="text-white text-xs">Click to view details</p>
                </div>
            </div>
            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex gap-2">${typeBadgeHTML}${statusBadgeHTML}</div>
                </div>
                <h3 class="text-lg font-bold text-gray-900 line-clamp-2">${property.title}</h3>
                ${locationHTML}
                ${priceHTML}
                ${detailsHTML}
                ${property.description ? `<p class="text-gray-600 text-sm mt-3 line-clamp-2">${property.description}</p>` : ""}
                ${agentHTML}
               
                    <button class="view-details w-full mt-3 flex-1 bg-gray-900 text-white py-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition" data-id="${property.id}">Enquiry</button>
               
            </div>
        `;

        grid.appendChild(card);
        cards.push(card);
    });

    container.appendChild(grid);

    // Inject smooth CSS with blur-to-clear effect
    if (!document.getElementById("property-card-smooth-styles")) {
        const style = document.createElement("style");
        style.id = "property-card-smooth-styles";
        style.textContent = `
            .property-card-hidden {
                opacity: 0;
                transform: translateY(var(--card-translate, 50px)) scale(0.96);
                filter: blur(2px);
                transition: none;
                will-change: opacity, transform, filter;
            }
            .property-card-visible {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
                transition: opacity var(--card-duration, 0.8s) cubic-bezier(0.22, 1, 0.36, 1),
                            transform var(--card-duration, 0.8s) cubic-bezier(0.22, 1, 0.36, 1),
                            filter var(--card-duration, 0.8s) cubic-bezier(0.22, 1, 0.36, 1);
            }
            .property-card-visible:hover {
                transform: translateY(-8px) scale(1.01);
                transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // Intersection Observer - trigger when cards start entering viewport
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -20px 0px",
        threshold: threshold
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseFloat(card.dataset.delay) || 0;
                const duration = parseFloat(card.dataset.duration) || 0.8;
                const translateY = parseFloat(card.dataset.translateY) || 50;

                setTimeout(() => {
                    card.style.setProperty("--card-duration", `${duration}s`);
                    card.style.setProperty("--card-translate", `${translateY}px`);
                    card.classList.remove("property-card-hidden");
                    card.classList.add("property-card-visible");
                }, delay * 1000);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    // Event delegation
    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".view-details");
        if (btn) {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const property = properties.find(p => p.id === id);
            if (property) {
                if (property.onViewDetails) {
                    property.onViewDetails(property);
                } else {
                    console.log("View details:", property.title);
                }
            }
        }

        const saveBtn = e.target.closest(".save-property");
        if (saveBtn) {
            e.stopPropagation();
            const id = parseInt(saveBtn.dataset.id);
            const property = properties.find(p => p.id === id);
            if (property) {
                const isSaved = saveBtn.textContent.trim() === "♥";
                saveBtn.textContent = isSaved ? "♡" : "♥";
                saveBtn.classList.toggle("text-red-500", !isSaved);
                saveBtn.classList.toggle("border-red-200", !isSaved);
                if (property.onSave) {
                    property.onSave(property, !isSaved);
                } else {
                    console.log(isSaved ? "Removed from saved:" : "Saved property:", property.title);
                }
            }
        }
    });

    return {
        totalProperties,
        container,
        cards,
        observer
    };
}