import useSWR from "swr";
import styles from "../styles/Projects.module.css";
import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-reveal";
import useIsExpandedTimeout from "../hooks/useIsExpandedTimeout";

interface IProjectsDataItem {
  id: number;
  description: string;
  webUrl: string;
  gitUrl: string;
  title: string;
  image: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FrontOfCard = ({ itemImage }: { itemImage: IProjectsDataItem }) => {
  return (
    <Image
      src={`${itemImage.image}}`}
      width={500}
      height={400}
      alt={`need to add alt text for ${itemImage.title}`}
      style={{ objectFit: "contain" }}
      className="rounded-lg"
    />
  );
};

const BackOfCard = ({ itemContent }: { itemContent: IProjectsDataItem }) => {
  return (
    <div
      className={`flex h-[70%] w-full flex-col items-center justify-center rounded-lg bg-slate-800 md:h-[70%] lg:h-[77%] xl:h-[70%] xxl:h-full `}
      key={itemContent.id}
    >
      {" "}
      <p className="break normal text-lg font-bold text-white xl:text-xl">
        {itemContent.title}
      </p>{" "}
      <p className="text-sm text-white">{itemContent.description}</p>{" "}
      <div className="flex flex-row">
        <a
          href={itemContent.gitUrl}
          target="_blank"
          rel="noreferrer"
          className="m-2 "
        >
          <Image
            src={
              "https://github.com/Jimmy-b36/portfolio/blob/main/public/images/github-icon-white.png?raw=true"
            }
            alt="github_logo"
            height={30}
            width={30}
          />
        </a>
        {itemContent.webUrl && (
          <a
            href={itemContent.webUrl}
            target="_blank"
            rel="noreferrer"
            className="m-2 "
          >
            <Image
              src={
                "https://github.com/Jimmy-b36/portfolio/blob/main/public/images/web-logo.png?raw=true"
              }
              alt="github_logo"
              height={30}
              width={30}
            />
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [isTouchActive, setIsTouchActive] = useState(false);
  const isExpanded = useIsExpandedTimeout(850);

  const { data: projectsData, error } = useSWR("api/staticProject", fetcher);
  console.log(projectsData);

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
                  onTouchMove={() => setIsTouchActive(!isTouchActive)}
                  key={projectItem.id}
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
