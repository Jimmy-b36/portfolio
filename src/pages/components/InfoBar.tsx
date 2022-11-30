import { SetStateAction, Dispatch, useEffect, useState } from "react";

interface IInfoBar {
  title: string;
  color: string;
  setPageSelected: Dispatch<SetStateAction<string>>;
  isHidden: boolean;
  page?: JSX.Element;
}

const InfoBar = ({
  title,
  color,
  setPageSelected,
  isHidden,
  page,
}: IInfoBar) => {
  return (
    <div className="flex flex-row min-w-full">
      <button
        className="flex items-center justify-center w-20 h-screen border border-black"
        style={{ backgroundColor: `${color}` }}
        onClick={() => setPageSelected(title)}
        value={title}
      >
        <p className="text-5xl font-bold -rotate-90">{title}</p>
      </button>
      {isHidden && page}
    </div>
  );
};

export default InfoBar;
