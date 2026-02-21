interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      {title && (
        <h2 className="mb-6 font-mono text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
