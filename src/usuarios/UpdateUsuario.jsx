import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUsuario = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });


  useEffect(() => {
    //Limpar mesnagens anteriores
    setSuccessMessage(null);
    setErrorMessage(null);
    setErrorEmail(null);
    setErrorPass(null);
    setErrorName(null);

    axios.get(process.env.VITE_API_URL+'/users/'+id) 
      .then(response => {
        setFormData({
          name: response.data.data.name || '',
          email: response.data.data.email || ''
        });
        setLoading(false); 
        console.error(response.data);
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
    setErrorPass(null);
    setErrorName(null);

    axios.patch('http://localhost:8000/api/users/'+id, formData)
      .then((response) => {
        setSuccessMessage('Usuario atualizado com suceso!');

        console.log('Resposta do servidor:', response.data);
        navigate('/usuarios/'+id);
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

      <Link to={`/usuarios/${id}`} className="button is-small">
          Ver
        </Link>

        <Link to={`/usuarios/${id}/delete`} className="button is-small">
          Apagar
        </Link>

      <button type='submit' className="button is-small">Salvar</button>

    </form>
    
    
  );
};

export default UpdateUsuario;