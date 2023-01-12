import { type NextPage } from "next";
import AccordianButton from "../components/AccordianButton";
import { Fragment, useState } from "react";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Home from "../components/Home";
import { TagSphereTexts } from "../components/Skills";
import { ProjectsDataItem } from "../components/Projects";

interface ITitles {
  title: string;
  color: string;
  page: JSX.Element;
}

interface IIndexProps {
  skillsData: { data: TagSphereTexts[] };
  projectsData: { data: ProjectsDataItem[] };
}

const Index = ({ skillsData, projectsData }: IIndexProps) => {
  const [pageSelected, setPageSelected] = useState("Home");

  const TITLES: ITitles[] = [
    { title: "About", color: "#2A9D8F", page: <About /> },
    {
      title: "Projects",
      color: "#E9C46A",
      page: <Projects projectsData={projectsData} />,
    },
    {
      title: "Skills",
      color: "#E76F51",
      page: <Skills tagSphereData={skillsData} />,
    },
    { title: "Contact", color: "#F4A261", page: <Contact /> },
  ];

  // if the page selected is not home or that page itself transform button to other side of page
  return (
    <div className="flex min-h-screen flex-col bg-slate-900  lg:flex-row xl:flex-row">
      {TITLES.map((item, index) => (
        <Fragment key={index}>
          <div>
            <AccordianButton
              title={item.title}
              color={item.color}
              setPageSelected={setPageSelected}
              pageSelected={pageSelected}
            />
          </div>
          <div
            className="flex items-center justify-center duration-1000 ease-in-out lg:flex-row"
            style={
              pageSelected === item.title ? { flexGrow: 1 } : { flexGrow: 0 }
            }
          >
            <div className="flex w-full justify-center">
              {pageSelected === item.title && item.page}
            </div>
          </div>
        </Fragment>
      ))}
      {pageSelected === "Home" && <Home />}
    </div>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const skillsRes = await fetch("https://james-ball.dev/api/staticSkill");
  const projectsRes = await fetch("https://james-ball.dev/api/staticProject");
  const projectsData = await projectsRes.json();
  const skillsData = await skillsRes.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      skillsData,
      projectsData,
    },
  };
}

export default Index;
