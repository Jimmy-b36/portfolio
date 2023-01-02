import { useEffect, useState } from "react";

const useIsExpandedTimeout = (delay: number) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const x = setTimeout(() => {
      setIsExpanded(true);
    }, delay);
    return () => clearTimeout(x);
  }, []);

  return isExpanded;
};

export default useIsExpandedTimeout;
