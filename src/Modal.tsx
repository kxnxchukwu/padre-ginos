import { useEffect, MutableRefObject, useRef, ReactElement } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactElement }) {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRef.current as Node);
    return () => {
      modalRoot.removeChild(elRef.current as Node);
    };
  }, []);
  return createPortal(<div>{children}</div>, elRef.current as HTMLDivElement);
}
