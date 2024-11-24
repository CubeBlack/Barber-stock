import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUsuario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });


  const [errorMessage, setErrorMessage] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);

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
    setErrorPass(null);
    setErrorName(null);

    axios.post('http://localhost:8000/api/users', formData)
      .then((response) => {
        setSuccessMessage('Usuário criado com sucesso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/usuarios');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        const errors = error.response.data.errors; 
               
        setErrorEmail(errors.email ? errors.email.join('; ') : '');
        setErrorPass(errors.password ? errors.password.join('; ') : '');
        setErrorName(errors.name ? errors.name.join('; ') : '');

        console.error('Erro:', error.response?.data || error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

     
      <div className="form-control">
        <label htmlFor="">Nome:</label>
        {errorName && <p style={{ color: 'red' }}>{errorName}</p>}
        <input 
          type="text" 
          name="name" 
          value={formData.name}
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
          <label>Senha:</label>
          {errorPass && <p style={{ color: 'red' }}>{errorPass}</p>}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
      </div>

      <button type='submit' className="button is-small">Salvar</button>

    </form>
  );
};

export default CreateUsuario;