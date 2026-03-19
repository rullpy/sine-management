import { Contato } from "../models/ContatoModel.js";

export const contatoController = (req, res) => {
  res.render('contato', { contato: {} });
}

export async function contatoControllerRegister(req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => {
        res.redirect('/contato');
      });
      return;
    }
    
    req.flash('sucess', 'Seu contato foi criado com sucesso.')
    req.session.save(() => {
      res.redirect(`/contato/${contato.contato._id}`);
    });
    return;
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
}

export async function editContatoController (req, res) {
  if (!req.params.id) return res.render('404');
  
  const contato = await Contato.buscaPorId(req.params.id);
  
  if (!contato) {
    return res.render('404');
  }
  res.render('contato', { contato });
}

export async function editController(req, res) {
  try {
    if (!req.params.id) return res.render('404');
    
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
    
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      console.log(contato.contato._id)
      req.session.save(() => {
        res.redirect(`/contato/${contato.contato._id}`);
      });
      return;
    }
    req.flash('sucess', 'Seu contato foi alterado com sucesso.')
    req.session.save(() => {
      res.redirect(`/contato/${contato.contato._id}`);
    });
    return;
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
}