import mongoose from "mongoose";
import validator from "validator";

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  dateTime: { type: Date, required: false, default: Date.now }
});

export const ContatoModel = mongoose.model("Contato", ContatoSchema);

export class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }
  
  static async buscaPorId(id) {
    if (typeof id !== "string") return;
    
    const user = await ContatoModel.findById(id);
    return user;
  }
  
  async register() {
    this.valida();
    
    if (this.errors.length > 0) return;
    
    this.contato = await ContatoModel.create(this.body);
  }
  
  valida() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido!");
    }
    
    if (!this.body.name) this.errors.push('Nome é obrigatório.');
    
    if (!this.body.email && !this.body.telefone) {
      this.errors.push('O contato precisa ter e-mail ou telefone.')
    }
  }
  
  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();
    
    if (this.errors.length > 0) return;
    
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    
    this.body = {
      name: this.body.name,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone
    };
    
  }
}