export default function csrf(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); //Passa o token para todos arquivos EJS sem precisar passar manualmente em cada um
  next(); 
};