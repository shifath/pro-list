export const createTodo = async (todo) => {
  try {
    const res = await fetch('/api/todo/create', {
      method: 'POST',
      body: todo,
    });
    return res.json();
  } catch (error) {
    return { error };
  }
};

export const getTodos = async () => {
  console.log('getingTodos');
  try {
    const res = await fetch('/api/todos',{
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

export const removeTodo = async (id) => {
  try {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });
    return 'deleted';
  } catch (error) {
    return { error };
  }
};
