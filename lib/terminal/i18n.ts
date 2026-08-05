export type Lang = "en" | "tr";

export const langs: Lang[] = ["en", "tr"];

export const defaultLang: Lang = "en";

export function isLang(value: string): value is Lang {
  return value === "en" || value === "tr";
}

export interface Dict {
  boot: string[];
  bootReady: string;
  welcomeSub: string;
  welcomeHint: string;
  skipHint: string;

  labels: {
    role: string;
    focus: string;
    about: string;
    problem: string;
    techStack: string;
    useCase: string;
    live: string;
    repo: string;
    read: string;
    category: string;
    language: string;
    featuredProjects: string;
    otherProjects: string;
    skills: string;
    writing: string;
    openSource: string;
    forks: string;
    contributions: string;
    contact: string;
    emails: string;
    social: string;
    themes: string;
    current: string;
    usage: string;
    aliases: string;
    examples: string;
    matches: string;
    noMatches: string;
    empty: string;
    total: string;
    uptime: string;
    shell: string;
    location: string;
    availableIn: string;
    tip: string;
  };

  groups: {
    fs: string;
    info: string;
    system: string;
    fun: string;
  };

  summaries: Record<string, string>;
  details: Record<string, string>;

  errors: {
    notFound: (cmd: string) => string;
    didYouMean: (cmd: string) => string;
    noSuchFile: (path: string) => string;
    notADirectory: (path: string) => string;
    isADirectory: (path: string) => string;
    missingArg: (usage: string) => string;
    unknownTheme: (name: string) => string;
    unknownLang: (name: string) => string;
    unknownProject: (name: string) => string;
    nothingToOpen: string;
    noManual: (cmd: string) => string;
  };

  msgs: {
    themeSet: (label: string) => string;
    themePreview: string;
    langSet: string;
    crtOn: string;
    crtOff: string;
    historyEmpty: string;
    historyCleared: string;
    opening: (target: string) => string;
    leaving: string;
    helpIntro: string;
    helpFooter: string;
    grepUsage: string;
    contactCta: string;
    projectsHint: string;
  };

  fun: {
    sudo: string;
    rmrf: string[];
    vim: string;
    coffee: string;
    matrix: string;
    fortunes: string[];
  };
}

const en: Dict = {
  boot: [
    "booting mehmet.tech kernel 2.6.0 ...",
    "mounting /dev/portfolio ......... ok",
    "loading site config ............. ok",
    "starting theme engine ........... ok",
    "resolving dns for mehmet.tech ... ok",
    "spawning interactive shell ...... ok",
  ],
  bootReady: "System ready.",
  welcomeSub: "DevOps Team Lead — infrastructure, automation, observability.",
  welcomeHint:
    "Type 'help' for commands, 'ls' to browse, 'theme' to restyle, 'lang tr' for Turkish.",
  skipHint: "press any key to skip",

  labels: {
    role: "Role",
    focus: "Focus",
    about: "About",
    problem: "Problem",
    techStack: "Tech stack",
    useCase: "Use case",
    live: "Live",
    repo: "Repo",
    read: "Read",
    category: "Category",
    language: "Language",
    featuredProjects: "Featured projects",
    otherProjects: "Other projects",
    skills: "Technology focus",
    writing: "Writing",
    openSource: "Open source",
    forks: "Forks",
    contributions: "Organisation contributions",
    contact: "Contact",
    emails: "Email",
    social: "Social",
    themes: "Themes",
    current: "current",
    usage: "Usage",
    aliases: "Aliases",
    examples: "Examples",
    matches: "match(es)",
    noMatches: "no matches",
    empty: "empty",
    total: "total",
    uptime: "Uptime",
    shell: "Shell",
    location: "Location",
    availableIn: "available in",
    tip: "Tip",
  },

  groups: {
    fs: "Filesystem",
    info: "Information",
    system: "System",
    fun: "Extras",
  },

  summaries: {
    help: "List every available command",
    man: "Show the manual page for a command",
    ls: "List directory contents",
    cd: "Change the working directory",
    pwd: "Print the working directory",
    cat: "Print the contents of a file",
    tree: "Show the directory tree",
    find: "Find files by name",
    grep: "Search all content for a pattern",
    whoami: "Who is behind this terminal",
    about: "Longer introduction",
    projects: "List projects",
    project: "Show one project in detail",
    skills: "Technologies and tooling",
    writing: "Published articles",
    opensource: "Forks and organisation contributions",
    contact: "All the ways to reach me",
    email: "Email addresses",
    social: "Social profiles",
    neofetch: "System summary card",
    banner: "Reprint the ASCII banner",
    theme: "List or switch the colour theme",
    lang: "Switch the interface language",
    crt: "Toggle the CRT scanline effect",
    clear: "Clear the screen",
    history: "Show or clear command history",
    open: "Open a link in a new tab",
    date: "Show the current date and time",
    echo: "Print the given text",
    exit: "Return to the classic website",
    sudo: "Elevate privileges",
    matrix: "Follow the white rabbit",
    fortune: "Print a random quote",
    coffee: "Brew a cup",
    vim: "Open the legendary editor",
    rm: "Remove files",
  },

  details: {
    ls: "Accepts -l for a detailed listing and -a to include hidden entries. Without arguments it lists the current directory.",
    cd: "Supports absolute paths, relative paths, '..' for the parent, '~' or no argument for the root, and '-' for the previous directory.",
    cat: "Prints a rendered view of a file. Project files include the problem statement, tech stack and links.",
    tree: "Prints the whole tree from the current directory. Pass a path to start elsewhere.",
    grep: "Case-insensitive search across every file in the virtual filesystem. Prints the matching files with the surrounding text.",
    theme: "Run 'theme' to preview all themes, 'theme <name>' to apply one, or 'theme random' to be surprised. The choice is remembered in this browser.",
    lang: "Switches the shell language between English and Turkish. Project descriptions stay in their original language.",
    open: "Accepts a command target (github, linkedin, medium, x, site, a project name) or a full URL.",
    history: "Run 'history clear' to wipe the stored command history.",
    projects: "Add --all to include the smaller side projects grouped by category.",
  },

  errors: {
    notFound: (cmd) => `command not found: ${cmd}`,
    didYouMean: (cmd) => `did you mean '${cmd}'?`,
    noSuchFile: (path) => `no such file or directory: ${path}`,
    notADirectory: (path) => `not a directory: ${path}`,
    isADirectory: (path) => `is a directory: ${path}`,
    missingArg: (usage) => `missing argument — usage: ${usage}`,
    unknownTheme: (name) => `unknown theme: ${name}`,
    unknownLang: (name) => `unknown language: ${name} (use 'en' or 'tr')`,
    unknownProject: (name) => `unknown project: ${name}`,
    nothingToOpen: "nothing to open here",
    noManual: (cmd) => `no manual entry for ${cmd}`,
  },

  msgs: {
    themeSet: (label) => `theme set to ${label}`,
    themePreview: "Click a theme to apply it.",
    langSet: "Language set to English.",
    crtOn: "CRT effect enabled.",
    crtOff: "CRT effect disabled.",
    historyEmpty: "history is empty",
    historyCleared: "history cleared",
    opening: (target) => `opening ${target} ...`,
    leaving: "leaving the terminal ...",
    helpIntro:
      "Every piece of content on mehmet.tech is reachable from here. Click any highlighted word to run it.",
    helpFooter:
      "Tab completes, arrow keys walk the history, Ctrl+L clears, Ctrl+C cancels.",
    grepUsage: "usage: grep <pattern>",
    contactCta: "Happy to talk about infrastructure, platform work or hiring.",
    projectsHint: "Run 'cat projects/featured/<name>.md' or click a name.",
  },

  fun: {
    sudo: "Nice try. This incident has been reported to the SRE on call.",
    rmrf: [
      "rm: it is dangerous to operate recursively on '/'",
      "rm: refusing to nuke a perfectly good portfolio",
      "(the backups are in a different region anyway)",
    ],
    vim: "Vim opened successfully. To exit, close this tab and rethink your life choices. Or just press Enter.",
    coffee: "Brewing ... error 418: I'm a teapot. Kubernetes cannot schedule caffeine.",
    matrix: "Wake up, Neo ... press any key to stop.",
    fortunes: [
      "It works on my machine — the container disagrees.",
      "There is no cloud, it is just someone else's Kubernetes cluster.",
      "The best incident is the one your monitoring caught first.",
      "Automate it once, document it twice.",
      "Every manual step is a future outage.",
      "YAML: whitespace-sensitive character building.",
      "If it isn't observable, it isn't in production.",
      "Rollbacks are a feature, not an admission of defeat.",
    ],
  },
};

const tr: Dict = {
  boot: [
    "mehmet.tech çekirdeği 2.6.0 başlatılıyor ...",
    "/dev/portfolio bağlanıyor ....... tamam",
    "site yapılandırması yükleniyor .. tamam",
    "tema motoru başlatılıyor ........ tamam",
    "mehmet.tech dns çözümleniyor .... tamam",
    "etkileşimli kabuk açılıyor ...... tamam",
  ],
  bootReady: "Sistem hazır.",
  welcomeSub: "DevOps Takım Lideri — altyapı, otomasyon, gözlemlenebilirlik.",
  welcomeHint:
    "Komutlar için 'help', gezinmek için 'ls', tema için 'theme', İngilizce için 'lang en' yazın.",
  skipHint: "atlamak için bir tuşa basın",

  labels: {
    role: "Rol",
    focus: "Odak",
    about: "Hakkında",
    problem: "Problem",
    techStack: "Teknolojiler",
    useCase: "Kullanım alanı",
    live: "Canlı",
    repo: "Depo",
    read: "Oku",
    category: "Kategori",
    language: "Dil",
    featuredProjects: "Öne çıkan projeler",
    otherProjects: "Diğer projeler",
    skills: "Teknoloji odağı",
    writing: "Yazılar",
    openSource: "Açık kaynak",
    forks: "Fork'lar",
    contributions: "Kurumsal katkılar",
    contact: "İletişim",
    emails: "E-posta",
    social: "Sosyal",
    themes: "Temalar",
    current: "aktif",
    usage: "Kullanım",
    aliases: "Takma adlar",
    examples: "Örnekler",
    matches: "sonuç",
    noMatches: "sonuç yok",
    empty: "boş",
    total: "toplam",
    uptime: "Çalışma süresi",
    shell: "Kabuk",
    location: "Konum",
    availableIn: "şu dizinde",
    tip: "İpucu",
  },

  groups: {
    fs: "Dosya sistemi",
    info: "Bilgi",
    system: "Sistem",
    fun: "Ekstralar",
  },

  summaries: {
    help: "Tüm komutları listeler",
    man: "Bir komutun kılavuz sayfasını gösterir",
    ls: "Dizin içeriğini listeler",
    cd: "Çalışma dizinini değiştirir",
    pwd: "Çalışma dizinini yazar",
    cat: "Dosya içeriğini gösterir",
    tree: "Dizin ağacını gösterir",
    find: "Dosyaları isme göre arar",
    grep: "Tüm içerikte metin arar",
    whoami: "Bu terminalin arkasındaki kişi",
    about: "Daha uzun tanıtım",
    projects: "Projeleri listeler",
    project: "Tek bir projeyi detaylı gösterir",
    skills: "Teknolojiler ve araçlar",
    writing: "Yayımlanmış yazılar",
    opensource: "Fork'lar ve kurumsal katkılar",
    contact: "Bana ulaşmanın tüm yolları",
    email: "E-posta adresleri",
    social: "Sosyal profiller",
    neofetch: "Sistem özet kartı",
    banner: "ASCII banner'ı tekrar basar",
    theme: "Renk temasını listeler veya değiştirir",
    lang: "Arayüz dilini değiştirir",
    crt: "CRT tarama efektini açar/kapatır",
    clear: "Ekranı temizler",
    history: "Komut geçmişini gösterir veya siler",
    open: "Bir bağlantıyı yeni sekmede açar",
    date: "Güncel tarih ve saati gösterir",
    echo: "Verilen metni yazar",
    exit: "Klasik siteye geri döner",
    sudo: "Yetki yükseltir",
    matrix: "Beyaz tavşanı takip et",
    fortune: "Rastgele bir söz yazar",
    coffee: "Bir fincan demler",
    vim: "Efsanevi editörü açar",
    rm: "Dosya siler",
  },

  details: {
    ls: "Detaylı liste için -l, gizli girdiler için -a alır. Argümansız çalıştırıldığında bulunulan dizini listeler.",
    cd: "Mutlak ve göreli yolları, üst dizin için '..', kök için '~' veya argümansız kullanımı, önceki dizin için '-' destekler.",
    cat: "Dosyanın işlenmiş halini basar. Proje dosyaları problem tanımını, teknoloji listesini ve bağlantıları içerir.",
    tree: "Bulunulan dizinden itibaren tüm ağacı basar. Başka bir yerden başlamak için yol verin.",
    grep: "Sanal dosya sistemindeki tüm dosyalarda büyük/küçük harf duyarsız arama yapar.",
    theme:
      "Tüm temaları önizlemek için 'theme', uygulamak için 'theme <ad>', sürpriz için 'theme random'. Seçim bu tarayıcıda hatırlanır.",
    lang: "Kabuk dilini İngilizce ve Türkçe arasında değiştirir. Proje açıklamaları özgün dilinde kalır.",
    open: "Komut hedefi (github, linkedin, medium, x, site, proje adı) veya tam URL alır.",
    history: "Kayıtlı komut geçmişini silmek için 'history clear' çalıştırın.",
    projects:
      "Kategorilere ayrılmış küçük yan projeleri de görmek için --all ekleyin.",
  },

  errors: {
    notFound: (cmd) => `komut bulunamadı: ${cmd}`,
    didYouMean: (cmd) => `bunu mu demek istediniz: '${cmd}'?`,
    noSuchFile: (path) => `böyle bir dosya veya dizin yok: ${path}`,
    notADirectory: (path) => `bir dizin değil: ${path}`,
    isADirectory: (path) => `bu bir dizin: ${path}`,
    missingArg: (usage) => `eksik argüman — kullanım: ${usage}`,
    unknownTheme: (name) => `bilinmeyen tema: ${name}`,
    unknownLang: (name) => `bilinmeyen dil: ${name} ('en' veya 'tr' kullanın)`,
    unknownProject: (name) => `bilinmeyen proje: ${name}`,
    nothingToOpen: "açılacak bir şey yok",
    noManual: (cmd) => `${cmd} için kılavuz sayfası yok`,
  },

  msgs: {
    themeSet: (label) => `tema değiştirildi: ${label}`,
    themePreview: "Uygulamak için bir temaya tıklayın.",
    langSet: "Dil Türkçe olarak ayarlandı.",
    crtOn: "CRT efekti açıldı.",
    crtOff: "CRT efekti kapatıldı.",
    historyEmpty: "geçmiş boş",
    historyCleared: "geçmiş temizlendi",
    opening: (target) => `${target} açılıyor ...`,
    leaving: "terminalden çıkılıyor ...",
    helpIntro:
      "mehmet.tech'teki tüm içeriğe buradan ulaşabilirsiniz. Vurgulanan kelimelere tıklayarak çalıştırabilirsiniz.",
    helpFooter:
      "Tab tamamlar, yön tuşları geçmişte gezinir, Ctrl+L temizler, Ctrl+C iptal eder.",
    grepUsage: "kullanım: grep <desen>",
    contactCta:
      "Altyapı, platform işleri veya işe alım konularında konuşmaktan memnuniyet duyarım.",
    projectsHint:
      "'cat projects/featured/<ad>.md' çalıştırın veya bir isme tıklayın.",
  },

  fun: {
    sudo: "İyi denemeydi. Bu olay nöbetçi SRE'ye bildirildi.",
    rmrf: [
      "rm: '/' üzerinde özyinelemeli işlem tehlikelidir",
      "rm: gayet iyi çalışan bir portfolyoyu silmeyi reddediyorum",
      "(zaten yedekler başka bir bölgede)",
    ],
    vim: "Vim açıldı. Çıkmak için bu sekmeyi kapatın ve hayat tercihlerinizi gözden geçirin. Ya da Enter'a basın.",
    coffee:
      "Demleniyor ... hata 418: Ben bir demliğim. Kubernetes kafein zamanlayamaz.",
    matrix: "Uyan Neo ... durdurmak için bir tuşa bas.",
    fortunes: [
      "Benim makinemde çalışıyor — container aynı fikirde değil.",
      "Bulut diye bir şey yok, sadece başkasının Kubernetes kümesi var.",
      "En iyi olay, önce izleme sisteminin yakaladığı olaydır.",
      "Bir kez otomatikleştir, iki kez dokümante et.",
      "Her manuel adım gelecekteki bir kesintidir.",
      "YAML: boşluğa duyarlı karakter gelişimi.",
      "Gözlemlenebilir değilse, production'da değildir.",
      "Geri alma bir özelliktir, yenilgi itirafı değil.",
    ],
  },
};


export const dictionaries: Record<Lang, Dict> = { en, tr };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}
