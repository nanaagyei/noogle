"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import projects from "../../data/projects.json";
import experiences from "../../data/experience.json";
import life from "../../data/life.json";
import whyHire from "../../data/why.json";
import Image from "next/image";
import { Tenor_Sans } from "next/font/google";
import { useTheme } from "../../contexts/ThemeContext";

export default function Search() {
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");
  const [selectedSearch, setSelectedSearch] = useState(
    project === "gradgptpro"
      ? projects.find((proj) => proj.alias === "gradgptpro")
      : ""
  );
  const displayQuery = query ? query : "";
  const displayData =
    (displayQuery == "nana-projects" && [...projects]?.reverse()) ||
    (displayQuery == "experience" && experiences) ||
    (displayQuery == "life" && [...life]?.reverse()) ||
    (displayQuery == "why-hire-nana" && whyHire);

  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(project === "gradgptpro" ? true : false);
  const languages = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "Typescript",
    "HTML",
    "CSS",
    "SQL",
    "Sqlite",
    "PostgreSQL",
    "Go",
  ];
  const technologies = [
    "React JS",
    "Nodejs",
    "Next JS",
    "Flask",
    "Git",
    "FastAPI",
    "Django",
    "Tailwind CSS",
    "Postgres",
    "Docker",
    "AWS",
    "Playwright",
    "pandas",
    "NumPy",
    "Matplotlib",
    "NLTK",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "MongoDB",
    "PyTorch",
    "GraphQL",
  ];

  useEffect(() => {
    if (project) {
      const params = new URLSearchParams(searchParams); // Clone the existing searchParams
      params.delete("p"); // Remove 'p' parameter

      // Update the URL without refreshing the page
      router.replace(`?${params.toString()}`, { shallow: true });
    }
  }, [project, searchParams, router]);

  const handleSelect = (data) => {
    setIsOpen(true);
    setSelectedSearch(data);
  };

  const SearchItem = ({ data }) => {
    return (
      <div
        className="font-ropaSans flex flex-row gap-x-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div 
              className="rounded-full w-8 h-8 flex items-center justify-center"
              style={{ backgroundColor: theme.bg.tertiary }}
            >
              <div
                className="bg-no-repeat bg-cover w-5 h-5"
                style={{ backgroundImage: `url(icons/key.svg)` }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="opacity-75 text-sm">{data.timeline}</h2>
            </div>
          </div>
          <h2
            className="text-xl hover:underline cursor-pointer"
            style={{ color: theme.text.link }}
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 style={{ color: theme.text.muted }}>{data.searchDescription}</h2>
        </div>

        <Image
          src={`/search-img/${data.alias}-icon.png`}
          alt={`${data.alias} icon`}
          width={96}
          height={90}
          className="rounded-md w-24 h-24"
        />
      </div>
    );
  };

  const SearchItemOpen = ({ data }) => {
    return (
      <div>
        <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div
            className="p-2 flex flex-col items-center h-4/5 w-11/12 md:w-4/5 lg:w-3/5 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
            style={{ 
              backgroundColor: theme.bg.modal,
              boxShadow: `0 25px 50px -12px ${theme.shadow}`
            }}
          >
            <div className="flex row w-full justify-end mb-2">
              <div
                className="bg-no-repeat bg-cover w-6 h-6"
                style={{ backgroundImage: "url(icons/exit.svg)" }}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="relative w-full h-2/5 md:h-3/5 rounded-lg overflow-hidden">
              <Image
                src={`/search-img/${data.alias}-banner.png`}
                alt={`${data.alias} banner`}
                layout="fill" // Ensures it takes up the full parent size
                objectFit="contain"
                priority
              />
            </div>

            <div className="flex flex-col w-full items-center justify-start h-3/5 p-4 gap-y-2 relative">
              <h2 className="w-full text-2xl" style={{ color: theme.text.primary }}>{data.title}</h2>
              <div className={`flex flex-row w-full gap-x-2`}>
                {displayQuery === "nana-projects" &&
                  data.links.map((link, idx) => (
                    <Link
                      className={`flex flex-row py-1.5 px-3 text-sm font-medium text-center items-center gap-x-2 rounded  border border-stone-700 transform transition-all duration-300 ${
                        link.name == "github"
                          ? "bg-dark-purple-300 hover:bg-[#4D456E] border-dark-purple-300 flex-row-reverse"
                          : "bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                      }`}
                      key={idx}
                      href={link.link}
                      target={"_blank"}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      <h2>{link.name}</h2>
                      <div
                        className={`bg-no-repeat bg-cover ${
                          link.name == "video" ? "w-6 h-6" : "w-4 h-4"
                        }`}
                        style={{
                          backgroundImage: `url(icons/${
                            isHover ? link.urlHover : link.url
                          })`,
                        }}
                      />
                    </Link>
                  ))}
              </div>

              <div
                className="relative w-full h-full overflow-y-scroll overflow-x-hidden text-wrap scroll-smooth"
                style={{ scrollbarWidth: "1" }}
              >
                <div className="font-thin">
                  {data.longDescription.split('\n').map((line, index) => (
                    <div key={index} className="mb-2">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-row w-full gap-x-2">
                {data.type == "project" &&
                  data.tech.map((stack, idx) => (
                    <div
                      key={idx}
                      className="bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                    >
                      {stack}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex flex-col w-full h-full font-ropaSans"
      style={{ color: theme.text.primary }}
    >
      <div className="flex flex-col w-full relative ">
        <div 
          className="border borber-b border-[0.05rem]" 
          style={{ borderColor: theme.border.primary }}
        />
        <div className="w-full flex flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2  lg:pl-48">
            {(displayQuery !== "why-hire-nana" &&
              displayData?.map((data, idx) => (
                <div key={idx}>
                  <SearchItem data={data} />
                </div>
              ))) || (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-2 items-center">
                  <div
                    className="bg-no-repeat bg-cover w-4 h-5"
                    style={{ backgroundImage: "url(icons/star.svg)" }}
                  />
                  <h2>AI Overview</h2>
                </div>

                <div className="flex flex-col gap-y-3">
                  <h2>
                    <span 
                      className="py-1"
                      style={{ backgroundColor: theme.text.accent }}
                    >
                      I love learning everything I can.
                    </span>
                  </h2>
                  <h2 className="">
                    <span 
                      className="py-1"
                      style={{ backgroundColor: theme.text.accent }}
                    >
                      seeking global opportunities to specialize in emerging
                      technologies and apply my skills in software, machine 
                      learning, and deep learning.
                    </span>
                  </h2>
                </div>

                <div
                  className={`flex flex-col gap-y-3 relative ${
                    showMore ? "h-auto" : "h-40 overflow-y-hidden"
                  }`}
                >

                  <h2>
                    With a strong foundation in mathematics and programming, I've dedicated
                    my career to leveraging technical expertise in software engineering,
                    machine learning and deep learning to solve complex problems. My unique
                    combination of mathematical thinking, engineering skills, and hands-on
                    experience with cutting-edge AI technologies has enabled me to
                    consistently deliver innovative solutions with measurable impact.
                  </h2>

                  <h2>
                    Throughout my career, I've consistently demonstrated a knack for
                    transforming challenges into opportunities for innovation. At
                    dynaConnections, I revolutionized the QA process by implementing
                    an automated testing framework that reduced testing time by 70%
                    while increasing coverage by 40%. I also spearheaded the
                    development of GradGPT.pro, an innovative AI-powered platform
                    that's reshaping how students approach academic writing. My
                    expertise in Python, JS/TS, and deep learning frameworks like
                    PyTorch and TensorFlow has enabled me to build sophisticated
                    solutions that push the boundaries of what's technically
                    possible while delivering real business value.
                  </h2>

                  <h2>
                    Working with companies like dynaConnections and co-founding GradGPT.pro has led to 
                    innovative solutions being successfully implemented, showcasing my ability 
                    to identify opportunities and deliver measurable value through technical expertise 
                    and creative problem-solving.
                  </h2>

                  <h2>
                    While my technical experiences are vast, I deeply value
                    opportunities to broaden my exposure to the challenges and
                    perspectives of diverse communities worldwide. I am seeking
                    opportunities to specialize in emerging technologies like
                    large language models, computer vision, and deep learning
                    while applying my skills in software engineering and machine
                    learning to solve complex problems. My goal is to leverage
                    cutting-edge AI technologies to create innovative solutions
                    that improve lives and drive meaningful impact across different
                    domains and industries.
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

                  {!showMore && (
                    <div 
                      className="absolute -bottom-6 h-10 w-full"
                      style={{
                        background: `linear-gradient(to top, ${theme.bg.primary}, ${theme.bg.secondary}, transparent)`
                      }}
                    />
                  )}
                </div>

                {!showMore && (
                  <div 
                    className="flex flex-col justify-end md:px-48 absolute left-0 w-full h-28 -bottom-8"
                    style={{
                      background: `linear-gradient(to top, ${theme.bg.primary}, transparent)`
                    }}
                  >
                    <div
                      onClick={() => setShowMore(!showMore)}
                      className="mt-3 py-3 w-full rounded-full md:w-2/3 lg:w-2/5 flex items-center justify-center gap-x-2 cursor-pointer"
                      style={{
                        border: `1px solid ${theme.border.secondary}`,
                        backgroundColor: theme.bg.secondary,
                        color: theme.text.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.bg.tertiary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.bg.secondary;
                      }}
                    >
                      <h2>Show More</h2>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                      </svg>
                    </div>

                    <div 
                      className="border borber-b border-[0.05rem] w-full mt-3" 
                      style={{ borderColor: theme.border.primary }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {displayQuery !== "why-hire-nana" && (
            <div 
              className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] shadow-xl rounded-lg md:flex flex-col gap-y-3"
              style={{ 
                borderColor: `${theme.text.primary}30`,
                boxShadow: `0 25px 50px -12px ${theme.shadow}`
              }}
            >
              
              
              <img
                src={
                  displayQuery == "life"
                    ? "search-img/life.JPG"
                    : "https://github-readme-stats.vercel.app/api/top-langs/?username=nanaagyei&layout=compact&theme=nightowl&hide_border=true&langs_count=6&show_icons=true"
                }
                alt="nanaagyei"
                className="w-full h-[17rem] rounded-t-lg"
              />

              {(displayQuery == "nana-projects" && (
                <div className="flex flex-col gap-y-3">
                  <h2 className="opacity-70 text-lg">
                    I love building impact-driven, full-stack projects, and AI Models.{" "}
                  </h2>
                  <h2 className="opacity-70 text-lg">
                    Currently, I'm studying to specialize my technical skills
                    in Machine Learning and Deep Learning. I'm also preparing for the AWS Machine Learning Engineer Associate Certification.
                  </h2>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      languages
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {languages.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      Frameworks & Libraries
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {technologies.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="flex flex-col gap-y-3 p-2">
                  <h2 className="text-xl">"Lead a life worth telling"</h2>
                  <h2 className="opacity-70 text-lg">
                    This is one of my favourite quotes of all times as it
                    continually motivates me to seek out unqiue, spontaneous
                    experiences to increase my wordly exposure.
                  </h2>
                  <h2 className="opacity-70 text-lg">
                    The following is an archive of memorable experiences where I
                    leave my comfort zone to experience something new.
                  </h2>

                  <h2 className="opacity-70 text-lg">
                    I'm learning to enjoy every moment of my life.
                  </h2>

                  <h2 className="opacity-70 text-sm">
                    (turns out it's more fun that way)
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>

        {isOpen && <SearchItemOpen data={selectedSearch} />}
      </div>

      {displayQuery == "why-hire-nana" && !showMore && (
        <div className="pl-10 md:pl-48 pt-16 flex flex-col gap-y-2">
          <h2 className="text-sm">
            Your search - <span className="font-bold">why hire a nana</span> -
            did not match any documents
          </h2>
          <h2 className="text-sm">Suggestions:</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Don't search something preposterous (everyone needs a nana!)
            </li>
            <li>Contact Nana to learn more</li>
          </ul>
        </div>
      )}
    </div>
  );
}
