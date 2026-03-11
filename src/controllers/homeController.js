export const paginaInicial = (req, res) => {
  res.render("index");
};

export const postPage = (req, res) => {
  res.send("SOU O POST");
};
