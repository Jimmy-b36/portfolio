import React, { useEffect, useState } from "react";
import TagSphere from "./TagSphere";
import { Fade } from "react-reveal";

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 850);
  }, []);
  return (
    <>
      {isExpanded && (
        <Fade left>
          <div className="rounded-full bg-gradient-to-br from-white to-slate-500">
            <TagSphere />
          </div>
        </Fade>
      )}
    </>
  );
};

export default Skills;
