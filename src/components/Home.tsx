import { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import Typed from "react-typed";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const x = setTimeout(() => {
      setIsExpanded(true);
    }, 850);
    return () => clearTimeout(x);
  }, []);
  return (
    <>
      {isExpanded && (
        <Fade left>
          <div className="flex h-[36rem] w-full items-center justify-center bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-5xl font-bold text-transparent lg:h-screen lg:text-8xl xl:h-screen xl:text-9xl xxl:h-screen xxl:text-9xl">
            <Typed
              strings={["James Ball", "Developer,", "Streamer,", "Skier."]}
              typeSpeed={100}
              backSpeed={50}
              style={{}}
              loop
            />
          </div>
        </Fade>
      )}
    </>
  );
};

export default Home;
