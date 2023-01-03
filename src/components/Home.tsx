import Typewriter from "typewriter-effect";
import useIsExpandedTimeout from "../hooks/useIsExpandedTimeout";

const Home = () => {
  const isExpanded = useIsExpandedTimeout();
  return (
    <>
      {isExpanded && (
        <div className="flex w-full animate-fade-left items-center justify-center">
          <div className="flex h-[36rem] w-full items-center justify-center bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-5xl font-bold text-transparent lg:h-screen lg:text-8xl xl:h-screen xl:text-9xl xxl:h-screen xxl:text-9xl">
            <Typewriter
              options={{
                strings: ["James Ball", "Developer,", "Streamer,", "Skier."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
