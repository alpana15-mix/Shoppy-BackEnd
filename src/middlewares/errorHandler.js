//This middleware catches and handles all errors thrown in the application
module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};