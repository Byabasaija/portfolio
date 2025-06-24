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
  LuLaptop,
  LuBookOpen,
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
  avatar: "/images/profile.webp",
  title: "Pascal Byabasaija - Software Engineer",
  description:
    "Experienced Software Engineer with over 4 years of building scalable web applications across different domains.",
  author: "Pascal Byabasaija - Personal Website",
  keywords: [
    "Pascal Byabasaija",
    "Byabasaija",
    "Software Engineering",
    "Software Engineer",
    "Software Development",
    "Web Development",
    "Open Source",
    "Open Source Contributor",
    "Open Source Enthusiast",
    "FastAPI",
    "Flask",
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
  ],
  status: "A ship in harbor is safe, but thats not what ships are built for ⛵️",
  siteURL: "https://byabasaija.com",
  openGraph: {
    url: "https://byabasaija.com",
    type: "website",
    siteName: "Pascal Byabasaija - Software Engineer",
    title: "Pascal Byabasaija - Software Engineer",
    description:
      "Experienced Software Engineer with over 4 years of building scalable web applications across different domains.",
    images: [
      {
        url: "https://unsplash.com/photos/black-remote-control-on-red-table-6sAl6aQ4OWI",
        width: 1200,
        height: 630,
        alt: "Pascal Byabasaija - Byabasaija Cover Image",
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
      url: "https://medium.com/@Byabasaija",
      icon: PiMediumLogoBold,
      name: "Medium",
    },
   
    {
      url: `/cv`,
      icon: MdAttachment,
      name: "CV",
    },
  ],
  homeMetaData: {
    metadataBase: new URL("https://byabasaija.com"),
    title: "Pascal Byabasaija - Software Engineer",
    description:
      "Experienced Software Engineer with over 4 years of building scalable web applications across different domains.",
    authors: [{ name: "Pascal Byabasaija" }],
    creator: "Pascal Byabasaija",
    keywords: [
      "Pascal Byabasaija",
      "Byabasaija",
      "Software Engineering",
      "Software Engineer",
      "Software Development",
      "Web Development",
      "Open Source",
      "Open Source Contributor",
      "Open Source Enthusiast",
      "FastAPI",
      "Flask",
      "Python",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://byabasaija.com",
      type: "website",
      siteName: "Pascal Byabasaija - Software Engineer",
      title: "Pascal Byabasaija - Software Engineer",
      description:
        "Experienced Software Engineer with over 4 years of building scalable web applications across different domains.",
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
        "Experienced Software Engineer with over 4 years of building scalable web applications across different domains.",
      images: "https://unsplash.com/photos/black-remote-control-on-red-table-6sAl6aQ4OWI",
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
  **Experienced Full-Stack Developer with over 4 years of building scalable web applications across
different domains. Adept in React, Next.js, FastAPI, Flask, MongoDB, Docker, and CI/CD
pipelines. Proven leadership in managing cross-functional teams, optimizing infrastructure, and
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
            title: "Hackathons",
            text: "Regular hackathon participant with expertise in rapid prototyping and collaborative problem-solving.",
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
            duration: "2020 - 2020 ",
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
  - Integrated PayPal payments into Monetize 54, enabling secure and seamless transactions for users and contributing to a 20% increase in successful payment processing within the first quarter.
  - Implemented secure, in-app messaging functionality for Monetize 54, enhancing user communication and leading to a 15% improvement in user engagement metrics.
  - Developed and deployed recommendation algorithms for Monetize 54, resulting in a 10% uplift in cross-selling of services and an improved user experience.
  - Engineered fast full-text search capabilities for Monetize 54 using Typesense, reducing search query times by 60% and improving user satisfaction.
  - Designed and optimized cloud infrastructure on Hetzner using Docker and Traefik, with CI/CD pipelines enabling seamless deployments—resulting in a 30% improvement in platform performance and a 25% reduction in hosting costs.
            `,
          },
          {
            company: "Mara Scientific",
            location: "Kampala, Uganda",
            role: "Project Lead",
            duration: "2023 - 2024",
            tasksMarkdown: `
  - Was promoted to Project Lead after resolving a critical project delay, successfully mediating between client, management, and engineering teams, resulting in a 60% improvement in delivery times.
  - Collaborated with the DevOps team to increase system uptime from 60% to 90% by optimizing infrastructure and scaling systems to handle increased demand and traffic.
  - Introduced the deployment of cloud-based and offline instances of the Mpeke HMIS, delivering tailored solutions for both digitized and non-digitized hospitals. This increased customer satisfaction by 15%.
  - Led a team of 6 engineers to deploy over 10 stalled key features, implementing a new development process that reduced bottlenecks by 30% and improved project efficiency by 25%.
  - Served as the primary liaison between the engineering team and clients, clarifying project goals and timelines, which rebuilt client trust and increased satisfaction by 20%.
  - Worked closely with senior management to align engineering efforts with business objectives, playing a key role in strategic planning for new product features and driving a 25% increase in product adoption rates.
            `,
          },
          {
            company: "Mara Scientific",
            location: "Kampala, Uganda",
            role: "Fullstack Software Engineer",
            duration: "2020 - 2023",
            tasksMarkdown: `
  - Spearheaded the development of intuitive user interfaces for healthcare applications using React, resulting in a 40% improvement in user satisfaction ratings from medical professionals interacting with the systems.
  - Transitioned to Full-Stack Developer by quickly learning Python and Flask, bridging frontend and backend teams and ensuring smooth project progression, reducing feature completion time by 40%.
  - Provided technical support to customers, particularly during system downtimes, ensuring swift issue resolution and minimal service disruption by 20%.
  - Implemented code linting rules across the codebase, improved code quality, reduced code review time by 30%, and decreased post-deployment bugs.
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
