type RiskBadgeProps = { risk?: string };

export function RiskBadge({ risk }: RiskBadgeProps) {
  const normalized = (risk || 'LOW').toUpperCase();
  const styles =
    normalized === 'HIGH'
      ? 'border-red-500/50 bg-red-500/10 text-red-200'
      : normalized === 'MEDIUM'
        ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-200'
        : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200';

  const icon = normalized === 'HIGH' ? '🔴' : normalized === 'MEDIUM' ? '🟡' : '🟢';

  return <span className={`rounded-full border px-2 py-1 text-sm font-medium ${styles}`}>{icon} {normalized}</span>;
}
