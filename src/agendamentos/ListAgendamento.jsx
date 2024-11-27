import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ListAgendamento = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Buscando os dados da API
    axios.get(process.env.VITE_API_URL+'/agendamentos') 
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
          <th>Data</th>
          <th>Horario</th>
          <th>Cliente</th>
          <th>Obs.</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.data}</td>
            <td>{item.hora_inicio} à {item.hora_fim}</td>
            <td>{(item.cliente).id} - {(item.cliente).nome}</td>
            <td>{item.observacoes}</td>
            <td>              
              <Link
                to={`/agendamentos/${item.id}`}
                className="button is-small"
              >
                Ver
              </Link>
              
              <Link to={`/agendamentos/${item.id}/update`} className="button is-small">
                Atualizar
              </Link>

              <Link to={`/agendamentos/${item.id}/delete`} className="button is-small">
                Apagar
              </Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListAgendamento;