import { client } from "../utils/httpClient"

export const getTodos = () => {
  return client.get('/todos?userId=6283');
};

export const createTodo = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId: 6283,
  });
};

export const updateTodo = ({ id, title, completed }) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  });
};

export const deleteTodo = (id) => {
  return client.delete(`/todos/${id}`);
};
