import { Login } from "../models/LoginModel.js";

export const signControllerIndex = (req, res) => {
  if (req.session.user) return res.render('session2');
  return res.render("sign");
};

export async function signControllerRegister (req, res){
  try {
    const login = new Login(req.body);
    await login.register();
    
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/sign-up');
      });
      return;
    }
    req.flash('sucess', 'Seu usuário foi criado com sucesso.');
    req.session.save(() => {
      return res.redirect('/sign-up');
    });
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};