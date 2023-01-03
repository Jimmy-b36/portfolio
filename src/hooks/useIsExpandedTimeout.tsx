import { useEffect, useState } from "react";

const DELAY = 850;
const useIsExpandedTimeout = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const x = setTimeout(() => {
      setIsExpanded(true);
    }, DELAY);
    return () => clearTimeout(x);
  }, []);

  return isExpanded;
};

export default useIsExpandedTimeout;
