import { useEffect, useId } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  footer,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const titleId = useId();

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="modal modal_open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className="modal__content" onClick={stop}>
        <h2 id={titleId} className="modal__title">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
          aria-label="Close"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {footer && <div className="modal__footer">{footer}</div>}
        </form>
      </div>
    </div>
  );
}
