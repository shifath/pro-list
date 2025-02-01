const { createTodo, getTodo, removeTodo } = require('../model/todo');
const formidable= require('formidable');



exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    console.log(fields);
    const { description } = fields;
    // check for all fields

    if (description[0]==='') {
      return res.status(400).json({
        error: 'Description is required',
      });
    }
    try {
      const newTask = await createTodo(description[0], req.user.id_user);
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
