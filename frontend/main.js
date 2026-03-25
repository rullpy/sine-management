import './assets/scss/main.scss';
import 'bootstrap';
import '@fontsource/inter';
import '@fontsource/poppins';


import Login from "./modules/Login.js";
import Contato from "./modules/Contato.js";

const login = new Login('.form-login');
const sign = new Login('.form-sign');
const cpf = new Login('.cpf');

const contato = new Contato('.telefone');
const contatoCnpj = new Contato('.cnpj');

cpf.initCpf();
login.init();
sign.init();
contatoCnpj.initccnpj();
contato.init();