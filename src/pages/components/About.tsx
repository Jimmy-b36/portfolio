import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <h1 className="m-5 text-5xl font-bold text-gray-200">About</h1>
      <div className="flex flex-row items-center">
        <Image
          src="https://github.com/Jimmy-b36/portfolio/blob/main/public/images/ProfilePic.jpg?raw=true"
          alt="Picture of the author"
          width={500}
          height={500}
          className="rounded-full"
        />
        <p className="ml-10 w-52 whitespace-pre-line text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta
          eum! Vel odio iste sed at possimus ad ex quibusdam! Obcaecati, unde.
          Dignissimos dicta reiciendis ratione ut molestias, ea culpa.
        </p>
      </div>
    </div>
  );
};

export default About;
