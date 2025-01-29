import { useQuery } from '@tanstack/react-query';
import {fetchTodosData} from '../../apis/TodosApi';

const Todos = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: fetchTodosData,
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p><br/>
      <strong>👀 {data.subscribers_count}</strong>{' '}<br/>
      <strong>✨ {data.stargazers_count}</strong>{' '}<br/>
      <strong>🍴 {data.forks_count}</strong><br/>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
};

export default Todos;
