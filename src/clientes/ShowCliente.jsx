import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ShowCliente = () => {
  const { id } = useParams();

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Buscando os dados da API
    axios.get(process.env.VITE_API_URL+'/clientes/'+id) 
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
      <h2>{data.nome}</h2>
      <div>
        <label htmlFor="">ID: </label>
        <span>{data.id}</span>
      </div>

      <div>
        <label htmlFor="">Email: </label>
        <span>{data.email}</span>
      </div>

      <div>
        <label htmlFor="">Telefone: </label>
        <span>{data.telefone}</span>
      </div>

      <div>
        <label htmlFor="">Endereco: </label>
        <span>{data.endereco}</span>
      </div>
      
      <div>
      
        <Link to={`/clientes/${data.id}/update`} className="button is-small">
          Atualizar
        </Link>

        <Link to={`/clientes/${data.id}/delete`} className="button is-small">
          Apagar
        </Link>
      </div>

    </div>


  );
};

export default ShowCliente;