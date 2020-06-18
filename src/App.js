import React, {useEffect, useState} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const response = await api.post('repositories',repository);
    setRepositories([
      ...repositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const getDifferentRepositoryId = repository => repository.id !== id;
      const filteredRepositories = repositories.filter(getDifferentRepositoryId);
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>    
            </li>
          );
        })
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
