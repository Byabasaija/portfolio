'use client'

import config from '@/config';
import { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { LuMapPin } from 'react-icons/lu';
import Globe from './globe';
import { BlurFade } from '../magicui/blur-fade';
import CodeHeader from '../section/about/code-header';
import Hello from '../hello';

const { about } = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
} = about;

export default function GitHubProfile() {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (projectName) => {
    if (expandedProject === projectName) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
    }
  };

  const calendarRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (calendarRef.current) {
    const container = calendarRef.current;
    container.scrollLeft = container.clientWidth * 2;
  }
}, []);

  return (
    <div className="max-w-full text-gray-100 ">
      <h1 className="text-3xl font-bold mb-2">Hello, I'm Pascal Byabasaija 👋</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
        Full-Stack Software Engineer passionate about building elegant solutions to complex problems.
        <br />
        <strong>Currently seeking new opportunities in software development.</strong>
      </blockquote>

      {/* <Hello /> */}

      <div className="flex mb-6">
        <img src="https://img.shields.io/badge/OPEN_TO_WORK-brightgreen?style=for-the-badge" alt="Open To Work" />
      </div>
      <section id="coding-stats mb-6">
            <BlurFade inView delay={0.4} direction="down">
                <CodeHeader id="coding-stats" text="$ Coding Stats" />
            </BlurFade>
            

            <BlurFade inView delay={0.4} direction="left">
                    <ul className="mt-[30px] grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 lg:gap-y-[20px] lg:gap-x-[25px]">
                        <li className="relative rounded-2xl shadow-shadow-2 coding-item bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl">
                        <div className="shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-2 overflow-hidden rounded-xl p-2">
                        <img 
                                    src="https://github-readme-stats.vercel.app/api?username=Byabasaija&show_icons=true&theme=tokyonight&count_private=true&hide_border=true&hide=contribs" 
                                    alt="GitHub Stats" 
                                    className="h-auto" 
                                    />
                        </div>
                        </li>
            
                        <li className="relative rounded-2xl shadow-shadow-2 coding-item bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl h-[200px] md:h-auto">
                        <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[380px]">
                            <div className="flex items-center gap-2 text-white-2 mt-4 ml-4">
                            <LuMapPin size={18} />
                            <h2 className="text-sm font-light">
                                Kampala, Uganda (UTC +03:00)
                            </h2>
                            </div>
                            <Globe />
                        </div>
                        </li>
                    </ul>
                    </BlurFade>

               <BlurFade inView delay={0.4} direction="up">
                <section id="github-calendar" className="text-light-gray mt-5 overflow-x-auto scroll-smooth" ref={calendarRef}>
                  <GitHubCalendar
                    username={githubUsername}
                    blockSize={10}
                    blockMargin={4}
                    colorScheme="dark"
                    blockRadius={2}
                    fontSize={14}
                    style={{ fontWeight: "bold", minWidth: '600px' }}
                  />
                </section>
              </BlurFade>

        
        </section>

      <section className="mb-6 mt-6">
        <h2 className="text-2xl font-bold mb-3">🚀 About Me</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>🔭 I'm a Full-Stack Software Engineer focused on building intuitive, efficient applications</li>
          <li>💡 I love building tools that make life easier for users and businesses</li>
          <li>🌱 Currently expanding my expertise in cloud architecture and AI integration</li>
          <li>💼 Open to full-time roles and freelance projects</li>
          <li>🌍 Open to remote both remote and onsite opportunities worldwide</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">🔍 I'm Currently Looking For</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full-time software development roles</li>
          <li>Opportunities to work with Python/TypeScript/React tech stacks</li>
          <li>Collaborative teams passionate about building great products</li>
          <li>Remote and onsite(open to relocation) positions</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">💻 Tech Stack</h2>
        
        <h3 className="text-xl font-semibold mb-2">Backend</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
          <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
          <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
          <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
          <img src="https://img.shields.io/badge/Pydantic-5B4ADF?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Frontend</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
          <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
          <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
          <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
          <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="shadcn/ui" />
        </div>

        <h3 className="text-xl font-semibold mb-2">Databases</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
          <img src="https://img.shields.io/badge/PostGIS-008000?style=for-the-badge&logo=postgis&logoColor=white" alt="PostGIS" />
          <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
          <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
          <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
        </div>

        <h3 className="text-xl font-semibold mb-2">DevOps & Cloud</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
          <img src="https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white" alt="Traefik" />
          <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
          <img src="https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="GCP" />
          <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
          <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
          <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
        </div>

        <h3 className="text-xl font-semibold mb-2">AI & Machine Learning</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas" />
          <img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" />
          <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-learn" />
          <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
         
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">🛠️ Open Source Projects</h2>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            className="w-full text-left px-4 py-3 font-bold bg-onyx focus:outline-none flex justify-between items-center"
            onClick={() => toggleProject('ChatAPI')}
          >
            <span>ChatAPI - (Author)</span>
            <span>{expandedProject === 'ChatAPI' ? '−' : '+'}</span>
          </button>
          
          {expandedProject === 'ChatAPI' && (
            <div className="p-4 ">
              <p className="mb-2"><strong>Description:</strong> An open source pluggable api for messaging/chat and notifications.</p>
              <p className="mb-2"><strong>Tech Stack:</strong> Python, FastAPI, Celery, RabbitMQ, PostgreSQL, Docker</p>
              <p><strong>Links:</strong> <a href="https://github.com/Byabasaija/chatapi" className="text-blue-600 hover:underline">Repository</a></p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">📫 Connect With Me</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://www.linkedin.com/in/pascal-byabasaija/">
            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
          </a>
          <a href="mailto:basaijapascal9@gmail.com">
            <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
          </a>
          {/* <a href="https://pascalbyabasaija.vercel.app">
            <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Portfolio" />
          </a>
          <a href="https://pascalbyabasaija.vercel.app/resume">
            <img src="https://img.shields.io/badge/Resume-4285F4?style=for-the-badge&logo=google-drive&logoColor=white" alt="Resume" />
          </a> */}
        </div>
      </section>

      <hr className="border-t border-gray-300 my-6" />
      
      <div className="text-center text-gray-300 italic">
        Thanks for visiting my profile! Don't hesitate to reach out if you think we could work together.
        {/* <br />
        <blockquote className="block mt-2 text-sm text-gray-400">"You don't learn to swim by reading about water"</blockquote> */}
      </div>
    </div>
  );
}