import React from "react";
import { Transition } from "react-transition-group";

export function CollapseTransitionCSS({
  expanded,
  children
}: {
  expanded: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const heightRef = React.useRef<number>(0);

  return (
    <Transition
      appear
      unmountOnExit
      in={expanded}
      timeout={null}
      addEndListener={(node, done) =>
        node.addEventListener("transitionend", done, false)
      }
      onEnter={node => {
        heightRef.current = node.offsetHeight;
        node.style.height = "0";
        // Force synchronously layout reflow/repaint,
        // before going into the next lifecycle,
        // a.k.a "layout thrashing"
        // eslint-disable-next-line no-unused-expressions
        node.scrollTop;
      }}
      onEntering={node => {
        node.style.height = `${heightRef.current}px`;
      }}
      onEntered={node => {
        node.style.height = "";
      }}
      onExit={node => {
        node.style.height = `${node.offsetHeight}px`;
      }}
      onExiting={node => {
        requestAnimationFrame(() => {
          node.style.height = "0";
        });
      }}
    >
      {children}
    </Transition>
  );
}
