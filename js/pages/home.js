import { initHeroSlider } from "../components/heroslider/heroslider.js";
import { homeSliderData } from "../data/homeSliderData.js";

import { initNavbar } from "../components/navbar/navbar.js";
import { navbarData } from "../data/navbarData.js";

import { Gallery } from "../components/gallery/Gallery.js";
import { galleryData } from "../data/galleryData.js";

import { FloorPlans } from "../components/floorplan/FloorPlans.js";
import { floorPlanData } from "../data/floorPlanData.js";

import { Amenities } from "../components/amenities/Amenities.js";
import { amenities } from "../data/amenitiesData.js";

import { Footer } from "../components/footer/Footer.js";

import { Map } from "../components/map/Map.js";
import { mapData } from "../data/mapData.js";


initHeroSlider({
    containerId: "hero-slider",
    slides: homeSliderData,
    interval: 6000,
});

initNavbar({
    containerId: "navbar",
    data: navbarData,
});

Gallery({
    containerId: "gallery",
    images: galleryData.images,
    video: galleryData.video
});


FloorPlans({
    containerId: "floor-plans",
    plans: floorPlanData
});

Amenities({
    containerId: "amenities",
    amenities
});

Map({
    containerId: "map",
    mapUrl: mapData.mapUrl
});

Footer({
    containerId: "footer"
});