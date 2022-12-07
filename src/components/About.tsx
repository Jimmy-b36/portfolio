import Image from "next/image";

const About = () => {
  return (
    <>
      <div className="items-center justify-center flex-grow w-auto lg:flex-col">
        <h1 className="font-bold text-gray-200 lg:m-5 lg:text-5xl">About</h1>
        <div className="flex items-center lg:flex-row">
          <Image
            src="https://github.com/Jimmy-b36/portfolio/blob/main/public/images/ProfilePic.jpg?raw=true"
            alt="Picture of the author"
            width={600}
            height={600}
            className="w-auto rounded-full md:h-[300px] xl:h-[600px]"
          />
          <p className="w-64 ml-10 text-gray-200 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta
            eum! Vel odio iste sed at possimus ad ex quibusdam! Obcaecati, unde.
            Dignissimos dicta reiciendis ratione ut molestias, ea culpa.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
