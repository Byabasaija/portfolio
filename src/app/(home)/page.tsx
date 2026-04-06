import PageHeader from "@/components/page-header";
import AnimatedSection from "@/components/animated-section";
import config from "@/config";
import GitHubProfile from "@/components/about/github_profile";

const { about } = config;
const { firstName, preferredName } = about;

async function About() {
  const header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName}👨🏻‍💻`;

  return (
    <article>
      <AnimatedSection id="about">
        <PageHeader header={header} />
      </AnimatedSection>
      <GitHubProfile />
    </article>
  );
}

export default About;
