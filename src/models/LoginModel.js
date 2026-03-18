import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const LoginModel = mongoose.model("Login", LoginSchema);

export class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida(); 
    this.user = await LoginModel.findOne({ email: this.body.email });
    
    if (!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }
    
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida.');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (this.user) {
      this.errors.push("Usuário já existe.");
    }
  }

  valida() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido!");
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres!");
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
