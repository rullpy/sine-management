import { Login } from "../models/LoginModel.js";

export const loginControllerIndex = (req, res) => {
  if (req.session.user) return res.render('session1');
  return res.render("login");
};

export async function loginControllerRegister(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();
    
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login');
      });
      return;
    }
    req.session.user = login.user;
    
    req.session.save(() => {
      return res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};

export const loginControllerLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}
