import Image from "next/image";
import { useEffect, useState } from "react";
import { Fade } from "react-reveal";

const About = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 850);
  }, []);
  return (
    <>
      {isExpanded && (
        <div className="flex items-center justify-center">
          <Fade left>
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
                  className="mb-5 h-[200px] w-auto rounded-full md:h-[300px] xl:h-[600px]"
                />
                <p className="ml-10 w-64 whitespace-pre-line text-gray-200">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  dicta eum! Vel odio iste sed at possimus ad ex quibusdam!
                  Obcaecati, unde. Dignissimos dicta reiciendis ratione ut
                  molestias, ea culpa.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

export default About;
