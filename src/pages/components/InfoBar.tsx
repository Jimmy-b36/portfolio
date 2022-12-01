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
    <div className="flex min-w-full flex-row">
      <button
        className="flex h-screen w-20 items-center justify-center border border-black"
        style={{ backgroundColor: `${color}` }}
        onClick={() => setPageSelected(title)}
        value={title}
      >
        <p className="-rotate-90 text-5xl font-bold">{title}</p>
      </button>
      {isHidden && page}
    </div>
  );
};

export default InfoBar;
