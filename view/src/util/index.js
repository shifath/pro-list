const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const createTodo = async (todo) => {
  try {
    const res = await fetch(`${BACKEND_URL}/todo/create`, {
      method: 'POST',
      body: todo,
      credentials: 'include'
    });
    return res.json;
  } catch (error) {
    return { error };
  }
};

export const getTodos = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/todo/todos`,{
      credentials: 'include',
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

export const removeTodo = async (id) => {
  try {
    await fetch(`${BACKEND_URL}/todo/rem-todo/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return 'deleted';
  } catch (error) {
    return { error };
  }
};
