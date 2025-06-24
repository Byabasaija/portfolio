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
  title: "Pascal Byabasaija - Software Engineer",
  description:
    "I'm Pascal Byabasaija, a Software Engineer with 4+ years of success in Agile Development, Full-Stack Engineering, and Software Architecture.",
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
Experienced Software Engineer with over 4 years of building scalable web applications across
different domains. Adept in **React, Next.js, FastAPI, Flask, MongoDB, Docker, and CI/CD
pipelines**. Proven leadership in managing cross-functional teams, optimizing infrastructure, and
delivering user-centric software products. 🚀

**Self-motivated, Team player, Love coding 👨🏻‍💻**
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
        { name: "SQL", icon: TbSql },
        { name: "JavaScript", icon: RiJavascriptLine },
        
      ],
      frameworks: [
        { name: "React", icon: FaReact },
        { name: "FastAPI", icon: SiFastapi },
        { name: "Flask", icon: BiLogoFlask },
        { name: "Linux Terminal", icon: VscTerminalLinux },
        { name: "AWS", icon: FaAws },
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Docker", icon: TbBrandDocker },
        { name: "MySQL", icon: TbBrandMysql },
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
          company: "Microverse Inc",
          location: "San Fransinco, CA",
          role: "Fullstack Software Development",
          duration: "2020 - 2021",
          tasksMarkdown: `
- **Dedicated over 1,500 hours to mastering web development** remotely,
collaborating with a global community of software developers.
- **Actively participated in peer-to-peer code reviews with over 50 different
students** improving code quality by incorporating feedback and
enhancing collaborative learning.
- **Contributed to real-world projects by applying** newly acquired skills to
develop over 5 practical, production-ready applications.

        `,
        },
        {
          company: "Ndejje University",
          location: "Kampala, Uganda",
          role: "Bachelors in Information Technology",
          duration: "2020 — 2023",
          tasksMarkdown: `
- **Coursework included programming in:** C++ and PHP, Database and System
administration, Operating systems, Project management, Communication
skills, Research methods etc.

        `,
        },
      ],
    },
   
    professionalExperiences: {
      icon: MdOutlineDevices,
      title: "Professional Experience",
      items: [
        {
          company: "Dissimilar Media(formerly Backlink Africa)",
          location: "Kampala, Uganda",
          role: "Fullstack Software Engineer",
          duration: "2024 - Present",
          tasksMarkdown: `
- Built and deployed Monetize 54 using Next.js 14, FastAPI, and MongoDB.
- Integrated PayPal, increasing transactions by 20%.
- Engineered in-app messaging and recommendation systems, boosting engagement and
cross-sell metrics.
- Engineered fast full-text search capabilities for Monetize 54 using Typesense, reducing search query times by 60% and improving user satisfaction.
- Improved cloud performance by 30% through Docker, CI/CD, and Hetzner orchestration.
          `,
        },
        {
          company: "Mara Scientific",
          location: "Kampala, Uganda",
          role: "Fullstack Software Engineer & Project Lead",
          duration: "2021 - 2024",
          tasksMarkdown: `
-  Promoted to lead developer team of 6 on Mpeke HMIS project after stepping up to mediate a misunderstanding between a client, sales and engineering teams about the project deliverables.
- Consequently, speeded up feature delivery by 38% and reduced bugs by 30%.
- Developed full-stack features in healthcare applications with React and Flask.
- Collaborated with DevOps for cloud/offline deployments; improved client satisfaction by
20%.
- Implemented code linting and CI practices, reducing bugs and review times.
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
    jobTitle: "Software Engineer",
    skills: "Software Engineering, Web Development, Open Source",
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
