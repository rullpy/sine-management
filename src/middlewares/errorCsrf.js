export default function errorCsrf(err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN" || err.message.includes("CSRF")) {
    return res.status(403).render("404");
  }
  return next(err);
}