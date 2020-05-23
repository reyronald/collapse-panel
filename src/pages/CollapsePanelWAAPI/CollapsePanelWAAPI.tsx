import React from "react";
import classnames from "classnames";

import { CollapseTransitionWAAPI } from "../../components/CollapseTransitionWAAPI";

import "../../styles.scss";

export default function App() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <CollapsePanelWAAPI
      expanded={expanded}
      onClickHeader={() => setExpanded(prevVal => !prevVal)}
      header={<h2>Hello CodeSandbox</h2>}
      content={<h3>Start editing to see some magic happen!</h3>}
    />
  );
}

function CollapsePanelWAAPI({ expanded, onClickHeader, header, content }) {
  return (
    <section className={classnames("CollapsePanel")}>
      <h1>CollapseTransitionWAAPI</h1>

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

      <CollapseTransitionWAAPI show={expanded}>
        <div className="collapsible">
          <div className="content">{content}</div>
        </div>
      </CollapseTransitionWAAPI>

      <p>Content below the panel</p>
    </section>
  );
}
