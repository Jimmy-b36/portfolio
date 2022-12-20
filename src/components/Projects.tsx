import useSWR from "swr";
import styles from "../styles/Projects.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fade } from "react-reveal";

interface IProjectsDataItem {
  id: number;
  attributes: {
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    description: string;
    URL: string;
    title: string;
  };
}

const fetcher = (url: string, token: []) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json()
  );

const FrontOfCard = ({ itemImage }: { itemImage: IProjectsDataItem }) => {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${itemImage.attributes.image.data.attributes.url}`}
      width={500}
      height={400}
      alt="test"
      style={{ objectFit: "contain" }}
      className="rounded-lg"
    />
  );
};

const BackOfCard = ({ itemContent }: { itemContent: IProjectsDataItem }) => {
  return (
    <div
      className={`flex h-[70%] w-full flex-col items-center justify-center rounded-lg bg-slate-500 md:h-[77%] lg:h-[77%] xl:h-full `}
      key={itemContent.id}
    >
      {" "}
      <p className="break normal text-lg font-bold text-white xl:text-2xl">
        {itemContent.attributes.title}
      </p>{" "}
      <p className="text-sm text-white">{itemContent.attributes.description}</p>{" "}
      <a
        href={itemContent.attributes.URL}
        target="_blank"
        rel="noreferrer"
        className="m-2 rounded-lg bg-orange-700 p-3"
      >
        URL link
      </a>
    </div>
  );
};

const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);

  const { data: projectsData, error } = useSWR(
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
            <h1 className="mb-5 hidden w-full bg-gradient-to-r from-blue-200 to-pink-600 bg-clip-text text-center text-6xl font-extrabold text-transparent lg:block xl:mb-0 xl:block">
              Projects
            </h1>
            {projectsData &&
              projectsData.data.map((projectItem: IProjectsDataItem) => (
                <div
                  className={styles.flip}
                  onTouchEnd={() => setIsTouchActive(!isTouchActive)}
                >
                  <div
                    className={styles.flipContent}
                    style={
                      isTouchActive
                        ? {
                            transform: `rotateY(180deg)`,
                            transition: `transform 0.3s`,
                          }
                        : {}
                    }
                  >
                    <div className={styles.flipFront}>
                      <FrontOfCard itemImage={projectItem} />
                    </div>

                    <div className={styles.flipBack}>
                      <BackOfCard itemContent={projectItem} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Fade>
      )}
    </>
  );
};

export default Projects;
