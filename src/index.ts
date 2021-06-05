/* eslint-disable global-require */
/* eslint-disable no-console */
import cluster from 'cluster';
import { cpus } from 'os';
import config from '@config';
import { connectDB } from '@common';
import app from './app';

/**
 * Required Dev Modules
 */
const numCPUs = cpus().length;
process.env.UV_THREADPOOL_SIZE = `${numCPUs}`;
if (cluster.isMaster) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  /**
   * Server variables
   */
  const PORT: number = config.server.port;

  /**
   * Database Connection
   */
  connectDB(config.database.uri);
  /**
   * Server Activation
   */
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(config.server.host);
  });
}
