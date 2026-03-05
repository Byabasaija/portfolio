import { Config } from "@/types/config";
import { MdOutlineDevices, MdAttachment } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks, PiMediumLogoBold } from "react-icons/pi";
import { GoalIcon } from "@primer/octicons-react";
import {
  LuGithub,
  LuPencil,
  LuLinkedin,
  LuRss,
  LuMail,
  LuMapPin,
  LuBookOpen,
  LuLaptop
} from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaReact, FaAws } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import {
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandMysql,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
  TbPhotoSquareRounded,
  TbSql,
  
} from "react-icons/tb";

const config: Config = {
  avatar: "/images/profile.jpeg",
  title: "Pascal Byabasaija - Backend & Distributed Systems Engineer",
  description:
    "Backend Engineer specializing in distributed systems and financial infrastructure. 5+ years building scalable APIs, payment integrations, and cloud-native platforms.",
  author: "Pascal Byabasaija",
  keywords: [
    "Pascal Byabasaija",
    "Python",
    "FastAPI",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: "A ship in harbor is safe, but thats not what ships are built for ⛵️",
  siteURL: "https://byabasaija.com",
  openGraph: {
    url: "https://byabasaija.com",
    type: "website",
    siteName: "Pascal Byabasaija - Software Engineer",
    title: "Pascal Byabasaija - Software Engineer",
    description:
      "I'm Pascal Byabasaija, a Software Engineer with 4+ years of success in Agile Development, Full-Stack Engineering, and Software Architecture.",
    images: [
      {
        url: "https://unsplash.com/photos/black-remote-control-on-red-table-6sAl6aQ4OWI",
        width: 1200,
        height: 630,
        alt: "Pascal Byabasaija - Cover Image",
      },
    ],
  },
  navigationLinks: [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/post", label: "Posts" },
    // { path: "/gallery", label: "Gallery" },
  ],
  contacts: [
    {
      icon: LuMapPin,
      title: "Location",
      content: "Kampala, Uganda 🇺🇬",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:basaijapascal9@gmail.com",
      content: "basaijapascal9@gmail.com",
    },
    {
      icon: LuGithub,
      title: "GitHub",
      link: "https://github.com/Byabasaija",
      content: "@Byabasaija",
    },
    {
      icon: LuLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/pascal-byabasaija/",
      content: "Pascal Byabasaija",
    },
  ],
  socialLinks: [
    {
      url: "https://github.com/Byabasaija",
      icon: LuGithub,
      name: "GitHub",
    },
    {
      url: "https://www.linkedin.com/in/pascal-byabasaija/",
      icon: LuLinkedin,
      name: "LinkedIn",
    },
    {
      url: "https://medium.com/@pascalbyabasaija",
      icon: PiMediumLogoBold,
      name: "Medium",
    },
   
    {
      url: `/rss.xml`,
      icon: LuRss,
      name: "RSS Feed",
    },
    {
      url: `/cv`,
      icon: MdAttachment,
      name: "CV",
    },
  ],
  homeMetaData: {
    metadataBase: new URL("https://www.byabasaija.com"),
    title: "Pascal Byabasaija - Software Engineer",
    description:
      "I'm Pascal Byabasaija, a Software Engineer with 4+ years of success in Agile Development, Full-Stack Engineering, and Software Architecture.",
    authors: [{ name: "Pascal Byabasaija" }],
    creator: "Pascal Byabasaija",
    keywords: [
      "Pascal Byabasaija",
      "byabasaija",
      "Software Engineering",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://pascalbyabasaija.vercel.app",
      type: "website",
      siteName: "Pascal Byabasaija - Software Engineer",
      title: "Pascal Byabasaija - Software Engineer",
      description:
        "I'm Pascal Byabasaija, a Software Engineer with 4+ years of success in Agile Development, Full-Stack Engineering, and Software Architecture.",
      images: [
        {
          url: "https://unsplash.com/photos/black-remote-control-on-red-table-6sAl6aQ4OWI",
          width: 1200,
          height: 630,
          alt: "Pascal Byabasaija - Byabasaija Cover Image",
        },
      ],
    },
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "Pascal Byabasaija - Software Engineer",
      description:
        "I'm Pascal Byabasaija, a Software Engineer with 4+ years of success in Agile Development, Full-Stack Engineering, and Software Architecture.",
    
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/logo.jpg",
          sizes: "192x192",
          type: "image/jpg",
        },
      ],
    },
  },
  about: {
    firstName: "Pascal",
    lastName: "Byabasaija",
    middleName: "",
    preferredName: "",
    additionalName: "",
    pronouns: "He/Him",
    githubUsername: "Byabasaija",
    introduction: `
Backend Engineer specializing in **distributed systems and financial infrastructure**. 5+ years
building scalable APIs, payment integrations, and cloud-native platforms. Currently building
mobile banking infrastructure supporting **30+ SACCOs and 75k+ monthly transactions** via
telecom integrations with MTN Uganda and Airtel Uganda.

Creator of **ChatAPI** and **ChaosCTL**, open-source developer tools demonstrating expertise
in real-time messaging and chaos engineering. 🚀

**Self-motivated, open-source creator, loves building things that scale 👨🏻‍💻**
    `,
    lifestyles: [
      
        {
          icon: LuBookOpen,
          title: "Studying",
          text: "Continuously learning programming concepts and exploring books on entrepreneurship, personal development, and innovative technologies.",
        },
        {
          icon: LuPencil,
          title: "Technical writing",
          text: "Passionate about sharing knowledge and experiences through technical writing.",
        },
        {
          icon: LuLaptop,
          title: "Open Source",
          text: "Active contributor to open source projects, focusing on web development tools and utilities that improve developer experience.",
        },
        {
          icon: GoalIcon,
          title: "Athletics",
          text: "Dedicated marathon runner who finds meditation and peak performance through long-distance running.",
        },
        
    ],
    techStacks: {
      programmingLanguages: [
        { name: "Python", icon: AiOutlinePython },
        { name: "TypeScript", icon: TbBrandTypescript },
        { name: "JavaScript", icon: RiJavascriptLine },
        { name: "Go", icon: TbBrandGolang },
        { name: "SQL", icon: TbSql },
      ],
      frameworks: [
        { name: "FastAPI", icon: SiFastapi },
        { name: "Django", icon: TbBrandDjango },
        { name: "Flask", icon: BiLogoFlask },
        { name: "AWS", icon: FaAws },
        { name: "Docker", icon: TbBrandDocker },
        { name: "Linux Terminal", icon: VscTerminalLinux },
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Postman", icon: SiPostman },
      ],
    },
  },
  resume: {
    educations: {
      icon: IoSchoolOutline,
      title: "Education",
      items: [
        {
          company: "Ndejje University",
          location: "Kampala, Uganda",
          role: "Bachelor of Information Technology",
          duration: "2020 — 2023",
          tasksMarkdown: `
- **Weekend program** while working full-time as a software developer.
- **Coursework included:** C++ and PHP, Database and System Administration,
  Operating Systems, Project Management, Communication Skills, Research Methods.
          `,
        },
        {
          company: "Microverse Inc",
          location: "Remote, San Francisco, CA",
          role: "Full-Stack Software Development Program",
          duration: "2020",
          tasksMarkdown: `
- **Dedicated over 1,500 hours** to mastering full-stack web development remotely,
  collaborating with a global community of software developers.
- **Peer-to-peer code reviews** with over 50 different students, improving code
  quality and collaborative learning.
- **Developed 5+ production-ready applications** applying real-world engineering practices.
          `,
        },
        {
          company: "edX / Harvard",
          location: "Remote",
          role: "CS50's Introduction to Computer Science",
          duration: "2022",
          tasksMarkdown: `
- Completed Harvard's renowned CS course covering algorithms, data structures,
  web development, and software engineering principles.
          `,
        },
      ],
    },
    awardLeaderships: {
      icon: PiTrophy,
      title: "Certifications & Achievements",
      items: [
        {
          company: "DMARK Mobile Company",
          location: "Kampala, Uganda",
          role: "Head Hunted — Senior Engineering Role",
          duration: "2025",
          tasksMarkdown: `
- **Head hunted** to join one of the leading fintech companies in Uganda,
  validating expertise in backend systems and financial infrastructure.
          `,
        },
        {
          company: "Dissimilar Media",
          location: "Remote",
          role: "73.6% Startup Growth",
          duration: "2024",
          tasksMarkdown: `
- Drove **73.6% startup growth** through strategic platform development,
  PayPal integration, and performance optimization of Monetize 54.
          `,
        },
        {
          company: "Mara Scientific",
          location: "Kampala, Uganda",
          role: "Promoted to Project Lead",
          duration: "2023",
          tasksMarkdown: `
- **Early leadership recognition** — promoted to Project Lead after 2 years as developer,
  managing a cross-functional team of 6 engineers on Mpeke HMIS.
          `,
        },
      ],
    },
    professionalExperiences: {
      icon: MdOutlineDevices,
      title: "Professional Experience",
      items: [
        {
          company: "DMARK Mobile Company",
          location: "Onsite, Kampala, Uganda",
          role: "Software Engineer",
          duration: "August 2025 – Present",
          tasksMarkdown: `
- Architected and operated a **fault-tolerant mobile banking transaction system** integrating
  with MTN Uganda and Airtel Uganda, supporting **30+ SACCOs and 75,000+ monthly transactions**.
- Engineered a **high-throughput bulk payment processing system** enabling automated mobile
  money payouts, processing **15,000+ monthly transactions** with fault-tolerant retry mechanisms.
- Developed internal **observability infrastructure** to monitor API traffic, server resources,
  and SMS gateway health, improving system reliability and operational visibility.
          `,
        },
        {
          company: "Dissimilar Media",
          location: "Remote, Nairobi, Kenya",
          role: "Full-Stack Software Engineer",
          duration: "May 2024 – Present",
          tasksMarkdown: `
- Drove **73.6% startup growth** by architecting Monetize 54, an African-focused digital
  services marketplace serving 500+ users.
- Integrated **PayPal payment gateway** with fraud detection, achieving 20% increase in
  successful transactions and 99.8% uptime.
- Built **real-time messaging and notifications** system using WebSockets, supporting
  200+ concurrent connections (inspiration for ChatAPI open-source project).
- Implemented **intelligent recommendation engine** and full-text search via Typesense,
  increasing platform engagement by 25%.
- Optimized cloud infrastructure by **30%** through Docker containerization and strategic cloud migration.
          `,
        },
        {
          company: "Mara Scientific",
          location: "Onsite, Kampala, Uganda",
          role: "Project Lead & Full-Stack Developer",
          duration: "June 2021 – May 2024",
          tasksMarkdown: `
- **Promoted to Project Lead** for Mpeke HMIS after 2+ years as developer,
  leading a team of 6 developers.
- Accelerated feature delivery by **38%** and reduced production bugs by **30%**
  through Agile implementation and code quality standards.
- Developed **10+ healthcare modules** using Flask, including patient management
  and inventory systems.
- Architected **hybrid cloud/offline solution** for remote clinics, improving
  system accessibility by 40%.
- Mentored 3 junior developers and established **CI/CD pipeline** reducing
  deployment time from 2 hours to 15 minutes.
          `,
        },
      ],
    },
  },
  jsonLdPerson: {
    "@context": "http://schema.org",
    "@type": "Person",
    "@id": "https://byabasaija.com/#person",
    givenName: "Pascal",
    familyName: "Byabasaija",
    additionalName: "",
    gender: "male",
    birthPlace: "Kampala, Uganda",
    nationality: "Ugandan",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "National Central University",
        sameAs: "https://www.ncu.edu.tw/",
      },
    ],
    jobTitle: "Backend & Distributed Systems Engineer",
    skills: "Backend Engineering, Distributed Systems, Payment Integrations, Go, Python, TypeScript, FastAPI, Django, Docker, AWS",
    image: "https://byabasaija.com/images/profile.jpeg",
    url: "https://byabasaija.com/",
    sameAs: [
      "https://www.linkedin.com/in/pascal-byabasaija/",
      "http://github.com/Byabasaija",
    ],
  },
  giscusConfig: {
    id: "comments",
    repo: "Byabasaija/vcard_portfolio",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
    category: "General",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CONFIG_CATEGORY_ID || "",
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  googleAnalyticId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

export default config;
