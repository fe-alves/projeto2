const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const pokedex = [{ numero: 1, nome: "Bulbasaur", tipo: "Grama", imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", descricao: "Há uma semente de planta em suas costas desde o dia em que o Pokémon nasceu. A semente cresce lentamente.", altura: 0.7, peso: 6.9, categoria: "Semente", habilidade: "Overgrow"}, { numero: 2, nome: "Charmander", tipo: "Fogo", imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png", descricao: "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta da cauda.", altura: 0.6, peso: 8.5, categoria: "Lagarto", habilidade: "Chama"}, { numero: 3, nome: "Squirtle", tipo: "Água", imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png", descricao: "Quando ele retrai seu longo pescoço em sua concha, ele esguicha água com força vigorosa.", altura: 0.5, peso: 9.0, categoria: "Tartaruga", habilidade: "Torrente"}];

app.get("/", (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  res.render("../views/index", {bicho: pokedex, message});
});

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});  

app.post("/new", (req, res) => {
  const bicho = req.body;
  pokedex.push(bicho);
  message = "Pokémon cadastrado!";
  res.redirect("/");
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id;
  const bicho = pokedex[id];
  res.render("../views/detalhes", {bicho});
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));