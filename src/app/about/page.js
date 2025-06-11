"use client";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

export default function About() {
  const { theme, isDark } = useTheme();
  return (
    <div className=" flex flex-col w-full md:flex-row-reverse h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0">
      <div 
        className="flex flex-col font-ropaSans w-4/5 md:w-2/5 lg:w-1/3 font-bold text-md gap-y-4"
        style={{ color: theme.text.primary }}
      >
        <h2 style={{ color: theme.text.muted }}>PRINCE AGYEI TUFFOUR</h2>
        <h2>
          I'm a mathematician, a software engineer, a QA engineer, and potential ML engineer who loves building
          things, learning new things, and solving problems.
        </h2>

        <h2>
          I'm advanced in{" "}
          <span className="italic" style={{ color: theme.text.accent }}>
            Python, JS/TS, PyTorch, TensorFlow, LLM, and React with a lot of experience in full-stack development,
            machine learning and deep learning
          </span>{" "}
          as well as a mastery of turning ideas into code. My most epic skillset lies in the fact that I consistently push the boundaries of coventional thinking to turn my ambitious visions into reality.
        </h2>

        <h2>
          Currently, I'm working as a Software QA Engineer at{" "}
          <span 
            className="hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.accent }}
          >
            <Link href={"https://www.dynaconnections.com/"} target={"_blank"}>
              dynaConnections Corporations
            </Link>
          </span>{" "}
          , a real estate software company providing innovative MLS and transaction management solutions. 
          As a Software QA Engineer, I ensure the quality and reliability of their flagship product, connectMLS™, 
          through comprehensive testing, test automation, and quality assurance processes. 
          I work closely with development teams to maintain high standards of software quality while 
          contributing to the continuous improvement of our testing methodologies and frameworks. I have a tradition of building at
          least one large-scale project every year, this year I'm creating{" "}
          <span>
            <Link
              className="inline-flex items-center hover:underline hover:opacity-70 transform transition-all duration-300 gap-x-1"
              style={{ color: theme.text.accent }}
              href="/search?q=nana-projects&p=gradgptpro"
            >
              GradGPT.pro.
              <div
                className="bg-no-repeat bg-cover w-4 h-4"
                style={{ backgroundImage: `url("icons/link.svg")` }}
              />
            </Link>
          </span>
        </h2>

        <h2>
          I love chasing after unique experiences and jumping off (imaginary)
          cliffs to test my skills.
        </h2>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Link
            href="/search?q=nana-projects"
            className="flex flex-row w-full items-center justify-center rounded-md p-4 transform transition-all duration-300"
            style={{ 
              border: `1px solid ${theme.border.accent}`,
              color: theme.text.secondary
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.border.accent;
              e.currentTarget.style.color = theme.bg.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.text.secondary;
            }}
          >
            discover my projects
          </Link>
          
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row w-full items-center justify-center rounded-md p-4 transform transition-all duration-300"
            style={{ 
              border: `1px solid ${theme.border.accent}`,
              color: theme.text.secondary
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.border.accent;
              e.currentTarget.style.color = theme.bg.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.text.secondary;
            }}
          >
            view my resume
          </Link>
        </div>
      </div>
      <div className="flex md:flex-col-reverse items-center justify-start">
        <div
          className="bg-no-repeat bg-cover w-48 h-12 md:w-72 md:h-24 bg-left"
          style={{ 
            backgroundImage: `url("${isDark ? 'signature.png' : 'signature-dark.png'}")` 
          }}
        />
        <div
          className="bg-no-repeat bg-cover w-32 h-32 md:w-48 md:h-48"
          style={{ backgroundImage: `url("head-shot.png")` }}
        />
      </div>
    </div>
  );
}
