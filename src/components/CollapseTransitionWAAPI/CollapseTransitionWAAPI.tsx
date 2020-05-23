import React from "react";
import { AnimateMounting } from "./AnimateMounting";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export function CollapseTransitionWAAPI({ show, children }: Props) {
  return (
    <AnimateMounting
      show={show}
      children={children}
      animate={({ el }) => {
        const maxHeight = el.offsetHeight + "px";
        const duration = 1500;
        const easing = "cubic-bezier(0.645, 0.045, 0.355, 1)";
        const options = { duration, easing };

        el.animate([{ maxHeight: 0 }, { maxHeight }], options);

        return () => {
          console.log("runing exit anmation");
          const animation = el.animate(
            [{ maxHeight }, { maxHeight: 0 }],
            options
          );

          return animation;
        };
      }}
    />
  );
}
