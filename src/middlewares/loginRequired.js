export default function loginRequired(req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa estar logado para acessar essa página.');
    req.session.save(() => {
      res.redirect('/');
    });
    return;
  }
  next();
}