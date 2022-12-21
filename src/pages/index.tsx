import { type NextPage } from "next";
import InfoBar from "../components/InfoBar";
import { Fragment, useEffect, useState } from "react";
import Skills from "../components/Skills";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Home from "../components/Home";

interface ITitles {
  title: string;
  color: string;
  page: JSX.Element;
}

const TITLES: ITitles[] = [
  { title: "About", color: "#2A9D8F", page: <About /> },
  { title: "Projects", color: "#E9C46A", page: <Projects /> },
  { title: "Skills", color: "#E76F51", page: <Skills /> },
  { title: "Contact", color: "#F4A261", page: <Contact /> },
];

const Index: NextPage = () => {
  const [pageSelected, setPageSelected] = useState("Home");

  // if the page selected is not home or that page itself transform button to other side of page
  return (
    <div className="flex min-h-screen flex-col bg-slate-900  lg:flex-row xl:flex-row">
      {TITLES.map((item, index) => (
        <Fragment key={index}>
          <div>
            <InfoBar
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

export default Index;
