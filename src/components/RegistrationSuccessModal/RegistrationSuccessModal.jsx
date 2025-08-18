export default function RegistrationSuccessModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}) {
  if (!isOpen) return null;
  const stop = (e) => e.stopPropagation();

  return (
    <div className="modal modal_open" onClick={onClose}>
      <div className="modal__content" onClick={stop}>
        <button className="modal__close" aria-label="Close" onClick={onClose} />
        <h2 className="modal__title modal__title_success">
          Registration successfully completed!
        </h2>
        <button
          type="button"
          className="modal__link modal__link_success"
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
