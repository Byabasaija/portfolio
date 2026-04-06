'use client'

import config from '@/config';
import { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { BlurFade } from '../magicui/blur-fade';
import CodeHeader from '../section/about/code-header';

const { about } = config;
const { githubUsername } = about;

export default function GitHubProfile() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleProject = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollLeft = calendarRef.current.clientWidth * 2;
    }
  }, []);

  return (
    <div className="max-w-full text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Hello, I'm Pascal Byabasaija 👋</h1>

      <p className="text-light-gray mb-8">
        Software Engineer who prioritizes —{" "}
        <span className="text-orange-yellow-crayola font-medium">reliability</span>,{" "}
        <span className="text-orange-yellow-crayola font-medium">scalability</span>,{" "}
        and{" "}
        <span className="text-orange-yellow-crayola font-medium">maintainability</span>.
      </p>

      {/* GitHub Activity */}
      <section className="mb-8">
        <BlurFade inView delay={0.4} direction="down">
          <CodeHeader id="github-activity" text="$ GitHub Activity" />
        </BlurFade>

        <BlurFade inView delay={0.4} direction="up">
          <div className="mt-6">

            {/* Calendar card */}
            <div className="rounded-2xl bg-gradient-onyx p-5 flex flex-col justify-center min-w-0">
              <p className="text-xs text-light-gray-70 mb-4 uppercase tracking-widest">Contribution Activity</p>
              <div
                ref={calendarRef}
                className="overflow-x-auto scroll-smooth"
              >
                <GitHubCalendar
                  username={githubUsername}
                  blockSize={10}
                  blockMargin={4}
                  colorScheme="dark"
                  blockRadius={2}
                  fontSize={13}
                  style={{ fontWeight: "bold", minWidth: '560px' }}
                />
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* About */}
      <section className="mb-8">
        <BlurFade inView delay={0.4} direction="down">
          <CodeHeader id="about-me" text="$ About Me" />
        </BlurFade>
        <ul className="list-disc pl-6 space-y-2 text-light-gray mt-4">
          <li>I build backend systems designed to survive — not just launch</li>
          <li>Drawn to problems involving distributed state, event-driven architecture, and financial data</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="mb-8">
        <BlurFade inView delay={0.4} direction="down">
          <CodeHeader id="tech-stack" text="$ Tech Stack" />
        </BlurFade>

        <h3 className="text-sm uppercase tracking-widest text-light-gray-70 mb-2 mt-4">Backend</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
          <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
          <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
          <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
          <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
          <img src="https://img.shields.io/badge/Gin-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Gin" />
        </div>

        <h3 className="text-sm uppercase tracking-widest text-light-gray-70 mb-2">Databases</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
          <img src="https://img.shields.io/badge/PostGIS-008000?style=for-the-badge&logo=postgis&logoColor=white" alt="PostGIS" />
        </div>

        <h3 className="text-sm uppercase tracking-widest text-light-gray-70 mb-2">DevOps & Cloud</h3>
        <div className="flex flex-wrap gap-2">
          <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
          <img src="https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white" alt="Traefik" />
          <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
          <img src="https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="GCP" />
          <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
          <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
          <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
        </div>
      </section>

      {/* Open Source */}
      <section className="mb-8">
        <BlurFade inView delay={0.4} direction="down">
          <CodeHeader id="open-source" text="$ Open Source" />
        </BlurFade>

        <div className="space-y-3 mt-4">
          {[
            {
              name: 'ChatAPI',
              starsUrl: 'https://img.shields.io/github/stars/hastenr/chatapi?style=social',
              description: 'Self-hosted chat infrastructure for AI-powered apps — think self-hosted Stream Chat, built for human-AI conversations.',
              stack: 'Single binary, SQLite, JWT auth',
              repo: 'https://github.com/hastenr/chatapi',
            },
          ].map((project) => (
            <div key={project.name} className="rounded-2xl bg-gradient-onyx overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center gap-3"
                onClick={() => toggleProject(project.name)}
              >
                <span className="flex items-center gap-3 font-semibold">
                  {project.name}
                  <img src={project.starsUrl} alt={`${project.name} stars`} className="inline-block" />
                </span>
                <span className="text-light-gray-70 text-lg leading-none">
                  {expandedProject === project.name ? '−' : '+'}
                </span>
              </button>

              {expandedProject === project.name && (
                <div className="px-5 pb-4 text-light-gray text-sm space-y-1 border-t border-white/5 pt-3">
                  <p>{project.description}</p>
                  <p className="text-light-gray-70">{project.stack}</p>
                  <a href={project.repo} className="text-orange-yellow-crayola hover:underline inline-block pt-1" target="_blank" rel="noopener noreferrer">
                    View Repository →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="mb-6">
        <BlurFade inView delay={0.4} direction="down">
          <CodeHeader id="connect" text="$ Connect" />
        </BlurFade>
        <div className="flex flex-wrap gap-3 mt-4">
          <a href="https://www.linkedin.com/in/pascal-byabasaija/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
          </a>
          <a href="mailto:basaijapascal9@gmail.com">
            <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
          </a>
        </div>
      </section>
    </div>
  );
}
