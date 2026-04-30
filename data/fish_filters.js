// קובץ: data/fish_filters.js
// מסנן יצורים שאינם דגים, כדי שהאתר יתמקד בדגים בלבד.

(function () {
  const excludedScientificNames = new Set([
    'Carettochelys insculpta'
  ]);

  function onlyFish(item) {
    return item && !excludedScientificNames.has(String(item.scientificName || '').trim());
  }

  if (Array.isArray(window.fishData_PoolLegends)) {
    window.fishData_PoolLegends = window.fishData_PoolLegends.filter(onlyFish);
  }
  if (Array.isArray(window.fishData_GlassTanks)) {
    window.fishData_GlassTanks = window.fishData_GlassTanks.filter(onlyFish);
  }
  if (Array.isArray(window.fishData_WorldMonsters)) {
    window.fishData_WorldMonsters = window.fishData_WorldMonsters.filter(onlyFish);
  }
  if (Array.isArray(window.fishData_AncientSurvivors)) {
    window.fishData_AncientSurvivors = window.fishData_AncientSurvivors.filter(onlyFish);
  }
})();
