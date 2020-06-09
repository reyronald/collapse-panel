import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

import { AnimateMounting, Props } from "./AnimateMounting";

describe("AnimateMounting", () => {
  const originalAnimate = document.body.animate;

  afterEach(() => {
    document.body.animate = originalAnimate;
  });

  const simulateWAAPIsupport = () => {
    document.body.animate = (
      keyframes: ReadonlyArray<Keyframe> | PropertyIndexedKeyframes | null,
      options?: number | KeyframeAnimationOptions | undefined
    ) => new Animation();
  };

  it("should not render if show={false} when there is no WAAPI support", () => {
    delete document.body.animate;

    const cancel = jest.fn();
    const animation = {
      cancel,
      onfinish(): void {
        /* empty */
      }
    };
    const animate = (jest.fn(() => animation) as any) as Props["animate"];

    render(
      <AnimateMounting
        show={false}
        animate={animate}
        children={<h1>Hello!</h1>}
      />
    );

    expect(animate).toHaveBeenCalledTimes(0);
    expect(cancel).toHaveBeenCalledTimes(0);
    expect(document.body.textContent).toBe("");
  });

  it("should render if show={true} when there is no WAAPI support", () => {
    delete document.body.animate;

    const cancel = jest.fn();
    const animation = {
      cancel,
      onfinish(): void {
        /* empty */
      }
    };
    const animate = (jest.fn(() => animation) as any) as Props["animate"];

    render(
      <AnimateMounting
        show={true}
        animate={animate}
        children={<h1>Hello!</h1>}
      />
    );

    expect(animate).toHaveBeenCalledTimes(0);
    expect(cancel).toHaveBeenCalledTimes(0);
    expect(document.body.textContent).toContain("Hello!");
  });

  it("should not render if show={false} when there is WAAPI support", () => {
    simulateWAAPIsupport();

    const cancel = jest.fn();
    const animation = {
      cancel,
      onfinish(): void {
        /* empty */
      }
    };
    const animate = (jest.fn(() => animation) as any) as Props["animate"];

    render(
      <AnimateMounting
        show={false}
        animate={animate}
        children={<h1>Hello!</h1>}
      />
    );

    expect(animate).toHaveBeenCalledTimes(0);
    expect(cancel).toHaveBeenCalledTimes(0);
    expect(document.body.textContent).toBe("");
  });

  it("should animate as expected when there is WAAPI support", () => {
    simulateWAAPIsupport();

    const cancel = jest.fn();
    const animation = {
      cancel,
      onfinish(): void {
        /* empty */
      }
    };
    const animate = (jest.fn(() => animation) as any) as Props["animate"];

    const { rerender } = render(
      <AnimateMounting
        show={true}
        animate={animate}
        children={<h1>Hello!</h1>}
      />
    );

    expect(animate).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledTimes(0);
    expect(document.body.textContent).toContain("Hello!");

    rerender(
      <AnimateMounting
        show={false}
        animate={animate}
        children={<h1>Hello!</h1>}
      />
    );

    expect(animate).toHaveBeenCalledTimes(2);
    expect(cancel).toHaveBeenCalledTimes(0);
    expect(document.body.textContent).toContain("Hello!");

    act(() => {
      animation.onfinish();
    });

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(document.body.textContent).toBe("");
  });
});
