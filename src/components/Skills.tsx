import React, { useState } from "react";
import TagSphere from "./TagSphere";
import useIsExpandedTimeout from "../hooks/useIsExpandedTimeout";

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
  const [isListView, setIsListView] = useState<boolean>(false);
  const isExpanded = useIsExpandedTimeout();

  return (
    <>
      {isExpanded && (
        <div className="flex w-full animate-fade-left flex-col items-center justify-center">
          <h1 className="mt-10 hidden w-full bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-center text-6xl font-extrabold text-transparent lg:block xl:block xxl:block">
            Skills
          </h1>

          <button
            onClick={() => setIsListView(isListView ? false : true)}
            className="my-5 w-24 self-center rounded-lg bg-gray-200 p-4"
          >
            {isListView ? "Sphere" : "List"}
          </button>

          {isListView ? (
            <div className="mt-5 flex h-96 w-full justify-center">
              <ul className="flex h-3/4 w-3/4 flex-col flex-wrap rounded-lg bg-gradient-to-br from-white to-slate-500 p-5 text-center will-change-contents">
                {SKILLS.map((skill: string, index: number) => (
                  <li
                    key={index}
                    className="mr-2 text-center text-sm lg:text-2xl xl:text-2xl xxl:text-2xl"
                  >
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
        </div>
      )}
    </>
  );
};

export default Skills;
