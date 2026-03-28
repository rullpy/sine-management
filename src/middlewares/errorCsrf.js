export default function errorCsrf(err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN" || err.message.includes("CSRF")) {
    console.log("CSRF ERRO:", err);
    return res.status(403).render("404");
  }
  return next(err);
}
