// קובץ: data/taxonomy.js
// שכבת סיווג טקסונומי בסיסית למאגר ענקי המים.
// המטרה: להוסיף לכל דג סדרה, משפחה ושם עברי/מדעי שימושי בלי לשבור את קבצי הנתונים המקוריים.

(function () {
    const taxonomyByGenus = {
        Arapaima: { order: `Osteoglossiformes`, family: `Arapaimidae`, hebrewFamily: `אראפאימיים / לשונות-עצם ענקיות` },
        Atractosteus: { order: `Lepisosteiformes`, family: `Lepisosteidae`, hebrewFamily: `גאריים` },
        Lepisosteus: { order: `Lepisosteiformes`, family: `Lepisosteidae`, hebrewFamily: `גאריים` },
        Pangasius: { order: `Siluriformes`, family: `Pangasiidae`, hebrewFamily: `שפמנוני פנגסיוס` },
        Phractocephalus: { order: `Siluriformes`, family: `Pimelodidae`, hebrewFamily: `שפמנוני פימלודיים` },
        Pseudoplatystoma: { order: `Siluriformes`, family: `Pimelodidae`, hebrewFamily: `שפמנוני פימלודיים` },
        Lithodoras: { order: `Siluriformes`, family: `Doradidae`, hebrewFamily: `שפמנונים קוצניים / דורדיים` },
        Bagarius: { order: `Siluriformes`, family: `Sisoridae`, hebrewFamily: `שפמנוני הרים אסיאתיים` },
        Wallago: { order: `Siluriformes`, family: `Siluridae`, hebrewFamily: `שפמנוניים אמיתיים` },
        Zungaro: { order: `Siluriformes`, family: `Pimelodidae`, hebrewFamily: `שפמנוני פימלודיים` },
        Brachyplatystoma: { order: `Siluriformes`, family: `Pimelodidae`, hebrewFamily: `שפמנוני פימלודיים` },
        Carettochelys: { order: `Testudines`, family: `Carettochelyidae`, hebrewFamily: `צביים חזיר-אף` },
        Tetraodon: { order: `Tetraodontiformes`, family: `Tetraodontidae`, hebrewFamily: `אבו-נפחאיים` },
        Osphronemus: { order: `Anabantiformes`, family: `Osphronemidae`, hebrewFamily: `גוראמיים` },
        Protopterus: { order: `Lepidosireniformes`, family: `Protopteridae`, hebrewFamily: `דגי ריאות אפריקאיים` },
        Cichla: { order: `Cichliformes`, family: `Cichlidae`, hebrewFamily: `אמנוניים / ציקלידיים` },
        Osteoglossum: { order: `Osteoglossiformes`, family: `Osteoglossidae`, hebrewFamily: `לשונות-עצם` },
        Pristis: { order: `Rhinopristiformes`, family: `Pristidae`, hebrewFamily: `מסורניים` },
        Acipenser: { order: `Acipenseriformes`, family: `Acipenseridae`, hebrewFamily: `חדקניים` },
        Polyodon: { order: `Acipenseriformes`, family: `Polyodontidae`, hebrewFamily: `דגי משוט` }
    };

    function getGenus(scientificName) {
        return String(scientificName || '').trim().split(/\s+/)[0];
    }

    function enrichArray(array) {
        if (!Array.isArray(array)) return;
        array.forEach(fish => {
            if (!fish || !fish.scientificName) return;
            const genus = getGenus(fish.scientificName);
            const taxonomy = taxonomyByGenus[genus];
            if (!taxonomy) return;
            fish.taxonomy = {
                kingdom: `Animalia`,
                phylum: `Chordata`,
                className: fish.scientificName && fish.scientificName.startsWith('Pristis') ? `Chondrichthyes` : `Actinopterygii`,
                order: taxonomy.order,
                family: taxonomy.family,
                hebrewFamily: taxonomy.hebrewFamily,
                genus
            };
        });
    }

    enrichArray(window.fishData_PoolLegends);
    enrichArray(window.fishData_GlassTanks);
    enrichArray(window.fishData_WorldMonsters);
    enrichArray(window.fishData_AncientSurvivors);
})();
