import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.code === '23505' ? 409 : 500;
  logger.error(`${err.message} — ${req.method} ${req.originalUrl}`, { stack: err.stack });
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Something went wrong. Please try again later.'
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
export default errorHandler;
