import Image from "next/image";

import useIsExpandedTimeout from "../hooks/useIsExpandedTimeout";

const About = () => {
  const isExpanded = useIsExpandedTimeout();
  return (
    <>
      {isExpanded && (
        <div className="flex items-center justify-center">
          <div className="animate-fade-left">
            <div className="w-auto transition-all lg:flex-col">
              <h1 className="hidden bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-center text-6xl font-extrabold text-transparent lg:m-5 lg:block xl:block xxl:block ">
                About
              </h1>
              <div className="flex flex-col items-center lg:flex-row">
                <Image
                  src="https://github.com/Jimmy-b36/portfolio/blob/main/public/images/ProfilePic.jpg?raw=true"
                  alt="Picture of the author"
                  width={600}
                  height={600}
                  className="h-[200px] w-auto rounded-full md:h-[300px] lg:mb-0 xl:mb-0 xl:h-[600px]"
                />
                <p className="m-3 w-full whitespace-pre-line p-3 text-center text-gray-200 lg:ml-10 lg:w-80 xl:ml-10 xl:w-80 xxl:ml-10 xxl:w-80">
                  I am a ski instructor and web developer with a passion for
                  using technology to solve problems and improve people's lives.
                  In my free time, I am also an aspiring smart contract builder,
                  constantly learning and experimenting with new blockchain
                  technologies. I believe that the intersection of these skills
                  and interests allows me to bring a unique perspective to my
                  work and projects. Whether I'm teaching someone to ski or
                  building a web application, I am always looking for ways to
                  innovate and make a positive impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
