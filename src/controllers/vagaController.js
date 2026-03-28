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
      return;
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
    if (!req.params.id) return res.render("404");

    const vagas = await Vagas.buscaVagas(req.params.id);

    res.render("list-vagas", { vagas, contatoId: req.params.id });
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function editVagaController(req, res) {
  try {
    if (!req.params.vagaId) return res.render("404");

    const vagas = await Vagas.buscaPorId(req.params.vagaId);

    if (!vagas) return res.render("404");

    res.render("vagas", { vagas, contatoId: null, empresaId: req.params.empresaId });
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function editVagaPostController(req, res) {
  try {
    const vagas = new Vagas(req.body);
    await vagas.edit(req.params.vagaId);

    if (vagas.errors.length > 0) {
      req.flash("errors", vagas.errors);
      req.session.save(() => {
        res.redirect(`/contato/${req.params.empresaId}/vaga/${req.params.vagaId}`);
      });
      return;
    }

    if (!vagas.vaga) return res.render("404");

    req.flash("sucess", "Vaga alterada com sucesso");
    req.session.save(() => {
      res.redirect(`/contato/${req.params.empresaId}/vaga/${vagas.vaga._id}`);
    });
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function deleteVagaController(req, res) {
  try {
    if (!req.params.vagaId) return res.render("404");

    const vagaDelete = await Vagas.delete(req.params.vagaId);
    if (!vagaDelete) return res.render("404");

    req.session.save(() => {
      res.redirect(`/contato/list-vagas/${req.params.empresaId}`)
    })
    return;
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}
