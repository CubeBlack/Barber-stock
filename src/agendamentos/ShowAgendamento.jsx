import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ShowAgendamento = () => {
  const { id } = useParams();

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Buscando os dados da API
    axios.get(process.env.VITE_API_URL+'/agendamentos/'+id) 
      .then(response => {
        setData(response.data); 
        setLoading(false); 
        console.error(data);
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
    
    <div>
      <div className="row">
        <div>
          <div>
            <label htmlFor="">ID: </label>
            <span>{data.id}</span>
          </div>

          <div>
            <label htmlFor="">Data: </label>
            <span>{data.data}</span>
          </div>

          <div>
            <label htmlFor="">Hora: </label>
            <span>{data.hora_inicio}</span>
            <span> à </span>  
            <span>{data.hora_fim}</span>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="">Cliente: {data.cliente.id} - {data.cliente.nome}</label>
          </div>

          <div>
            <label htmlFor="">Telefone: {data.cliente.telefone}</label>
          </div>

          <div>
            <label htmlFor="">Email: {data.cliente.email}</label>
          </div>

          
          <div>
            <label htmlFor="">Endereço: {data.cliente.endereco}</label>
          </div>

        </div>

      </div>

      
      <div>
      
        <Link to={`/clientes/${data.id}/update`} className="button is-small">
          Atualizar
        </Link>

        <Link to={`/clientes/${data.id}/delete`} className="button is-small">
          Apagar
        </Link>

        <Link to={`/clientes/${data.cliente.id}`} className="button is-small">
          Cliente
        </Link>
      </div>

    </div>


  );
};

export default ShowAgendamento;