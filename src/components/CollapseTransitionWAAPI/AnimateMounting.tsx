import React from "react";

const supportsWAAPI = "animate" in document.body;

type Props = {
  show: boolean;
  children: React.ReactNode;
  animate(args: { el: HTMLDivElement }): () => Animation;
};

export function AnimateMounting({ show, children, animate }: Props) {
  const elRef = React.useRef<HTMLDivElement>(null);
  const animateCallback = React.useRef(animate);

  const [status, setStatus] = React.useState<"entering" | "exited">(
    show ? "entering" : "exited"
  );

  React.useLayoutEffect(() => {
    const el = elRef.current;

    if (!el || !supportsWAAPI || status === "exited") {
      return;
    }

    if (show) {
      const animateExit = animateCallback.current({ el });

      return () => {
        const exitAnimation = animateExit();
        exitAnimation.onfinish = () => {
          console.log("finish exit anmation");

          setStatus("exited");
        };
      };
    }
  }, [show, status]);

  React.useEffect(() => {
    if (supportsWAAPI && status === "exited" && show) {
      setStatus("entering");
    }
  }, [show, status]);

  if ((supportsWAAPI && status === "exited") || (!supportsWAAPI && !show)) {
    return null;
  }

  return (
    <div ref={elRef} style={{ overflow: "hidden " }}>
      {children}
    </div>
  );
}
