import React from "react";
import ReactDOM from "react-dom";

export function useTransitionate() {
  type PortalEntry = { key: string; element: HTMLDivElement; children: React.ReactNode; expired: boolean };
  const duration = 0.3;
  const [portals, setPortals] = React.useState<Array<PortalEntry>>([]);
  const containerElementRef = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    if (containerElementRef.current) {
      const containerElement = containerElementRef.current;
      containerElement.style.position = "relative";
      containerElement.style.width = "100%";
      containerElement.style.height = "100%";
      containerElement.style.overflow = "hidden";
    }
  }, []);
  const lastPortalEntryRef = React.useRef<PortalEntry | null>(null);
  const next = React.useCallback((enterFrom: keyof typeof transformMap, children: React.ReactNode) => {
    if (containerElementRef.current) {
      const containerElement = containerElementRef.current;
      const enteringElement = document.createElement("div");
      enteringElement.style.position = "absolute";
      enteringElement.style.width = "100%";
      enteringElement.style.height = "100%";
      enteringElement.style.transform = transformMap[enterFrom].entering;
      enteringElement.style.transition = `transform ${duration}s ease-in-out`;
      enteringElement.style.pointerEvents = "none";
      enteringElement.style.userSelect = "none";
      enteringElement.style.overflow = "hidden";
      setTimeout(() => {
        enteringElement.style.transform = "translate(0%, 0%)";
      }, 0);
      setTimeout(() => {
        enteringElement.style.pointerEvents = "auto";
        enteringElement.style.userSelect = "auto";
      }, duration * 1000);
      containerElement.appendChild(enteringElement);
      if (lastPortalEntryRef.current) {
        const lastPortalEntry = lastPortalEntryRef.current;
        const exitingElement = lastPortalEntry.element;
        exitingElement.style.pointerEvents = "none";
        exitingElement.style.userSelect = "none";
        exitingElement.style.transition = `transform ${duration}s ease-in-out`;
        exitingElement.style.transform = transformMap[enterFrom].leaving;
        setTimeout(() => {
          if (Array.prototype.includes.call(containerElement.children, exitingElement)) {
            containerElement.removeChild(exitingElement);
            lastPortalEntry.expired = true;
          }
        }, duration * 1000);
      }
      const portalEntry: PortalEntry = {
        key: Math.random().toString(),
        element: enteringElement,
        children,
        expired: false,
      };
      lastPortalEntryRef.current = portalEntry;
      setPortals((portals) => [...portals.filter(({ expired }) => !expired), portalEntry]);
    }
  }, []);
  return [
    <React.Fragment>
      <div ref={containerElementRef} />
      {portals.map(({ key, element, children }) => ReactDOM.createPortal(children, element, key))}
    </React.Fragment>,
    next,
  ] as const;
}

const transformMap = {
  left: {
    leaving: "translate(100%, 0%)",
    entering: "translate(-100%, 0%)",
  },
  right: {
    leaving: "translate(-100%, 0%)",
    entering: "translate(100%, 0%)",
  },
  bottom: {
    leaving: "translate(0%, -100%)",
    entering: "translate(0%, 100%)",
  },
  stay: {
    leaving: "translate(0%, 0%)",
    entering: "translate(0%, 0%)",
  },
} as const;
