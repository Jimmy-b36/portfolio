import React, { useEffect, useState } from "react";
import TagSphere from "./TagSphere";
import { Fade } from "react-reveal";

const SKILLS = [
  "TypeScript, ",
  "Next.js, ",
  "React, ",
  "Vite, ",
  "Javascript, ",
  "HTML, ",
  "CSS, ",
  "Tailwind, ",
  "Bootstrap, ",
  "PostgreSQL, ",
  "SQL, ",
  "Mongodb, ",
  "Prisma, ",
  "jQuery, ",
  "Mocha, ",
  "Chai, ",
  "Cypress, ",
  "Jest, ",
  "Rails, ",
  "Ruby, ",
  "Github, ",
  "Vercel, ",
  "Node.js, ",
  "Express, ",
  "Python",
];

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 850);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {isExpanded && (
        <Fade left>
          <h1 className="mt-10 w-full bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-center text-6xl font-extrabold text-transparent">
            Skills
          </h1>

          <button
            onClick={() => setIsListView(isListView ? false : true)}
            className="my-5 self-center rounded-lg bg-gray-200 p-4"
          >
            {isListView ? "Sphere view" : "List View"}
          </button>

          {isListView ? (
            <div className="mt-5 flex h-96 w-full justify-center">
              <ul className="flex h-1/2 w-3/4 flex-col flex-wrap rounded-lg bg-gradient-to-br from-white to-slate-500 p-5 text-center will-change-contents">
                {SKILLS.map((skill: string, index: number) => (
                  <li key={index} className="mr-2 text-2xl">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-auto rounded-full bg-gradient-to-br from-white to-slate-500">
              <TagSphere />
            </div>
          )}
        </Fade>
      )}
    </div>
  );
};

export default Skills;
