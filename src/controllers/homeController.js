export const paginaInicial = (req, res) => {
  res.render("index");
  return;
};

export const postPage = (req, res) => {
  res.send("SOU O POST");
  return;
};
