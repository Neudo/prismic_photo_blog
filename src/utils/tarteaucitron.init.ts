// src/utils/tarteaucitron.init.ts

// Déclarez tarteaucitron si vous n'avez pas de types pour lui
declare const tarteaucitron: any;

export function initializeTarteaucitron() {
  tarteaucitron.init({
    privacyUrl: "",
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    services: {
      googleanalytics: true,
      youtube: true,
    },
  });
}
