import React, { useEffect, useState } from "react";
import Image from "next/image";
import Fade from "react-reveal/Fade";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const x = setTimeout(() => {
      setIsExpanded(true);
    }, 850);
    return () => clearTimeout(x);
  }, []);

  return (
    <div className="flex items-center justify-center lg:w-full lg:flex-col">
      {isExpanded && (
        <Fade left>
          <h1 className="font-bold text-gray-200 lg:m-5 lg:text-5xl">About</h1>
          <div className="flex items-center lg:flex-row">
            <Image
              src="https://github.com/Jimmy-b36/portfolio/blob/main/public/images/ProfilePic.jpg?raw=true"
              alt="Picture of the author"
              width={600}
              height={600}
              className="w-auto rounded-full md:h-[300px] xl:h-[600px]"
            />
            <p className="ml-10 w-64 whitespace-pre-line text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
              dicta eum! Vel odio iste sed at possimus ad ex quibusdam!
              Obcaecati, unde. Dignissimos dicta reiciendis ratione ut
              molestias, ea culpa.
            </p>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default About;
