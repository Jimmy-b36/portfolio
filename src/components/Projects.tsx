import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fade } from "react-reveal";

const fetcher = (url: string, token: []) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json()
  );

interface IProjects {
  id: number;
  attributes: {
    description: string;
    URL: string;
    image: { data: { attributes: { url: string } } };
    title: string;
  };
}
const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, error } = useSWR(
    [
      `http://localhost:1337/api/projects?populate=*`,
      process.env.NEXT_PUBLIC_STRAPI_TOKEN,
    ],
    fetcher
  );

  useEffect(() => {
    const x = setTimeout(() => {
      setIsExpanded(true);
    }, 850);
    return () => clearTimeout(x);
  }, []);

  if (error) return <div>failed to load</div>;
  return (
    <>
      {isExpanded && (
        <Fade left>
          <div className="flex flex-wrap justify-center">
            <h1 className="w-full bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-center text-6xl font-extrabold text-transparent">
              Projects
            </h1>
            {data &&
              data.data.map((item: IProjects) => (
                <a
                  className={`m-10 flex h-auto w-1/4 flex-col items-center justify-center rounded-lg bg-slate-500 drop-shadow-[5px_5px_16px_5px_rgba(129,129,129,1)] `}
                  style={{
                    boxShadow:
                      "31px 31px 63px #060911, -31px -31px 63px #182543",
                  }}
                  href={item.attributes.URL}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                >
                  {" "}
                  <p className="break normal m-2 text-2xl font-bold text-white">
                    {item.attributes.title}
                  </p>{" "}
                  <p className="m-2 text-white">
                    {item.attributes.description}
                  </p>{" "}
                  <Image
                    src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                    width={400}
                    height={300}
                    alt="test"
                    style={{ objectFit: "contain" }}
                    className="rounded-b-lg"
                  />
                </a>
              ))}
          </div>
        </Fade>
      )}
    </>
  );
};

export default Projects;
