import * as React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import CollapsePanel from "./CollapsePanel";

describe("CollapsePanel", () => {
  afterEach(cleanup);

  it("should render as expected when expanded=true", () => {
    const onClickHeader = jest.fn();
    const { container, getByLabelText, getByTestId, getByText } = render(
      <CollapsePanel
        expanded={true}
        onClickHeader={onClickHeader}
        header={<h1>Header Node</h1>}
        content={<p>Content Node</p>}
      />
    );

    expect(container.textContent).toContain("Header Node");
    expect(
      getByLabelText("Toggle section contents").getAttribute("aria-expanded")
    ).toEqual("true");
    expect(container.textContent).toContain("Content Node");
    expect(getByTestId("collapsible").getAttribute("aria-expanded")).toEqual(
      "true"
    );

    expect(onClickHeader).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText("Header Node"));
    expect(onClickHeader).toHaveBeenCalledTimes(1);
  });

  it("should render as expected when expanded=false", () => {
    const onClickHeader = jest.fn();
    const { container, getByLabelText, queryByTestId } = render(
      <CollapsePanel
        expanded={false}
        onClickHeader={onClickHeader}
        header={<h1>Header Node</h1>}
        content={<p>Content Node</p>}
      />
    );

    expect(container.textContent).toContain("Header Node");
    expect(
      getByLabelText("Toggle section contents").getAttribute("aria-expanded")
    ).toEqual("false");
    expect(container.textContent).not.toContain("Content Node");
    expect(queryByTestId("collapsible")).toEqual(null);
  });
});
