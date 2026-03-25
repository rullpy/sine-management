import mongoose from "mongoose";
import validator from "validator";

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  description: { type: String, required: false, default: "" },
  dateTime: { type: Date, required: false, default: Date.now },
});

export const ContatoModel = mongoose.model("Empresas", ContatoSchema);

export class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  static async buscaPorId(id) {
    if (typeof id !== "string") return;

    const contato = await ContatoModel.findOne({ _id: id });

    return contato;
  }

  static async buscaContatos() {
    const contatos = await ContatoModel.find().sort({ dateTime: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== "string") return;

    return await ContatoModel.findOneAndDelete({ _id: id });
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create({
      nome: this.body.nome,
      cnpj: this.body.cnpj,
      email: this.body.email,
      telefone: this.body.telefone,
      description: this.body.description,
    });
  }

  valida() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido!");
    }

    if (!this.body.nome) this.errors.push("Nome é obrigatório.");

    if (!this.body.cnpj) this.errors.push("CNPJ é obrigatório.");

    if (!this.body.email && !this.body.telefone) {
      this.errors.push("O contato precisa ter e-mail ou telefone.");
    }
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.findOneAndUpdate({ _id: id }, this.body, {
      returnDocument: "after",
    });
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
  }
}
