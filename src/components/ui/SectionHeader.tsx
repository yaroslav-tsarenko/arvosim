export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="text-3xl font-bold text-text md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-light max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
