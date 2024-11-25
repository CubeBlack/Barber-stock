import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCliente = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);  // Para mostrar um carregando durante a requisição
  const [errorMessage, setErrorMessage] = useState(null); // Para exibir mensagens de erro
  const [successMessage, setSuccessMessage] = useState(null); // Para exibir mensagens de sucesso

  const navigate = useNavigate();

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:8000/api/clientes/${id}`) // Envia a requisição DELETE para a API
      .then((response) => {
        setIsLoading(false);
        setSuccessMessage('Cliente excluído com sucesso!');
        // Após a exclusão bem-sucedida, você pode redirecionar para outra página (ex: lista de usuários)
        setTimeout(() => navigate('/clientes'), 2000);  // Redireciona após 2 segundos
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Erro ao tentar excluir o usuário');
        } else {
          setErrorMessage('Erro de conexão com a API');
        }
      });
  };

  return (
    <div>
      <p>Excluir cliente {id}.</p>

      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <button onClick={handleDelete} disabled={isLoading} className="button is-small">
        {isLoading ? 'Excluindo...' : 'Excluir cliente'}
      </button>
    </div>
  );
};

export default DeleteCliente;