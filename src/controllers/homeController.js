import { HomeModel } from "../models/HomeModel.js";

HomeModel.create({
  titulo: "Um titulo de teste",
  descricao: "Uma descricao de teste",
});

export const paginaInicial = (req, res) => {
  res.render("index");
  return;
};

export const postPage = (req, res) => {
  res.send("SOU O POST");
  return;
};
