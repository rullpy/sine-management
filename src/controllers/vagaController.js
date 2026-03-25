import { Vagas } from "../models/vagaModel.js";

export async function vagasController(req, res) {
  res.render("vagas", {
    vagas: {},
    contatoId: req.params.id,
  });
  return;
}

export async function vagasCriarController(req, res) {
  try {
    const vagas = new Vagas(req.body, req.params.id);
    await vagas.register();

    if (vagas.errors.length > 0) {
      req.flash("errors", vagas.errors);
      req.session.save(() => {
        res.redirect(`/contato/cria-vaga/${req.params.id}`);
      });
    }

    req.flash("sucess", "Sua vaga foi cadastrada com sucesso!");
    req.session.save(() => {
      res.redirect(`/contato/cria-vaga/${req.params.id}`);
    });    
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function vagasListaController(req, res) {
  try {
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}
