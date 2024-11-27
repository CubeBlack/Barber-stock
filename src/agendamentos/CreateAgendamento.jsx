import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAgendamento = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const [formData, setFormData] = useState({
    cliente_id: '',
    data: '',
    hora_inicio: '',
    hora_fim: '',
    status: 'Pendente',
    observacoes:''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault(); 

    //Limpar mensagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);

    axios.post('http://localhost:8000/api/agendamentos', formData)
      .then((response) => {
        setSuccessMessage('Agendamento criado com sucesso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/agendamentos');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        const errors = error.response.data.errors; 

        console.error('Erro:', error.response?.data || error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div className="row">
        <div>
          <label htmlFor="">Clliente</label>
          <select 
            name="cliente_id" 
            id="cliente_id" 
            value={formData.cliente_id}
            onChange={handleChange}
            >
              <option value="">Selecione um cliente</option>
              {data.map((item) => (
                <option value={item.id}>{item.id} - {item.nome}</option>  
              ))}
           
          </select>
        </div>
      </div>
      
      <div className="row">
        <div>
          <label htmlFor="">Data</label>
          <input 
            type="date" 
            name="data" 
            id="data"
            value={formData.data}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="">Periodo</label>
          <input 
            type="time" 
            name='hora_inicio' 
            id='hora_inicio' 
            value={formData.hora_inicio}
            onChange={handleChange}
            />
          à
          <input 
            type="time" 
            name='hora_fim' 
            id='hora_fim' 
            value={formData.hora_fim}
            onChange={handleChange}
            />
        </div>
      </div>

      <div className="form-control">
        <div>
          <label htmlFor="">Observação</label>
          <textarea 
            name="observacoes" 
            id="observacoes" 
            rows={6} 
            value={formData.observacoes}
            onChange={handleChange}
            ></textarea>
        </div>
      </div>

      <button className="button is-primary is-large">Salvar</button>

    </form>
  );
};

export default CreateAgendamento;