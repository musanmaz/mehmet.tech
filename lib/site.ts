export const siteConfig = {
  name: "Mehmet Sirin Usanmaz",
  title: "Mehmet Sirin Usanmaz — DevOps Team Lead",
  description:
    "DevOps Team Lead building scalable infrastructure and leading engineering teams. Focused on reliability, automation, and observability.",
  url: "https://mehmet.tech",

  domains: {
    "mehmet.tech": { email: "hello@mehmet.tech" },
    "mehmetsir.in": { email: "usanmaz@mehmetsir.in" },
    "musanmaz.com.tr": { email: "info@musanmaz.com.tr" },
  },

  primaryDomain: "mehmet.tech",

  hero: {
    role: "DevOps Team Lead",
    tagline: "DevOps | Cloud | Automation | Observability",
    intro:
      "DevOps Team Lead building scalable infrastructure and leading engineering teams. I help teams ship faster, stay reliable, and build observable systems — from CI/CD pipelines to production-grade Kubernetes clusters.",
  },

  socialLinks: {
    github: "https://github.com/musanmaz",
    linkedin: "https://linkedin.com/in/mehmetsirinusanmaz",
    medium: "https://medium.com/@musanmaz",
    x: "https://twitter.com/musanmaz",
  },

  emails: [
    { address: "hello@mehmet.tech", label: "General inquiries", icon: "gmail" },
    {
      address: "info@musanmaz.com.tr",
      label: "Business / proposals",
      icon: "outlook",
    },
    { address: "usanmaz@mehmetsir.in", label: "Alternative", icon: "mail" },
  ],

  featuredProjects: [
    {
      name: "Runtrixy",
      url: "https://runtrixy.com",
      description:
        "No-code BDD test automation platform for web, REST API, and SQL testing.",
      problem:
        "Teams need to write and execute BDD tests without coding expertise. Existing tools are fragmented across web UI, API, and database testing. Runtrixy unifies all three under a single Gherkin-based platform with 300+ predefined steps.",
      techStack: [
        "Java 21",
        "Spring Boot 3.x",
        "React 18",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Next.js 16",
        "PostgreSQL 16",
        "Redis 7",
        "MinIO",
        "Selenium WebDriver",
        "Cucumber/Gherkin",
      ],
      useCase:
        "QA teams and developers automating BDD test scenarios. Features include Monaco editor with Gherkin autocomplete, Git integration (GitHub/GitLab/Bitbucket), real-time WebSocket execution, scheduled runs, visual regression, and multi-language support (70+ languages including Turkish).",
    },
    {
      name: "HesapBotu",
      url: "https://hesapbotu.com",
      description:
        "Turkey's smart calculator and AI analysis platform — 10+ categories, live data, and a Gemini-powered assistant.",
      problem:
        "Turkish users have no single, accurate tool for finance, career, and education calculations. Switching between scattered calculators is slow, and none offer natural-language queries.",
      techStack: [
        "Next.js 16",
        "Tailwind CSS v4",
        "Prisma",
        "Neon PostgreSQL",
        "Vercel",
        "JWT",
        "Gemini AI",
      ],
      useCase:
        "Loan amortisation, net/gross salary, LGS/TYT/AYT score panels, BMR/ideal weight, gold, currency, crypto calculators. AI assistant accepts free-form Turkish queries and routes to the correct calculator via Gemini intent parsing.",
    },
    {
      name: "CronWizard",
      url: "https://cronwizard.com",
      repo: "https://github.com/musanmaz/cronwizard",
      description:
        "Cron expression generator, validator, and scheduler toolkit.",
      problem:
        "Writing and validating cron expressions manually is error-prone. Teams need a quick way to generate, verify, preview upcoming runs, and export to Kubernetes CronJob / GitHub Actions / systemd formats.",
      techStack: [
        "Next.js 14",
        "NestJS 10",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Zod",
        "Vitest",
        "pnpm",
      ],
      useCase:
        "DevOps and backend teams scheduling cron-based jobs. API endpoints: generate, validate, next, export, healthz, readyz.",
    },
    {
      name: "Spyglass",
      url: "https://spyglass.mehmet.tech",
      repo: "https://github.com/musanmaz/spyglass",
      description:
        "Modern, open-source network looking glass for ISPs and network operators.",
      problem:
        "ISPs and network operators need a clean, modern web interface to let users run BGP route lookups, ping, and traceroute queries across multiple routers. Legacy looking glass tools lack real-time streaming and multi-platform support.",
      techStack: [
        "Python 3.11+",
        "FastAPI",
        "SQLAlchemy 2",
        "Netmiko",
        "React 18",
        "TypeScript 5",
        "Tailwind CSS",
        "Zustand",
        "PostgreSQL 15",
        "Redis 7",
        "Docker",
        "Nginx",
      ],
      useCase:
        "Network operators providing public or internal looking glass services. Supports 13 router platforms (Cisco IOS/IOS-XR/NX-OS, Juniper, Arista, Huawei, Nokia, MikroTik, FRRouting, BIRD, VyOS, and more) with real-time WebSocket streaming.",
    },
    {
      name: "NetShift",
      repo: "https://github.com/musanmaz/netshift",
      description:
        "Native macOS menu bar app for managing DNS servers and /etc/hosts files.",
      problem:
        "Switching DNS profiles and managing hosts files on macOS requires terminal commands and manual editing. NetShift provides a single-click solution with a native menu bar interface.",
      techStack: ["Swift", "SwiftUI", "macOS 14+", "Homebrew"],
      useCase:
        "Developers and network admins managing multiple hosts files and DNS configurations. Features include hosts file editor, DNS profiles (Cloudflare, Google, Quad9, OpenDNS), DNS benchmark with avg/P50/P90 latency, and automatic DNS cache flushing.",
    },
    {
      name: "local-llm",
      repo: "https://github.com/musanmaz/local-llm",
      description:
        "Multi-model chat app that queries 4 LLMs in parallel and generates a judge summary.",
      problem:
        "Comparing responses across multiple LLM providers requires switching between tools. local-llm sends every message to 4 models simultaneously via a LiteLLM proxy and uses a judge model to synthesize a summary.",
      techStack: [
        "Next.js 15",
        "PostgreSQL",
        "LiteLLM",
        "Docker Compose",
        "JWT",
      ],
      useCase:
        "Developers and researchers evaluating LLM quality side-by-side. Supports cheap/best model mode switching, persistent thread history, and self-hosted deployment via Docker.",
    },
    {
      name: "BoxGuard",
      repo: "https://github.com/musanmaz/BoxGuard",
      description:
        "Vagrant box and SSH vulnerability scanner with real CVE integration.",
      problem:
        "Detecting security vulnerabilities in Vagrant boxes and remote systems requires manual checks or complex toolchains. BoxGuard automates OS detection, package inventory, and CVE matching in a single CLI tool.",
      techStack: ["Go", "OSV.dev API", "Ubuntu USN feeds"],
      useCase:
        "Security-conscious teams scanning Vagrant environments and SSH-reachable hosts. Supports Ubuntu, Debian, RHEL, CentOS, Rocky Linux, AlmaLinux with table and JSON output formats.",
    },
    {
      name: "mehmet.tech",
      url: "https://mehmet.tech",
      repo: "https://github.com/musanmaz/mehmet.tech",
      description: "Personal website and digital business card.",
      problem:
        "A single page to present professional profile, projects, and contact info.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      useCase: "Personal branding, portfolio showcase.",
    },
    {
      name: "TurkNet/consul-io",
      repo: "https://github.com/TurkNet/consul-io",
      description:
        "CLI tool to import and export configuration files to/from Consul KV store.",
      problem:
        "Managing configuration files across microservices in Consul KV requires manual uploads or custom scripts. consul-io automates bulk import/export with directory structure preservation, ACL token support, --ignore filtering, and colorful console output.",
      techStack: ["Go", "Cobra CLI", "HashiCorp Consul API"],
      useCase:
        "Microservice infrastructures using Consul for config management. Finds .production files in a directory tree and syncs them with Consul KV.",
    },
    {
      name: "TurkNet/TnHermione",
      repo: "https://github.com/TurkNet/TnHermione",
      description:
        "AI-powered chatbot with image generation, multilingual support, and Prometheus metrics.",
      problem:
        "Internal teams need a conversational AI assistant that answers questions, generates images from prompts, filters sensitive information (passwords, tokens, keys), and integrates with Microsoft Teams — all with built-in observability.",
      techStack: [
        "Python",
        "Microsoft Bot Framework",
        "Prometheus",
        "Docker",
      ],
      useCase:
        "Enterprise teams needing an AI chatbot with sensitive data filtering, command support, and monitoring via Prometheus.",
    },
    {
      name: "bb-dev-report",
      repo: "https://github.com/musanmaz/bb-dev-report",
      description:
        "Developer activity reporting app for Bitbucket Cloud via Atlassian Connect.",
      problem:
        "Engineering managers need visibility into developer contributions across Bitbucket workspaces without manually aggregating data.",
      techStack: ["JavaScript", "Node.js", "Express", "Atlassian Connect"],
      useCase:
        "Team leads and engineering managers tracking developer productivity.",
    },
  ],

  otherProjects: {
    "DevOps / Platform Tooling": [
      {
        name: "docker-slave",
        repo: "https://github.com/musanmaz/docker-slave",
        description: "Docker slave image for Jenkins",
        language: "Dockerfile",
      },
      {
        name: "docker-jenkins-slave-atlassian-sdk",
        repo: "https://github.com/musanmaz/docker-jenkins-slave-atlassian-sdk",
        description: "Jenkins slave image with Atlassian SDK",
        language: "Dockerfile",
      },
      {
        name: "chrome-stable",
        repo: "https://github.com/musanmaz/chrome-stable",
        description: "Chrome Stable installation script",
        language: "Shell",
      },
      {
        name: "jira",
        repo: "https://github.com/musanmaz/jira",
        description: "Jira helper tools",
        language: "Shell",
      },
      {
        name: "docker-dashing",
        repo: "https://github.com/musanmaz/docker-dashing",
        description: "Dashing dashboard Docker container",
        language: "Shell",
      },
    ],
    "CI/CD & Pipelines": [
      {
        name: "hello-github-actions",
        repo: "https://github.com/musanmaz/hello-github-actions",
        description: "GitHub Actions starter template",
        language: "Dockerfile",
      },
      {
        name: "nodejs-docker-jenkins-slave",
        repo: "https://github.com/musanmaz/nodejs-docker-jenkins-slave",
        description: "Node.js Jenkins slave image",
        language: "Dockerfile",
      },
      {
        name: "dotnet-core-slave",
        repo: "https://github.com/musanmaz/dotnet-core-slave",
        description: ".NET Core Jenkins slave image",
        language: "Dockerfile",
      },
    ],
    "Learning / Demo": [
      {
        name: "DreamTest",
        repo: "https://github.com/musanmaz/DreamTest",
        description: "Test automation experiment",
        language: "Java",
      },
      {
        name: "allure-report-gradle",
        repo: "https://github.com/musanmaz/allure-report-gradle",
        description: "Allure Report + Gradle integration",
        language: "Java",
      },
      {
        name: "example-node-rest",
        repo: "https://github.com/musanmaz/example-node-rest",
        description: "Node.js REST API example",
        language: "JavaScript",
      },
      {
        name: "senfoni",
        repo: "https://github.com/musanmaz/senfoni",
        description: "JavaScript project",
        language: "JavaScript",
      },
    ],
  },

  techFocus: {
    "Platform & Cloud": [
      "Kubernetes",
      "OpenShift",
      "Docker",
      "Container Security",
      "AWS",
      "Azure",
      "Jenkins",
      "GitHub Actions",
      "Nginx",
      "OpenResty",
      "Node.js",
      "Go",
      "TypeScript",
    ],
    "Observability & Automation": [
      "Grafana",
      "Prometheus",
      "Elasticsearch",
      "Kibana (ELK)",
      "Consul",
      "Vault",
      "Selenium",
      "Test Automation",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "MongoDB",
    ],
  },

  writing: [
    {
      title:
        "My One-Year Leadership Journey: Expectations, Realities, and Lessons Learned",
      url: "https://medium.com/turknettech/bir-y%C4%B1ll%C4%B1k-liderlik-yolculu%C4%9Fum-beklentiler-ger%C3%A7ekler-ve-%C3%B6%C4%9Frendiklerim-e5db422b4bc6",
    },
    {
      title: "Consul IO: A Simple and Effective CLI Tool",
      url: "https://medium.com/turknettech/consul-io-basit-ve-etkili-bir-cli-arac%C4%B1-b5c77739194a",
    },
  ],

  forks: [
    {
      name: "wiremock",
      repo: "https://github.com/musanmaz/wiremock",
      description: "HTTP service mocking tool",
    },
    {
      name: "mocha",
      repo: "https://github.com/musanmaz/mocha",
      description: "JavaScript test framework",
    },
    {
      name: "wolfichef",
      repo: "https://github.com/musanmaz/wolfichef",
      description: "Secure image creator with Wolfi packages",
    },
    {
      name: "container-up",
      repo: "https://github.com/musanmaz/container-up",
      description: "Container demos in various languages",
    },
    {
      name: "sonarqube-openshift-docker",
      repo: "https://github.com/musanmaz/sonarqube-openshift-docker",
      description: "OpenShift SonarQube Docker build",
    },
    {
      name: "jira-openshift",
      repo: "https://github.com/musanmaz/jira-openshift",
      description: "Jira templates for OpenShift",
    },
    {
      name: "crowd",
      repo: "https://github.com/musanmaz/crowd",
      description: "Dockerized Atlassian Crowd",
    },
    {
      name: "bitbucket",
      repo: "https://github.com/musanmaz/bitbucket",
      description: "Dockerized Atlassian Bitbucket",
    },
    {
      name: "confluence",
      repo: "https://github.com/musanmaz/confluence",
      description: "Dockerized Atlassian Confluence",
    },
    {
      name: "letsencrypt",
      repo: "https://github.com/musanmaz/letsencrypt",
      description: "Dockerized Let's Encrypt Client",
    },
    {
      name: "docker-atlassian-sdk",
      repo: "https://github.com/musanmaz/docker-atlassian-sdk",
      description: "Atlassian SDK Docker image",
    },
    {
      name: "setup-java",
      repo: "https://github.com/musanmaz/setup-java",
      description: "GitHub Actions Java setup",
    },
  ],

  orgContributions: [
    {
      name: "TurkNet/consul-io",
      repo: "https://github.com/TurkNet/consul-io",
      description: "Consul KV import/export CLI tool",
      language: "Go",
    },
    {
      name: "TurkNet/TnHermione",
      repo: "https://github.com/TurkNet/TnHermione",
      description: "AI-powered chatbot with sensitive data filtering",
      language: "Python",
    },
  ],

  contact: {
    github: "https://github.com/musanmaz",
    linkedin: "https://www.linkedin.com/in/mehmetsirinusanmaz/",
    medium: "https://medium.com/@musanmaz",
    x: "https://twitter.com/musanmaz",
  },
} as const;

export type DomainKey = keyof typeof siteConfig.domains;

export const domainKeys = Object.keys(siteConfig.domains) as DomainKey[];
