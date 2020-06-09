import * as React from "react";
import classnames from "classnames";

import { usePrevious } from "../../usePrevious";

import { CollapseTransitionCSS } from "../../components/CollapseTransitionCSS";

import "../../styles.scss";
import "../../CollapsePanel.scss";

export default function App() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <CollapsePanelCSS
      expanded={expanded}
      onClickHeader={() => setExpanded(prevVal => !prevVal)}
      header={<h2>Hello CodeSandbox</h2>}
      content={<h3>Start editing to see some magic happen!</h3>}
    />
  );
}

export type Props = React.HTMLAttributes<HTMLElement> & {
  expanded: boolean;
  onClickHeader: React.MouseEventHandler<HTMLElement>;
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function CollapsePanelCSS({
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
      <h1>CollapseTransitionCSS</h1>

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
            {expanded ? "(expanded) 👆" : "(collapsed) 👇"}
          </i>
        </button>
      </header>

      <CollapseTransitionCSS expanded={expanded}>
        <div
          data-testid="collapsible"
          aria-expanded={expanded}
          className="collapsible"
          style={{
            transition: "height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1)"
          }}
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
      </CollapseTransitionCSS>

      <p>Content below the panel</p>
    </section>
  );
}
