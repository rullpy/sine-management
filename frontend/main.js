import 'bootstrap';
import './assets/scss/main.scss';

import Login from "./modules/Login.js";

const login = new Login('.form-login');
const sign = new Login('.form-sign');
login.init();
sign.init();