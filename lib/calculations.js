export const calcSinergia = (ids, casosMap) => {
  if (!ids.length) return { bonus: 0, disc: 0 };

  const sectorCounts = {};
  const typeCounts = {};

  ids.forEach(id => {
    const c = casosMap[id];
    sectorCounts[c.s] = (sectorCounts[c.s] || 0) + 1;
    typeCounts[c.t] = (typeCounts[c.t] || 0) + 1;
  });

  let bonus = 0, disc = 0;

  Object.values(sectorCounts).forEach(count => {
    if (count >= 2) {
      bonus += 10 * (count - 1);
      disc += 15 * (count - 1);
    }
  });

  Object.values(typeCounts).forEach(count => {
    if (count >= 2) {
      bonus += 12 * (count - 1);
      disc += 18 * (count - 1);
    }
  });

  if (ids.length >= 3) {
    bonus += 15;
    disc += 15;
  }

  return { bonus: Math.min(bonus, 50), disc: Math.min(disc, 50) };
};

export const calcResumen = (selectedIds, casosMap) => {
  const selectedCasos = selectedIds.map(id => casosMap[id]);
  const sinergia = calcSinergia(selectedIds, casosMap);

  const invYear1 = selectedCasos.reduce((s, c) => s + c.ini + c.rec * 12, 0);
  const invBundled = invYear1 * (1 - sinergia.disc / 100);

  return {
    selectedCasos,
    sinergia,
    invYear1,
    invBundled,
  };
};
