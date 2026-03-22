import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }
  
  init() {
    this.events();
  }
  
  events() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    })
  }
  
  validate(e) {
    const el = e.target;
    
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    
    const passwordForm = document.querySelector('.form-password');
    const emailForm = document.querySelector('.form-email');
    
    let error = false;
    
    if (!validator.isEmail(emailInput.value)) {
      emailForm.innerHTML = 'Email inválido.';
      emailForm.classList.add('text-danger', 'mb-3');
      error = true;
    } else {
      emailForm.innerHTML = '';
    }
    
    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      passwordForm.innerHTML = 'A senha precisa ter entre 3 e 50 caracteres.';
      passwordForm.classList.add('text-danger', 'mb-3');
      error = true;
    } else {
      passwordForm.innerHTML = '';
    }
    
    if (!error) el.submit();
  }
}