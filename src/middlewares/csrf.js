export default function csrf(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); 
  next(); 
};