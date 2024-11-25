import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCliente = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorEndereco, setErrorEndereco] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email:'',
    endereco:''
  });

  useEffect(() => {
    //Limpar mesnagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);
    setErrorEmail(null);
    setErrorEndereco(null);
    setErrorNome(null);
    setErrorTelefone(null)

    axios.get(process.env.VITE_API_URL+'/clientes/'+id) 
      .then(response => {
        
        setFormData({
          nome: response.data.nome || '',
          email: response.data.email || '',
          telefone: response.data.telefone || '',
          endereco: response.data.endereco || '',
        });
        
        setLoading(false); 
        console.log(response.data);
        
      })
      .catch(error => {
        setErrorMessage('Erro ao buscar dados:', error);
        console.error('Erro ao buscar dados:', error);
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <div>Carregando...</div>; 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 

    //Limpar mesnagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);
    setErrorEmail(null);
    setErrorEndereco(null);
    setErrorNome(null);
    setErrorTelefone(null)

    axios.patch(process.env.VITE_API_URL+'/clientes/'+id, formData)
      .then((response) => {
        setSuccessMessage('Usuario atualizado com suceso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/clientes/'+id);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        const errors = error.response.data.errors; 
               
        //setErrorEmail(errors.email ? errors.email.join('; ') : '');
        //setErrorPass(errors.password ? errors.password.join('; ') : '');
        //setErrorName(errors.name ? errors.name.join('; ') : '');

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

     
      <div className="form-control">
        <label htmlFor="">Nome:</label>
        {errorNome && <p style={{ color: 'red' }}>{errorNome}</p>}
        <input 
          type="text" 
          name="nome" 
          value={formData.nome}
          onChange={handleChange}
          required/>
      </div>

      <div className="form-control">
        <label>Email:</label>
        {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control">
          <label>Telefone:</label>
          {errorTelefone && <p style={{ color: 'red' }}>{errorTelefone}</p>}
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
      </div>

      <div className="form-control">
          <label>Endereço:</label>
          {errorEndereco && <p style={{ color: 'red' }}>{errorEndereco}</p>}
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
      </div>

      <Link to={`/clientes/${id}`} className="button is-small">
          Ver
        </Link>

        <Link to={`/clientes/${id}/delete`} className="button is-small">
          Apagar
        </Link>

      <button type='submit' className="button is-small">Salvar</button>

    </form>
    
    
  );
};

export default UpdateCliente;