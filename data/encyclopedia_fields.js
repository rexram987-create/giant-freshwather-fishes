// קובץ: data/encyclopedia_fields.js
// שכבת השלמה אנציקלופדית לכל דג.
// מטרת הקובץ: לוודא שלכל דף דג יש את שבעת השדות שהוגדרו:
// 1. אטימולוגיה מלאה ומפורקת
// 2. מידע על המגלה / המתאר המדעי
// 3. שנת הגילוי / התיאור המדעי
// 4. מיקום הגילוי / אזור התיאור
// 5. נסיבות הגילוי / התיאור המדעי
// 6. מידות ומשקל
// 7. תזונה

(function () {
    function clean(value, fallback = `מידע להשלים`) {
        const text = String(value || '').trim();
        return text || fallback;
    }

    function buildDiscovererDetails(fish) {
        const discoverer = clean(fish.discoverer, `המתאר המדעי אינו מצוין במאגר`);
        const year = clean(fish.year, `שנה לא ידועה`);
        const scientificName = clean(fish.scientificName, `שם מדעי לא ידוע`);
        return `המין ${scientificName} תואר מדעית על ידי ${discoverer} בשנת ${year}. בשלב הבא מומלץ להרחיב סעיף זה לביוגרפיה קצרה של החוקר, תחום התמחותו, והקשר ההיסטורי של פרסום התיאור המדעי.`;
    }

    function buildDiscoveryLocation(fish) {
        if (fish.discoveryLocation) return fish.discoveryLocation;
        if (fish.origin) return `אזור התפוצה או אזור התיעוד המרכזי במאגר: ${fish.origin}. יש להבדיל בין אזור תפוצה טבעי לבין נקודת גילוי מדעית מדויקת, שאותה מומלץ לאמת מול FishBase, IUCN או הספרות הטקסונומית.`;
        return `מיקום גילוי מדויק להשלים`;
    }

    function buildMeasurements(fish) {
        return `אורך: ${clean(fish.size, `לא צוין`)}. משקל: ${clean(fish.weight, `לא צוין`)}.`;
    }

    function buildDiet(fish) {
        return clean(fish.diet, `תזונה להשלים`);
    }

    function buildDiscoveryCircumstances(fish) {
        if (fish.discoveryCircumstances) return fish.discoveryCircumstances;
        return `נסיבות הגילוי או התיאור המדעי עדיין אינן מפורטות במאגר. מומלץ להשלים לפי מקורות כמו FishBase, IUCN, Britannica או מאמר התיאור המקורי אם הוא זמין.`;
    }

    function enrichFish(fish) {
        if (!fish) return;

        fish.encyclopediaProfile = {
            etymologyFull: clean(fish.etymology, `אטימולוגיה מלאה להשלים`),
            discovererDetails: clean(fish.discovererDetails, buildDiscovererDetails(fish)),
            discoveryYear: clean(fish.year, `שנת תיאור להשלים`),
            discoveryLocation: buildDiscoveryLocation(fish),
            discoveryCircumstances: buildDiscoveryCircumstances(fish),
            measurements: buildMeasurements(fish),
            diet: buildDiet(fish)
        };
    }

    function enrichArray(array) {
        if (!Array.isArray(array)) return;
        array.forEach(enrichFish);
    }

    enrichArray(window.fishData_PoolLegends);
    enrichArray(window.fishData_GlassTanks);
    enrichArray(window.fishData_WorldMonsters);
    enrichArray(window.fishData_AncientSurvivors);
})();
