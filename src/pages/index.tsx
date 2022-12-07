import { type NextPage } from "next";
import InfoBar from "../components/InfoBar";
import { useEffect, useRef, useState } from "react";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

interface ITitles {
  title: string;
  color: string;
  page: JSX.Element;
}

const timeout = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const Home: NextPage = () => {
  const [isExpanded, setIsExpanded] = useState<string>("hidden");

  const [pageSelected, setPageSelected] = useState("Home");

  // when I expand the div set off a function that waits 1 sec then changes the view to block
  const changeVisibility = () => {
    timeout(1000);
    return "block";
  };

  const TITLES: ITitles[] = [
    {
      title: "About",
      color: "#2A9D8F",
      page: <About />,
    },
    {
      title: "Projects",
      color: "#E9C46A",
      page: <Projects />,
    },
    {
      title: "Skills",
      color: "#E76F51",
      page: <Skills />,
    },
    {
      title: "Contact",
      color: "#F4A261",
      page: <Contact />,
    },
  ];

  // if the page selected is not home or that page itself transform button to other side of page
  return (
    <div className="flex bg-slate-900 lg:flex-row">
      {TITLES.map((item, index) => (
        <>
          <div key={index}>
            <InfoBar
              title={item.title}
              color={item.color}
              setPageSelected={setPageSelected}
              page={item.page}
              isHidden={pageSelected === item.title}
            />
          </div>
          <div
            className="flex items-center justify-center duration-1000 ease-in-out lg:flex-row"
            style={
              pageSelected === item.title ? { flexGrow: 1 } : { flexGrow: 0 }
            }
          >
            <div
              className={`${
                pageSelected === item.title ? changeVisibility() : "hidden"
              } transition duration-500 `}
            >
              {pageSelected === item.title && item.page}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Home;
