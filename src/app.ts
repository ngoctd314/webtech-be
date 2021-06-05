/**
 * Required External Modules
 */
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';
import compression from 'compression';

/**
 * Required Dev Modules
 */
import { handleError } from '@common';
import authRoutes from '@auth/routes';
import userRoutes from '@user/routes';
import adminRoutes from '@admin/routes';
import challengeRoutes from '@challenge/routes';
import postRoutes from '@post/routes';
import commentRoutes from '@comment/routes';
import config from '@config';

/**
 * App Variables
 */
const app: Application = express();
const { server, client } = config;

/**
 * App Configuration
 */
// gzip
app.use(compression());

// Setting various HTTP headers
app.use(helmet());
// Enable cors
app.use(
  cors({
    origin: client.domain,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
  })
);
// Parse cookie into req.cookies
app.use(cookieParser());
// Extract body to request with request.header: Content-Type: application/json
app.use(express.json());

/**
 * Swagger config
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web Tech Api',
      version: server.api.version,
    },
  },
  apis: ['./src/resources/**/routes.ts'],
};

app.use(
  `/${server.api.version}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(options))
);

/**
 * App routing
 */

// resource routing
app.use(`/${server.api.version}/admin`, adminRoutes);
app.use(`/${server.api.version}/auth`, authRoutes);
app.use(`/${server.api.version}/user`, userRoutes);
app.use(`/${server.api.version}/challenge`, challengeRoutes);
app.use(`/${server.api.version}/post`, postRoutes);
app.use(`/${server.api.version}/comment`, commentRoutes);

/**
 * App errors handle
 */

// Throw error not match any resources
app.all('*', (req, res, next) => {
  next('Resource not found');
});

// Handle all errors and send nice response
app.use(handleError);

export default app;
