// Room data. Copy lives in src/content/messages/{en,fr}.json under `room.<key>.*`.

export type Room = {
  slug: string;
  key: string;
  rate: number;
  nonref: number;
  extra: boolean;
  main: string;
  gallery: string[];
};

export const rooms: Room[] = [
  {
    "slug": "azure-room",
    "key": "azure",
    "rate": 140,
    "nonref": 126,
    "extra": true,
    "main": "2016/12/1.jpg",
    "gallery": [
      "2016/12/WhatsApp-Image-2025-06-12-à-10.58.22_a6d3bdd6.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-10.40.35_c25b965e.jpg",
      "2016/12/3.jpg",
      "2016/12/4.jpg",
      "2016/12/5.jpg",
      "2016/12/6.jpg"
    ]
  },
  {
    "slug": "green-room",
    "key": "green",
    "rate": 140,
    "nonref": 126,
    "extra": false,
    "main": "2016/12/WhatsApp-Image-2025-06-12-à-11.07.22_c68ede81.jpg",
    "gallery": [
      "2016/12/PHOTO-2025-06-12-12-07-19_2.jpg",
      "2016/12/2025_06_smiles-115.jpg",
      "2016/12/IMG_8167.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-11.01.01_4b0ee61c.jpg",
      "2016/12/2025_06_smiles-126.jpg",
      "2016/12/0249353d-e3a6-47a5-b365-07c344a8a7d5.jpg",
      "2016/12/2025_06_smiles-125.jpg",
      "2016/12/2025_06_smiles-121.jpg",
      "2016/12/WhatsApp-Image-2025-06-13-à-06.13.52_ee515af1.jpg",
      "2016/12/WhatsApp-Image-2025-06-13-à-08.34.09_bc765eba.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-10.52.17_af51e3d8.jpg"
    ]
  },
  {
    "slug": "red-room",
    "key": "red",
    "rate": 130,
    "nonref": 117,
    "extra": false,
    "main": "2016/12/2025_06_smiles-053.jpg",
    "gallery": [
      "2016/12/2025_06_smiles-063.jpg",
      "2016/12/2025_06_smiles-054.jpg",
      "2016/12/2025_06_smiles-056.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-10.39.24_480180ac.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-11.58.31_c83e44a5.jpg",
      "2016/12/2025_06_smiles-055.jpg",
      "2016/12/2025_06_smiles-069.jpg",
      "2016/12/Riad-Anata-Fes-73.jpg",
      "2016/12/2025_06_smiles-074.jpg",
      "2016/12/2025_06_smiles-047.jpg",
      "2016/12/2025_06_smiles-081.jpg",
      "2016/12/2025_06_smiles-073.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-11.37.34_756247d2.jpg",
      "2016/12/WhatsApp-Image-2025-06-12-à-10.51.38_adeb40c9.jpg",
      "2016/12/2025_06_smiles-048.jpg"
    ]
  },
  {
    "slug": "orange-room",
    "key": "orange",
    "rate": 120,
    "nonref": 108,
    "extra": false,
    "main": "2016/12/MAIN.webp",
    "gallery": [
      "2016/12/1-1.webp",
      "2016/12/2-1.webp",
      "2016/12/WhatsApp-Image-2025-06-12-à-10.56.44_26f9d8e4.jpg",
      "2016/12/3-1.webp",
      "2016/12/4-1.webp",
      "2016/12/5-1.webp",
      "2016/12/6-1.webp",
      "2016/12/7-1.webp",
      "2016/12/8-1.webp",
      "2016/12/9-1.webp",
      "2016/12/10-1.webp",
      "2016/12/11-1.webp",
      "2016/12/12-1.webp",
      "2016/12/WhatsApp-Image-2025-06-12-à-11.12.57_2f263603.jpg"
    ]
  },
  {
    "slug": "white-room",
    "key": "white",
    "rate": 120,
    "nonref": 108,
    "extra": false,
    "main": "2016/12/MAIN-PAGE.webp",
    "gallery": [
      "2016/12/1.webp",
      "2016/12/2.webp",
      "2016/12/3.webp",
      "2016/12/4.webp",
      "2016/12/5.webp",
      "2016/12/6.webp",
      "2016/12/7.webp",
      "2016/12/8.webp",
      "2016/12/9.webp",
      "2016/12/10.webp",
      "2016/12/11.webp",
      "2016/12/12.webp"
    ]
  }
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
