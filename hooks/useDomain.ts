"use client";

import { useEffect, useState } from "react";
import { siteConfig, domainKeys, type DomainKey } from "@/lib/site";

export function useDomain() {
  const [current, setCurrent] = useState<DomainKey>(siteConfig.primaryDomain);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const matched = domainKeys.find(
      (d) => hostname === d || hostname.endsWith(`.${d}`),
    );
    if (matched) setCurrent(matched);
    setMounted(true);
  }, []);

  const config = siteConfig.domains[current];

  return { domain: current, email: config.email, mounted };
}
