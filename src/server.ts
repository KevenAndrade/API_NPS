import express from 'express';

const app=express();

/* *
* 
* GET => Buscar
* POST => Salvar
* PUT => Alterar
* DELETE => dhumm
* 
 */

app.get("/", (req, res) => {

  return res.json({message:"Hello"});
});

app.post("/", (req, res) => {

  return res.json({message:"Recebido"});
});

app.listen(3333,()=> console.log("Server up!"));