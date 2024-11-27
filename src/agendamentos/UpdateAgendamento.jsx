import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateAgendamento = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  
  const navigate = useNavigate();
  const [data, setData] = useState([]); 
  const [formData, setFormData] = useState({
    cliente_id: '',
    data: '',
    hora_inicio: '',
    hora_fim: '',
    status: '',
    observacoes:''
  });

  useEffect(() => {
    //Limpar mesnagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);

    //---- Carregar agendamento
    axios.get(process.env.VITE_API_URL+'/agendamentos/'+id) 
      .then(response => {
        
        setFormData({
          cliente_id: response.data.cliente_id || '',
          data: response.data.data || '',
          hora_inicio: response.data.hora_inicio || '',
          hora_fim: response.data.hora_fim || '',
          status: response.data.status || '',
          observacoes: response.data.observacoes || '',
        });
        
        setLoading(false); 
        console.log(response.data);
        
      })
      .catch(error => {
        setErrorMessage('Erro ao buscar dados:', error);
        console.error('Erro ao buscar dados:', error);
        setLoading(false); 
      });
    
    //---------- Carregar clientes --------------
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
    setSuccessMessage(null);
    setErrorMessage(null);


    axios.patch(process.env.VITE_API_URL+'/agendamentos/'+id, formData)
      .then((response) => {
        setSuccessMessage('Usuario atualizado com suceso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/agendamentos/'+id);
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
          <label htmlFor="">Cliente</label>
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

export default UpdateAgendamento;