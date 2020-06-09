import * as React from "react";
import { render } from "react-dom";

import "./styles.scss";

function App() {
  return (
    <main>
      <h1>CollapsePanel</h1>

      <p>
        Here you will find two different implementations of a "
        <code>CollapsePanel</code>" component, one leveraging classic CSS
        Transitions with <code>react-transition-group</code>, and another one
        leveraging the Web Animations API
      </p>

      <p>
        Open a file in the pages directory within CodeSandbox at{" "}
        <a href="https://codesandbox.io/s/github/reyronald/collapse-panel">
          https://codesandbox.io/s/github/reyronald/collapse-panel
        </a>{" "}
        and then toggle the "Current Module View" in the upper-right of the
        browser preview.
      </p>
    </main>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
