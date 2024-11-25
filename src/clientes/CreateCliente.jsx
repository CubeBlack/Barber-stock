import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });


  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorEndereco, setErrorEndereco] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    //Limpar mesnagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);
    setErrorEmail(null);
    setErrorEndereco(null);
    setErrorNome(null);
    setErrorTelefone(null)

    axios.post('http://localhost:8000/api/clientes', formData)
      .then((response) => {
        setSuccessMessage('Cliente criado com sucesso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/clientes');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        const errors = error.response.data.errors; 
               
        setErrorEmail(errors.email ? errors.email.join('; ') : '');
        setErrorNome(errors.password ? errors.nome.join('; ') : '');
        setErrorTelefone(errors.telefone ? errors.telefone.join('; ') : '');
        setErrorEndereco(errors.endereco ? errors.endereco.join('; ') : '');

        console.error('Erro:', error.response?.data || error.message);
      });
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

      <button type='submit' className="button is-small">Salvar</button>

    </form>
  );
};

export default CreateCliente;