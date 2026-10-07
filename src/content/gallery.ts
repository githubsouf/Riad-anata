export type Shot = { src: string; cat: GalleryCat; alt: string };
export type GalleryCat = 'riad' | 'rooms' | 'terrace' | 'food' | 'fes';

export const galleryCats = ['all', 'riad', 'rooms', 'terrace', 'food', 'fes'] as const;

export const gallery: Shot[] = [
  {
    "src": "2016/10/3-boutique-hotel-Riad-Fes-1.jpg",
    "cat": "riad",
    "alt": "The patio of Riad Anata"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-08.24.01_f7513289.jpg",
    "cat": "riad",
    "alt": "Zellige detail"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-19.38.59_ec6b15de.jpg",
    "cat": "rooms",
    "alt": "Guest room"
  },
  {
    "src": "2016/10/DSCF2924-copie.jpg",
    "cat": "riad",
    "alt": "Interior of the riad"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-04.48.34_352e861e.jpg",
    "cat": "terrace",
    "alt": "Rooftop terrace"
  },
  {
    "src": "2016/10/RiadAnata1.jpg",
    "cat": "riad",
    "alt": "The courtyard"
  },
  {
    "src": "2016/10/IMG_1020.jpg",
    "cat": "riad",
    "alt": "Moroccan craft detail"
  },
  {
    "src": "2016/10/8Z6A8774-copie.jpg",
    "cat": "riad",
    "alt": "The Moroccan salon"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-11.39.55_cf5680e9.jpg",
    "cat": "rooms",
    "alt": "Bedroom"
  },
  {
    "src": "2016/10/IMG_5734-copie.jpg",
    "cat": "riad",
    "alt": "Lantern light"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.53.25_fec80501.jpg",
    "cat": "terrace",
    "alt": "Terrace view"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.50.56_00b4a2bb.jpg",
    "cat": "terrace",
    "alt": "Medina rooftops"
  },
  {
    "src": "2016/10/13-marruecos-riad-fes-1.jpg",
    "cat": "fes",
    "alt": "Fès medina"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.49.54_8656ee82.jpg",
    "cat": "terrace",
    "alt": "Sunset on the terrace"
  },
  {
    "src": "2016/10/Riad-Anata-Fes-21.jpg",
    "cat": "riad",
    "alt": "Living space"
  },
  {
    "src": "2016/10/Anata-58.jpg",
    "cat": "riad",
    "alt": "Handcrafted detail"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.52.11_639ee165.jpg",
    "cat": "terrace",
    "alt": "Breakfast on the roof"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-14.53.38_642cc4e8.jpg",
    "cat": "rooms",
    "alt": "Bathroom"
  },
  {
    "src": "2016/10/riad-anata-entree.jpg",
    "cat": "riad",
    "alt": "The entrance door"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.09.26_909826c6.jpg",
    "cat": "food",
    "alt": "Moroccan table"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.17.18_58755262.jpg",
    "cat": "food",
    "alt": "Mint tea"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-14-à-08.23.46_24212366.jpg",
    "cat": "food",
    "alt": "Breakfast spread"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-14.55.52_9c01c004.jpg",
    "cat": "rooms",
    "alt": "Room detail"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-19.45.25_c5178986.jpg",
    "cat": "rooms",
    "alt": "Bedside"
  },
  {
    "src": "2016/10/Anata-40.jpg",
    "cat": "food",
    "alt": "Breakfast"
  },
  {
    "src": "2016/10/Anata-42-copie.jpg",
    "cat": "food",
    "alt": "Set table"
  },
  {
    "src": "2016/10/8Z6A9350-copie.jpg",
    "cat": "riad",
    "alt": "Wading pool in the patio"
  },
  {
    "src": "2016/10/FES-2-copie.jpg",
    "cat": "fes",
    "alt": "Fès, imperial city"
  },
  {
    "src": "2016/10/Riad-Anata-Fes-11-copie.jpg",
    "cat": "riad",
    "alt": "Carved doorway"
  },
  {
    "src": "2016/10/8Z6A8979-copie.jpg",
    "cat": "riad",
    "alt": "Staircase"
  },
  {
    "src": "2016/10/8Z6A9070-copie.jpg",
    "cat": "terrace",
    "alt": "Upper terrace"
  },
  {
    "src": "2016/10/riad-anata-rooftop-2-of-2.jpg",
    "cat": "terrace",
    "alt": "Rooftop at dusk"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.15.26_c8c9070f.jpg",
    "cat": "terrace",
    "alt": "Terrace seating"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-15.05.02_fb3c9b5e.jpg",
    "cat": "rooms",
    "alt": "Guest room corner"
  },
  {
    "src": "2016/10/Riad-Anata-Fes-41-copie.jpg",
    "cat": "riad",
    "alt": "The riad by night"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-06.15.26_aa26c0c3.jpg",
    "cat": "terrace",
    "alt": "Terrace lounge"
  },
  {
    "src": "2016/10/8Z6A9893-copie.jpg",
    "cat": "food",
    "alt": "Cooking class table"
  },
  {
    "src": "2016/10/Riad-Anata-9_preview.jpeg",
    "cat": "riad",
    "alt": "Riad Anata"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-14.56.04_65b2d7c6.jpg",
    "cat": "rooms",
    "alt": "Bathroom detail"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-14-à-08.27.32_4ed76a14.jpg",
    "cat": "food",
    "alt": "Moroccan pastries"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-13-à-04.48.58_c50c7121.jpg",
    "cat": "terrace",
    "alt": "View over the medina"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-12-à-19.37.53_66448d81.jpg",
    "cat": "rooms",
    "alt": "Bedroom view"
  },
  {
    "src": "2016/10/WhatsApp-Image-2025-06-14-à-08.46.34_3f206088.jpg",
    "cat": "food",
    "alt": "Moroccan breakfast"
  },
  {
    "src": "2016/10/Anata12-copie.jpeg",
    "cat": "riad",
    "alt": "Riad Anata patio"
  }
];
