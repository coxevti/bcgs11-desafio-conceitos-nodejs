const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  repositories.push({ id: uuid(), title, url, techs, likes: 0 });
  return response.status(201).json(repositories[repositories.length - 1]);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repository = repositories.find(item => item.id === id);
  if(!repository){
    return response.status(400).json({message: 'Repository not found'});
  }
  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(item => item.id === id)
  if(repositoryIndex !== -1){
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }else {
    return response.status(400).json({message: 'Repository not found!'});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const repository = repositories.find(item => item.id === id);
  if(!repository){
    return response.status(400).json({message: 'Repository not found'});
  }
  repository.likes += 1;
  return response.json(repository);
});

module.exports = app;
