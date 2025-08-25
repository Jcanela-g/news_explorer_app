import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSubmit,
}) {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", email: "", password: "" });
      setErrors({ name: "", email: "", password: "" });
      setIsValid(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, form, validationMessage, validity } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({
      ...er,
      [name]: validity.valid ? "" : validationMessage,
    }));
    setIsValid(form.checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit?.(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          value={values.email}
          onChange={handleChange}
        />
        <span id="register-email-error" className="modal__error">
          {errors.email}
        </span>
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={4}
          value={values.password}
          onChange={handleChange}
        />
        <span id="register-password-error" className="modal__error">
          {errors.password}
        </span>
      </label>
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          minLength={2}
          maxLength={30}
          value={values.name}
          onChange={handleChange}
        />
        <span id="register-name-error" className="modal__error">
          {errors.name}
        </span>
      </label>
    </ModalWithForm>
  );
}
