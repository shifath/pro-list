const { createTodo, getTodo, removeTodo } = require('../model/todo');

exports.create = (req, res) => {
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { description } = fields;
    // check for all fields
    if (!fields.description) {
      return res.status(400).json({
        error: 'Description is required',
      });
    }
    try {
      const newTask = await createTodo(description, req.user.id_user);
      return res.status(201).send({ data: newTask.rows[0] });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  });
};

exports.read = async (req, res) => {
  // console.log(req);
  // console.log('reading');
  try {
    const task = await getTodo(req.user.id_user);
    return res.json({ data: task.rows });
    // return res('dfdf');
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await removeTodo(id, req.user.id_user);
    return res.status(200).send({ data: id });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
