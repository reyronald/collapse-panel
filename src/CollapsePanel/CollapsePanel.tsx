import * as React from "react";
import classnames from "classnames";
import { Transition } from "react-transition-group";

import "./CollapsePanel.scss";

export type Props = React.HTMLAttributes<HTMLElement> & {
  expanded: boolean;
  onClickHeader: React.MouseEventHandler<HTMLElement>;
  header: React.ReactNode;
  content: React.ReactNode;
  className?: string;
};

export default function CollapsePanel({
  expanded,
  onClickHeader,
  header,
  content,
  footer,
  className,
  ...rest
}: Props): React.ReactElement {
  const headerNodeRef = React.useRef<HTMLElement>(null);
  const prevExpanded = usePrevious(expanded);

  return (
    <section
      {...rest}
      ref={headerNodeRef}
      className={classnames("CollapsePanel", className)}
    >
      <header className="header" onClick={onClickHeader}>
        <div className="header-content">{header}</div>

        <button className="header-toggle-button">
          <i
            aria-label="Toggle section contents"
            aria-expanded={expanded}
            className={classnames("fa", {
              "fa-chevron-up": expanded,
              "fa-chevron-down": !expanded
            })}
          >
            {expanded ? "👆" : "👇"}
          </i>
        </button>
      </header>

      <CollapseTransition expanded={expanded}>
        <div
          data-testid="collapsible"
          aria-expanded={expanded}
          className="collapsible"
          onTransitionEnd={() => {
            if (!prevExpanded && expanded) {
              window.scrollTo({
                top: headerNodeRef.current.offsetTop,
                behavior: "smooth"
              });
            }
          }}
        >
          <div className="content">{content}</div>
        </div>
      </CollapseTransition>
    </section>
  );
}

function CollapseTransition({
  expanded,
  children
}: {
  expanded: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const heightRef = React.useRef<number>(0);
  const rafRef = React.useRef<number>();

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
      }}
      onEntering={node => {
        rafRef.current = requestAnimationFrame(() => {
          node.style.height = `${heightRef.current}px`;
        });
      }}
      onExit={node => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        node.style.height = "0";
      }}
    >
      {children}
    </Transition>
  );
}

function usePrevious<T>(value: T): T | void {
  const ref = React.useRef<T | void>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
