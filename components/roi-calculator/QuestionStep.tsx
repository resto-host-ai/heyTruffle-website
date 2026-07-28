export function QuestionStep({
  index,
  total,
  title,
  subtitle,
  children,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#251f21]/50">
        Step {index} of {total}
      </div>
      <h2 className="mx-auto mb-3.5 max-w-[720px] text-center font-serif text-3xl leading-tight text-[#251f21] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mb-8 max-w-[540px] text-center text-[15px] text-[#251f21]/60">
          {subtitle}
        </p>
      )}
      <div className="mt-7">{children}</div>
    </div>
  );
}
