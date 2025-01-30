const pool = require('./database');

const resetTodoSequence = async () => {
  try {
    await pool.query('setval(\'todo_todo_id_seq\', (SELECT MAX(todo_id)+1 FROM todo))');
    console.log('Sequence reset successfully');
  } catch (error) {
    console.error('Error resetting sequence:', error);
  }
};

const createTodo = async (description, userId) => {
  // console.log("creatingtodo for user", userId); 
  try {
    // await pool.query('setval(todo_id, (SELECT MAX(todo_id)+1 FROM todo))');
    const result = await pool.query('INSERT INTO todo (description, user_id) VALUES ($1, $2) RETURNING *', [
      description, userId
    ]);
    return result;
  } catch (error) {
    console.error('Error creating todo:', error);
    // throw error;
  }
}

const getTodo = async (userId) => {
  try {
    const todos = await pool.query('SELECT * FROM todo WHERE user_id = $1', [userId]);
    // console.log(todos);
    // console.log("gettingtodossql");

    if (todos.rows.length === 0) {
      console.log('No todos found');
      await pool.query('ALTER SEQUENCE todo_todo_id_seq RESTART WITH 1;');
    }

    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

const removeTodo = async (id, userId) => 
  {
    console.log("removingtodo for user", userId, 'todo id', id);
    await pool.query('DELETE FROM todo WHERE todo_id = $1 AND user_id= $2', [id, userId]);
    resetTodoSequence();
  }
module.exports = { createTodo, getTodo, removeTodo };
