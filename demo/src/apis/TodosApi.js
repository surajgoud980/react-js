export const fetchTodosData = async () => {
    const response = await fetch('https://api.github.com/repos/TanStack/query');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  