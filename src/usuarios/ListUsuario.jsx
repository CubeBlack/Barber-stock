import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ListUsuario = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Buscando os dados da API
    axios.get(process.env.VITE_API_URL+'/users') 
      .then(response => {
        setData(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              <Link
                to={`/usuarios/${item.id}`}
                className="button is-small"
              >
                Ver
              </Link>
              
              <Link to={`/usuarios/${item.id}/update`} className="button is-small">
                Atualizar
              </Link>

              <Link to={`/usuarios/${item.id}/delete`} className="button is-small">
                Apagar
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListUsuario;