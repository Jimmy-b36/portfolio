import { TagSphereTexts } from "./Skills";

const TagSphereImg = ({ texts }: { texts: TagSphereTexts }) => {
  return (
    <img
      key={texts.id}
      className="tag-sphere-image"
      height={
        window.innerWidth > 1440 ? 20 : window.innerWidth > 1020 ? 15 : 12
      }
      width={window.innerWidth > 1440 ? 75 : window.innerWidth > 1020 ? 50 : 40}
      src={texts.image}
      alt={texts.alt}
    />
  );
};

export default TagSphereImg;
