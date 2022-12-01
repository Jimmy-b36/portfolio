import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";

const TOKEN =
  "349d940b9ac04f382bf4c5111f8ee73b9cec4187aa965e3c3f2953f54015b9bd605555ae241b51e2209b49d9a8618d34fe086616a3eb52df02a4fc23387e502246d276db1aea81872ed1098b89c44c0b10f56ab964ca3eafb3b9b49e3605c830c57dd21609e258b02c44ab47fd50070adbf3d6889997d8899f47f9d792e5af9b";

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
    [`http://localhost:1337/api/projects?populate=*`, TOKEN],
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
    <div className="flex flex-wrap justify-center">
      {data &&
        isExpanded &&
        data.data.map((item: IProjects) => (
          <Fade right>
            <a
              className="m-10 flex flex-col items-center justify-center rounded-lg bg-slate-500 drop-shadow-[5px_5px_16px_5px_rgba(129,129,129,1)] transition-all"
              style={{
                boxShadow: "31px 31px 63px #060911, -31px -31px 63px #182543",
              }}
              href={item.attributes.URL}
              target="_blank"
              rel="noreferrer"
              key={item.id}
            >
              {" "}
              <p className="m-2 text-2xl font-bold text-white ">
                {item.attributes.title}
              </p>{" "}
              <p className="m-2 text-white">{item.attributes.description}</p>{" "}
              <Image
                src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                width={500}
                height={600}
                alt="test"
                className="rounded-b-lg"
              />
            </a>
          </Fade>
        ))}
    </div>
  );
};

export default Projects;
