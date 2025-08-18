import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit?.({ email: fd.get("email"), password: fd.get("password") });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <div className="modal__switch">
          <span>or&nbsp;</span>
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToRegister}
          >
            Sign up
          </button>
        </div>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
    </ModalWithForm>
  );
}
