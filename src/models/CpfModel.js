import mongoose from "mongoose";

const cpfAllowedSchema = new mongoose.Schema({
  cpf: { type: String, required: true, unique: true }
});

export const AllowedCpf = mongoose.model("AllowedCpf", cpfAllowedSchema);

export class Cpf {
  constructor(cpf) {
    this.cpf = cpf;
    this.errors = [];
  }
  
  async checkCpf() {
    const cpfExists = await AllowedCpf.findOne({ cpf: this.cpf });
    
    if (!cpfExists) {
      this.errors.push("CPF NÃO AUTORIZADO!"); 
    }
  }
}