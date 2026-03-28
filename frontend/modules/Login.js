import validator from "validator";
import IMask from "imask";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  initCpf() {
    if (!this.form) return;

    this.form.addEventListener("keydown", (e) => {
      this.cpfFormater();
      this.numberValidator(e);
    });
  }

  cpfFormater() {
    IMask(this.form, {
      mask: "000.000.000-00",
    });
  }

  numberValidator(e) {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;

    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    const passwordForm = document.querySelector(".form-password");
    const emailForm = document.querySelector(".form-email");

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      emailForm.innerHTML = "Email inválido.";
      emailForm.classList.add("text-danger", "mb-3");
      error = true;
    } else {
      emailForm.innerHTML = "";
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      passwordForm.innerHTML = "A senha precisa ter entre 3 e 50 caracteres.";
      passwordForm.classList.add("text-danger", "mb-3");
      error = true;
    } else {
      passwordForm.innerHTML = "";
    }

    if (!error) el.submit();
  }
}
