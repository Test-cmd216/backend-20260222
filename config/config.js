import { config as loadEnv } from 'dotenv';
loadEnv();

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'CHANGE_THIS_IN_PRODUCTION',
    expire: process.env.JWT_EXPIRE || '1h',
  },
  cors: {
    origins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
};
export default config;
