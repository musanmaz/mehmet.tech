export const siteConfig = {
  name: "Mehmet Şirin Usanmaz",
  title: "Mehmet Şirin Usanmaz — DevOps Team Lead",
  description:
    "Senior DevOps leader building scalable infrastructure, automation pipelines, and high-availability systems.",
  url: "https://mehmet.tech",
  domains: ["mehmet.tech", "mehmetsir.in"],

  hero: {
    tagline: "Designing resilient systems. Leading DevOps transformation.",
    intro:
      "Senior DevOps leader building scalable infrastructure, automation pipelines, and high-availability systems. Focused on reliability, security, and engineering culture.",
  },

  whatIDo: [
    {
      title: "DevOps & Platform Engineering",
      description:
        "Building developer platforms that abstract complexity. Standardizing environments, toolchains, and workflows across teams.",
    },
    {
      title: "CI/CD & Automation",
      description:
        "Designing pipeline architectures that ship fast and safe. From build optimization to deployment strategies — automated end to end.",
    },
    {
      title: "Kubernetes & Cloud Infrastructure",
      description:
        "Architecting production-grade clusters on AWS, GCP, and Azure. Infrastructure as code, GitOps, and multi-cloud strategies.",
    },
    {
      title: "Observability & Reliability",
      description:
        "Implementing monitoring, alerting, and SLO-driven reliability practices. Making systems observable before they break.",
    },
  ],

  currentFocus: [
    "Leading DevOps transformation initiatives",
    "Designing high-availability architectures",
    "Building internal engineering tools",
    "Improving CI/CD velocity & reliability",
  ],

  philosophy: {
    quote: "Good systems are invisible. Great systems are resilient.",
    body: "I believe in reliability over novelty, automation over repetition, and documentation over tribal knowledge. Every decision should be measurable, every system should be reproducible, and every failure should teach something.",
  },

  contact: {
    emails: ["hello@mehmet.tech", "usanmaz@mehmetsir.in"],
    github: "https://github.com/musanmaz",
    linkedin: "https://www.linkedin.com/in/mehmetsirinusanmaz/",
  },
} as const;
