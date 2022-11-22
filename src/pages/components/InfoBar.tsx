import { SetStateAction, Dispatch, useEffect } from "react";

interface IInfoBar {
  title: string;
  color: string;
  setPageSelected: Dispatch<SetStateAction<string>>;
  hidden: boolean;
  page?: JSX.Element;
}

const InfoBar = ({ title, color, setPageSelected, hidden, page }: IInfoBar) => {
  return (
    <div className="flex flex-row ">
      <button
        className="flex h-screen w-20 items-center justify-center border border-black"
        style={{ backgroundColor: `${color}` }}
        onClick={(e) => setPageSelected(title)}
        value={title}
      >
        <p className="-rotate-90 text-5xl font-bold">{title}</p>
      </button>
      {hidden ? <div className="flex flex-col">{page}</div> : null}
    </div>
  );
};

export default InfoBar;
