import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSubmit,
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setErrors({ email: "", password: "" });
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
    onSubmit?.({ email: values.email, password: values.password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          value={values.email}
          onChange={handleChange}
        />
        <span id="login-email-error" className="modal__error">
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
        <span id="login-password-error" className="modal__error">
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  );
}
