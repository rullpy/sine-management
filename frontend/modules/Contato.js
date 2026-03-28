import IMask from "imask";

export default class Contato {
  constructor(input) {
    this.input = document.querySelector(input);
  }

  init() {
    if (!this.input) return;

    this.input.addEventListener("keydown", (e) => {
      this.inputNumberFormat();
      this.numberValidator(e);
    });
  }

  initccnpj() {
    if (!this.input) return;

    this.input.addEventListener("keydown", (e) => {
      this.cnpjFormater();
      this.numberValidator(e);
    });
  }

  cnpjFormater() {
    IMask(this.input, {
      mask: "00.000.000/0000-00",
    });
  }

  inputNumberFormat() {
    IMask(this.input, {
      mask: "(00) 0 0000-0000",
    });
  }

  numberValidator(e) {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  }
}
