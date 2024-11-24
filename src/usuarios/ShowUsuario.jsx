import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ShowUsuario = () => {
  const { id } = useParams();

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Buscando os dados da API
    axios.get(process.env.VITE_API_URL+'/users/'+id) 
      .then(response => {
        setData(response.data.data); 
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
      <h2>{data.name}</h2>
      <div>
        <label htmlFor="">ID: </label>
        <span>{data.id}</span>
      </div>

      <div>
        <label htmlFor="">Email: </label>
        <span>{data.id}</span>
      </div>
      
      <div>
      
        <Link to={`/usuarios/${data.id}/update`} className="button is-small">
          Atualizar
        </Link>

        <Link to={`/usuarios/${data.id}/delete`} className="button is-small">
          Apagar
        </Link>
      </div>

    </div>


  );
};

export default ShowUsuario;