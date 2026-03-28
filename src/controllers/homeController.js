import { Contato } from "../models/ContatoModel.js";

export async function homePageIndex(req, res) {
  const contatos = await Contato.buscaContatos();
  res.render("index", { contatos });
  return;
}
