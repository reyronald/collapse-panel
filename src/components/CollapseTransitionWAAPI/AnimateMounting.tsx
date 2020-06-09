import React from "react";

export type Props = {
  show: boolean;
  children: React.ReactNode;
  animate(args: { el: HTMLDivElement; show: boolean }): Animation;
};

export function AnimateMounting({ show, children, animate }: Props) {
  const elRef = React.useRef<HTMLDivElement>(null);
  const animateCallback = React.useRef(animate);

  const [status, setStatus] = React.useState<"entering" | "exited">(
    show ? "entering" : "exited"
  );

  const supportsWAAPI = "animate" in document.body;

  React.useLayoutEffect(() => {
    const el = elRef.current;

    if (!el || !supportsWAAPI || status === "exited") {
      return;
    }

    const animation = animateCallback.current({ el, show });

    if (!show) {
      animation.onfinish = () => {
        setStatus("exited");
      };
    }

    return () => {
      if (!show) {
        animation.cancel();
      }
    };
  }, [supportsWAAPI, show, status]);

  React.useEffect(() => {
    if (supportsWAAPI && status === "exited" && show) {
      setStatus("entering");
    }
  }, [supportsWAAPI, show, status]);

  if ((supportsWAAPI && status === "exited") || (!supportsWAAPI && !show)) {
    return null;
  }

  return (
    <div ref={elRef} style={{ overflow: "hidden " }}>
      {children}
    </div>
  );
}
