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
      animate={({ el, show }) => {
        const maxHeight = el.offsetHeight + "px";
        const duration = 150;
        const easing = "cubic-bezier(0.645, 0.045, 0.355, 1)";
        const options = { duration, easing };

        if (show) {
          return el.animate([{ maxHeight: 0 }, { maxHeight }], options);
        } else {
          return el.animate([{ maxHeight }, { maxHeight: 0 }], options);
        }
      }}
    />
  );
}
