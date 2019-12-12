import { useEffect } from "react";

export default (target = window, type, listener, ...options) => {
  // console.table({ target, type, ...options });
  // console.log("useListener Ran", type, target);
  useEffect(() => {
    const targetIsRef = target.hasOwnProperty("current");
    const currentTarget = targetIsRef ? target.current : target;
    // console.debug("useListener Effect", currentTarget, targetIsRef);
    if (currentTarget)
      currentTarget.addEventListener(type, listener, ...options);
    // console.debug(`🌽useListener added`, currentTarget, type);
    return () => {
      if (currentTarget)
        currentTarget.removeEventListener(type, listener, ...options);
      // console.debug("🌽useListener removed", currentTarget, type);
    };
  }, [target, type, listener, options]);
};
