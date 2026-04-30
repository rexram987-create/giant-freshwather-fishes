// קובץ: data/discoverers.js
// מוסיף שנות חיים למגלים ומעשיר את הטקסט האנציקלופדי.

(function () {
  const lifespans = {
    'Heinrich Rudolf Schinz': '1777–1861',
    'Bernard Germain de Lacépède': '1756–1825',
    'Hugh McCormick Smith': '1865–1941',
    'Bloch & Schneider': 'Marcus Elieser Bloch (1723–1799), Johann Gottlob Schneider (1750–1822)',
    'Carl Linnaeus': '1707–1778',
    'Georges Cuvier': '1769–1832',
    'Achille Valenciennes': '1794–1865',
    'William Henry Sykes': '1790–1872',
    'Alexander von Humboldt': '1769–1859'
  };

  function enrich(fish) {
    if (!fish || !fish.discoverer) return;
    const life = lifespans[fish.discoverer];
    if (!life) return;

    if (!fish.discovererDetails) {
      fish.discovererDetails = `${fish.discoverer} (${life})`;
    } else if (!fish.discovererDetails.includes(life)) {
      fish.discovererDetails += ` (${life})`;
    }

    if (fish.encyclopediaProfile && fish.encyclopediaProfile.discovererDetails && !fish.encyclopediaProfile.discovererDetails.includes(life)) {
      fish.encyclopediaProfile.discovererDetails += ` (${life})`;
    }
  }

  [
    window.fishData_PoolLegends,
    window.fishData_GlassTanks,
    window.fishData_WorldMonsters,
    window.fishData_AncientSurvivors
  ].forEach(arr => Array.isArray(arr) && arr.forEach(enrich));
})();
