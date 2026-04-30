// קובץ: data/scientific_sources.js
// שכבת מקורות מדעיים לכל מאגר הדגים.
// הסטנדרט שנבחר: FishBase + IUCN Red List + Britannica.
// הקובץ אינו מחליף את הנתונים המקוריים, אלא מוסיף sources לדגים שאין להם עדיין מקורות.

(function () {
    const SOURCE_LABELS = {
        fishbase: `FishBase`,
        iucn: `IUCN Red List`,
        britannica: `Britannica`
    };

    function normalizeScientificName(scientificName) {
        return String(scientificName || '')
            .trim()
            .replace(/\s+/g, ' ');
    }

    function toFishBaseUrl(scientificName) {
        const cleanName = normalizeScientificName(scientificName);
        if (!cleanName || !cleanName.includes(' ')) return null;
        return `https://www.fishbase.se/summary/${cleanName.replace(/\s+/g, '-')}.html`;
    }

    function toIucnSearchUrl(scientificName) {
        const cleanName = normalizeScientificName(scientificName);
        if (!cleanName) return null;
        return `https://www.iucnredlist.org/search?query=${encodeURIComponent(cleanName)}&searchType=species`;
    }

    function toBritannicaSearchUrl(scientificName, hebrewName) {
        const query = normalizeScientificName(scientificName) || String(hebrewName || '').trim();
        if (!query) return null;
        return `https://www.britannica.com/search?query=${encodeURIComponent(query)}`;
    }

    function buildStandardSources(fish) {
        const urls = [
            toFishBaseUrl(fish.scientificName),
            toIucnSearchUrl(fish.scientificName),
            toBritannicaSearchUrl(fish.scientificName, fish.name)
        ].filter(Boolean);

        return urls;
    }

    function enrichArray(array) {
        if (!Array.isArray(array)) return;
        array.forEach(fish => {
            if (!fish || !fish.scientificName) return;
            const existingSources = Array.isArray(fish.sources) ? fish.sources.filter(Boolean) : [];
            const standardSources = buildStandardSources(fish);
            fish.sources = Array.from(new Set([...existingSources, ...standardSources]));
            fish.sourceStandard = `FishBase + IUCN Red List + Britannica`;
        });
    }

    enrichArray(window.fishData_PoolLegends);
    enrichArray(window.fishData_GlassTanks);
    enrichArray(window.fishData_WorldMonsters);
    enrichArray(window.fishData_AncientSurvivors);

    window.scientificSourceLabels = SOURCE_LABELS;
})();
