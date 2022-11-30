import { type NextPage } from "next";
import InfoBar from "./components/InfoBar";
import { useState } from "react";
import Skills from "./components/Skills";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const TITLES = [
  { title: "About", color: "#2A9D8F", page: <About /> },
  { title: "Projects", color: "#E9C46A", page: <Projects /> },
  { title: "Contact", color: "#F4A261", page: <Contact /> },
  { title: "Skills", color: "#E76F51", page: <Skills /> },
];

const Home: NextPage = () => {
  const [pageSelected, setPageSelected] = useState("Home");
  // if the page selected is not home or that page itself transform button to other side of page
  return (
    <div className="flex bg-slate-900 lg:flex-row">
      {TITLES.map((item, index) => (
        <div
          className="flex duration-1000 ease-in-out lg:flex-row"
          style={
            pageSelected === item.title ? { flexGrow: 1 } : { flexGrow: 0 }
          }
          key={index}
        >
          <InfoBar
            title={item.title}
            color={item.color}
            setPageSelected={setPageSelected}
            page={item.page}
            hidden={pageSelected === item.title}
          />
{pageSelected === item.title && item.page}
        </div>
      ))}
    </div>
  );
};

export default Home;
