import mongoose from "mongoose";

const vagaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: String, required: true },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresas",
    required: true,
  },
  description: { type: String, required: false, default: "" },
  dataEntrevista: { type: String, required: false, default: "" },
  dataCadastro: { type: Date, required: false, default: Date.now },
});

export const VagaModel = mongoose.model("Vagas", vagaSchema);

export class Vagas {
  constructor(body, id) {
    this.id = id;
    this.body = body;
    this.errors = [];
    this.vaga = null;
  }

  static async buscaVagas(empresaId) {
    const vagas = await VagaModel.find({ empresa: empresaId }).sort({
      dateTime: -1,
    });;

    return vagas;
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) return;

    this.vaga = await VagaModel.create({
      nome: this.body.nome,
      quantidade: this.body.quantidade,
      empresa: this.id,
      description: this.body.description,
      dataEntrevista: this.body.entrevista,
    });
  }

  valida() {
    this.cleanUp();
    if (!this.body.nome) {
      this.errors.push("Nome da vaga inválido.");
    }

    if (!this.body.quantidade) {
      this.errors.push("Quantidade de vagas inválido.");
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
  }
}
