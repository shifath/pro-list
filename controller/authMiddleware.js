module.exports = (req, res, next) => {
  console.log('authmiddleware');
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};