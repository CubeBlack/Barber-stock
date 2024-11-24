import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

const CreateAgendamento = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(process.env.VITE_API_URL+'/clientes') 
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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    try {
      if (itemToUpdate) {
        updateItem(itemToUpdate.id, item);
        alert("Item atualizado com sucesso!");
      } else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        alert("Item cadastrado com sucesso!");
      }
    } catch (err) {
      console.log(err.message);
      alert("Ocorreu um erro.");
    } finally {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="">Clliente</label>
          <select name="" id="">
          
          {data.map((item) => (
            <option value={item.id}>{item.id} - {item.nome}</option>  
          ))}
           
          </select>
        </div>
      </div>
      <div className="row">
        <div>
          <label htmlFor="">Data</label>
          <input type="date" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Periodo</label>
          <input type="time" />
          à
          <input type="time" />
        </div>
      </div>
      <div className="form-control">
        <div>
          <label htmlFor="">Observação</label>
          <textarea name="" id="" rows={6}></textarea>
        </div>
      </div>

      <button className="button is-primary is-large">Salvar</button>

    </form>
  );
};

export default CreateAgendamento;