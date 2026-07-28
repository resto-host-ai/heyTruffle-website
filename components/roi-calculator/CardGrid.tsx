export function CardGrid({
  columns,
  children,
}: {
  columns: 3 | 4;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mx-auto grid max-w-[880px] grid-cols-1 gap-3.5 min-[420px]:grid-cols-2 ${
        columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {children}
    </div>
  );
}
