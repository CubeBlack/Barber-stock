import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteAgendamento = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);  
  const [errorMessage, setErrorMessage] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 

  const navigate = useNavigate();

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:8000/api/agendamentos/${id}`) 
      .then((response) => {
        setIsLoading(false);
        setSuccessMessage('Agendamento excluído com sucesso!');
        setTimeout(() => navigate('/agendamentos'), 2000);  
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Erro ao tentar excluir o agendamento');
        } else {
          setErrorMessage('Erro de conexão com a API');
        }
      });
  };

  return (
    <div>
      <p>Excluir agendamento {id}.</p>

      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <button onClick={handleDelete} disabled={isLoading} className="button is-small">
        {isLoading ? 'Excluindo...' : 'Excluir agendamento'}
      </button>
    </div>
  );
};

export default DeleteAgendamento;