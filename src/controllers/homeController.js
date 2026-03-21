import { Contato } from "../models/ContatoModel.js";

export async function homePageIndex(req, res) {
  if (!req.session.user) {
    return res.render("index", { contatos: [] });
  }
  
  const contatos = await Contato.buscaContatos(req.session.user._id);
  
  res.render("index", { contatos });
  return;
};
