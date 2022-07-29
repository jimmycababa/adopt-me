import { doc } from "prettier";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// this is what we are going to render into
const modalRoot = document.getElementById("modal");

// useRef is a container for state that you want to survive past render cycles. in this case, we just want one div and not have to re-render every time.
const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  // whenever this modal gets created, insert it into the dom and when you are done remove from the dom. this prevents memory leaks
  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
