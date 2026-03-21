import mongoose from "mongoose";
import validator from "validator";

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  dateTime: { type: Date, required: false, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
});

export const ContatoModel = mongoose.model("Contato", ContatoSchema);

export class Contato {
  constructor(body, user) {
    this.user = user;
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  static async buscaPorId(id, userId) {
    if (typeof id !== "string") return;

    const contato = await ContatoModel.findOne({
      _id: id,
      user: userId,
    });

    return contato;
  }

  static async buscaContatos(userId) {
    const contatos = await ContatoModel.find({ user: userId }).sort({
      dateTime: -1,
    });
    return contatos;
  }

  static async delete(id, userId) {
    if (typeof id !== "string") return;
  
    return await ContatoModel.findOneAndDelete({
      _id: id,
      user: userId
    });
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create({
      name: this.body.name,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
      user: this.user,
    });
  }

  valida() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido!");
    }

    if (!this.body.name) this.errors.push("Nome é obrigatório.");

    if (!this.body.email && !this.body.telefone) {
      this.errors.push("O contato precisa ter e-mail ou telefone.");
    }
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
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
