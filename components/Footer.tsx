import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
        &copy; {new Date().getFullYear()} {siteConfig.domains.join(" & ")}
      </p>
    </footer>
  );
}
