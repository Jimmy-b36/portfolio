import type { SetStateAction, Dispatch } from "react";

interface IAccordianButton {
  title: string;
  color: string;
  setPageSelected: Dispatch<SetStateAction<string>>;
  pageSelected: string;
}

const AccordianButton = ({
  title,
  color,
  setPageSelected,
  pageSelected,
}: IAccordianButton) => {
  return (
    <div className="flex min-w-full xl:flex-row">
      <button
        className="flex w-screen items-center justify-center border border-black lg:h-screen lg:w-20 xl:h-screen xl:w-20"
        style={{ backgroundColor: `${color}` }}
        onClick={() =>
          pageSelected === title
            ? setPageSelected("Home")
            : setPageSelected(title)
        }
        value={title}
      >
        <p className="text-5xl font-bold lg:-rotate-90 xl:-rotate-90">
          {title}
        </p>
      </button>
    </div>
  );
};

export default AccordianButton;
