import { Fade } from "react-reveal";
import Typed from "react-typed";
import useIsExpandedTimeout from "../hooks/useIsExpandedTimeout";

const Home = () => {
  const isExpanded = useIsExpandedTimeout(850);

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
