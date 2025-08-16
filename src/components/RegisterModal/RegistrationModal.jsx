import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSuccess,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email");
    const name = fd.get("name") || "User";
    // fake success; name can come later from backend
    onSuccess?.({ name, email });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <div className="modal__switch">
          <span>or&nbsp;</span>
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToLogin}
          >
            Sign in
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
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
      </label>
    </ModalWithForm>
  );
}
