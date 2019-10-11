import * as React from "react";
import { render } from "react-dom";

import CollapsePanel from "./CollapsePanel";

import "./styles.css";

function App() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="App">
      <CollapsePanel
        expanded={expanded}
        onClickHeader={() => setExpanded(prevVal => !prevVal)}
        header={<h1>Hello CodeSandbox</h1>}
        content={<h2>Start editing to see some magic happen!</h2>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
