import { useState, useEffect } from "react";

export const useHover = (delayEnter = 200, delayLeave = 0) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDelayedHover, setIsDelayedHover] = useState(false);

  useEffect(() => {
    let enterTimeout: NodeJS.Timeout;
    let leaveTimeout: NodeJS.Timeout;

    if (isHovered) {
      enterTimeout = setTimeout(() => {
        setIsDelayedHover(true);
      }, delayEnter);
    } else {
      leaveTimeout = setTimeout(() => {
        setIsDelayedHover(false);
      }, delayLeave);
    }

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(leaveTimeout);
    };
  }, [isHovered, delayEnter, delayLeave]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered: isDelayedHover,
    handleMouseEnter,
    handleMouseLeave,
  };
};
