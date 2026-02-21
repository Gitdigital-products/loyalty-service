const TIERS = [
  { name: 'BRONZE', min: 0 },
  { name: 'SILVER', min: 5000 },
  { name: 'GOLD', min: 15000 },
  { name: 'PLATINUM', min: 50000 }
];

export function calculateTier(lifetimePoints: number) {
  return TIERS.slice().reverse().find(t => lifetimePoints >= t.min) || TIERS[0];
}
