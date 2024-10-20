const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita a 100 solicitudes por IP cada 15 minutos
    message: "Demasiadas solicitudes desde esta IP, por favor intenta más tarde."
  });

  module.exports = rateLimitMiddleware;
