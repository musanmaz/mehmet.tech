interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-xl border border-neutral-200/60 bg-neutral-50 p-6 transition-colors dark:border-neutral-800/60 dark:bg-neutral-900/50">
      <h3 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
