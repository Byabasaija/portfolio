/**
 * Build the search index for the RAG webhook.
 * Run with: npx tsx scripts/build-search-index.ts
 * Output:   src/data/search-index.json
 */

import fs from "fs/promises";
import path from "path";

interface Chunk {
  id: string;
  text: string;
  source: "post" | "portfolio" | "resume";
  title: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const match = /^---\s*([\s\S]*?)\s*---/.exec(content);
  if (!match) return { meta: {}, body: content };

  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const kv = /^(\w+):\s*"?([^"]*)"?$/.exec(line.trim());
    if (kv) meta[kv[1]] = kv[2].trim();
  });

  return { meta, body: content.slice(match[0].length).trim() };
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]*`/g, "")        // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/#{1,6}\s/g, "")       // headings
    .replace(/[*_~>]/g, "")         // emphasis, blockquotes
    .replace(/<[^>]+>/g, "")        // html tags
    .replace(/\n{3,}/g, "\n\n")     // excess newlines
    .trim();
}

function chunkText(text: string, chunkSize = 400, overlap = 80): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim()) chunks.push(chunk.trim());
    if (i + chunkSize >= words.length) break;
  }

  return chunks;
}

// ─── Content extractors ─────────────────────────────────────────────────────

async function extractPosts(dir: string): Promise<Chunk[]> {
  const files = await fs.readdir(dir);
  const chunks: Chunk[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const title = meta.title || file;
    const clean = stripMarkdown(body);
    const textChunks = chunkText(`${title}. ${meta.summary ?? ""}. ${clean}`);

    textChunks.forEach((text, i) => {
      chunks.push({ id: `post-${file}-${i}`, text, source: "post", title });
    });
  }

  return chunks;
}

async function extractPortfolios(dir: string): Promise<Chunk[]> {
  const files = await fs.readdir(dir);
  const chunks: Chunk[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const title = meta.title || file;
    const clean = stripMarkdown(body);
    const textChunks = chunkText(`${title}. ${meta.summary ?? ""}. ${clean}`);

    textChunks.forEach((text, i) => {
      chunks.push({ id: `portfolio-${file}-${i}`, text, source: "portfolio", title });
    });
  }

  return chunks;
}

function extractResume(): Chunk[] {
  // Hardcoded from config — update when resume changes
  const chunks: Chunk[] = [
    {
      id: "resume-summary",
      source: "resume",
      title: "About Pascal",
      text: "Pascal Byabasaija is a Backend Engineer specializing in distributed systems and financial infrastructure with 5+ years of experience building scalable APIs, payment integrations, and cloud-native platforms. Currently building mobile banking infrastructure supporting 30+ SACCOs and 75,000+ monthly transactions via MTN Uganda and Airtel Uganda integrations. Creator of ChatAPI and ChaosCTL, open-source developer tools. Prioritizes reliability, scalability, and maintainability.",
    },
    {
      id: "resume-experience-dmark",
      source: "resume",
      title: "DMARK Mobile Company — Software Engineer",
      text: "Software Engineer at DMARK Mobile Company in Kampala, Uganda (August 2025 – Present). Architected a fault-tolerant mobile banking transaction system integrating with MTN Uganda and Airtel Uganda, supporting 30+ SACCOs and 75,000+ monthly transactions. Engineered a high-throughput bulk payment processing system processing 15,000+ monthly transactions with fault-tolerant retry mechanisms. Developed internal observability infrastructure to monitor API traffic, server resources, and SMS gateway health.",
    },
    {
      id: "resume-experience-dissimilar",
      source: "resume",
      title: "Dissimilar Media — Full-Stack Software Engineer",
      text: "Full-Stack Software Engineer at Dissimilar Media, Remote Nairobi Kenya (May 2024 – Present). Drove 73.6% startup growth by architecting Monetize 54, an African-focused digital services marketplace serving 500+ users. Integrated PayPal payment gateway with fraud detection achieving 20% increase in successful transactions and 99.8% uptime. Built real-time messaging and notifications system using WebSockets supporting 200+ concurrent connections. Implemented intelligent recommendation engine and full-text search via Typesense increasing platform engagement by 25%. Optimized cloud infrastructure by 30% through Docker containerization.",
    },
    {
      id: "resume-experience-mara",
      source: "resume",
      title: "Mara Scientific — Project Lead & Full-Stack Developer",
      text: "Project Lead and Full-Stack Developer at Mara Scientific in Kampala, Uganda (June 2021 – May 2024). Promoted to Project Lead for Mpeke HMIS after 2+ years as developer, leading a team of 6 developers. Accelerated feature delivery by 38% and reduced production bugs by 30% through Agile implementation. Developed 10+ healthcare modules using Flask including patient management and inventory systems. Architected hybrid cloud/offline solution for remote clinics. Mentored 3 junior developers and established CI/CD pipeline reducing deployment time from 2 hours to 15 minutes.",
    },
    {
      id: "resume-education",
      source: "resume",
      title: "Education & Certifications",
      text: "Bachelor of Information Technology from Ndejje University, Kampala Uganda (2020-2023), weekend program while working full-time. Full-Stack Software Development Program at Microverse Inc, Remote San Francisco (2020), dedicated over 1500 hours. CS50's Introduction to Computer Science from Harvard/edX (2022). Head hunted to DMARK Mobile Company in 2025 validating expertise in backend systems. Drove 73.6% startup growth at Dissimilar Media in 2024. Promoted to Project Lead at Mara Scientific in 2023.",
    },
    {
      id: "resume-skills",
      source: "resume",
      title: "Tech Stack & Skills",
      text: "Programming languages: Python, TypeScript, JavaScript, Go, SQL. Frameworks: FastAPI, Django, Flask, Next.js. Cloud & DevOps: AWS, Docker, Traefik, GCP, Nginx, Cloudflare, Linux. Databases: PostgreSQL, PostGIS. Tools: Postman. Open source projects: ChatAPI (self-hosted chat infrastructure for AI-powered apps), ChaosCTL (chaos engineering CLI). Skills include distributed systems, payment integrations, real-time messaging, WebSockets, REST APIs, mobile banking, fintech.",
    },
    {
      id: "resume-contact",
      source: "resume",
      title: "Contact & Links",
      text: "Email: basaijapascal9@gmail.com. GitHub: github.com/Byabasaija. LinkedIn: linkedin.com/in/pascal-byabasaija. Location: Kampala, Uganda (UTC +03:00). Portfolio: byabasaija.com.",
    },
  ];

  return chunks;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const root = path.join(process.cwd());
  const postsDir = path.join(root, "src/contents/posts");
  const portfoliosDir = path.join(root, "src/contents/portfolios");
  const outputPath = path.join(root, "src/data/search-index.json");

  console.log("Extracting posts...");
  const postChunks = await extractPosts(postsDir);
  console.log(`  ${postChunks.length} chunks from ${(await fs.readdir(postsDir)).length} posts`);

  console.log("Extracting portfolios...");
  const portfolioChunks = await extractPortfolios(portfoliosDir);
  console.log(`  ${portfolioChunks.length} chunks from ${(await fs.readdir(portfoliosDir)).length} projects`);

  console.log("Extracting resume...");
  const resumeChunks = extractResume();
  console.log(`  ${resumeChunks.length} chunks`);

  const all = [...resumeChunks, ...postChunks, ...portfolioChunks];
  console.log(`\nTotal: ${all.length} chunks`);

  await fs.writeFile(outputPath, JSON.stringify(all, null, 2));
  console.log(`Written to ${outputPath}`);
}

main().catch(console.error);
