import { Contato } from "../models/ContatoModel.js";

export const contatoController = (req, res) => {
  res.render("contato", { contato: {} });
};

export async function contatoControllerRegister(req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        res.redirect("/contato");
      });
      return;
    }

    req.flash("sucess", "Seu contato foi criado com sucesso.");
    req.session.save(() => {
      res.redirect(`/contato/`);
    });
    return;
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function editContatoController(req, res) {
  if (!req.params.id) return res.render("404");

  const contato = await Contato.buscaPorId(req.params.id);

  if (!contato) return res.render("404");

  res.render("contato", { contato });
}

export async function editController(req, res) {
  try {
    if (!req.params.id) return res.render("404");

    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        res.redirect(`/contato/${req.params.id}`);
      });
      return;
    }

    if (!contato.contato) return res.render("404");

    req.flash("sucess", "Seu contato foi alterado com sucesso.");
    req.session.save(() => {
      res.redirect(`/contato/${contato.contato._id}`);
    });
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
}

export async function deleteContatoController(req, res) {
  try {
    if (!req.params.id) return res.render("404");

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render("404");

    req.flash("sucess", "Contato apagado com sucesso.");
    req.session.save(() => {
      res.redirect("/");
      return;
    });
    return;
  } catch (err) {
    console.log(err);
    res.render("404");
    return;
  }
}
