/**
 * Required Dev Modules
 */
import { connectDB } from '@common';
import config from '@config';
import app from './app';

/**
 * Database Connection
 */
connectDB(config.database.uri);

/**
 * Server variables
 */
const PORT: number = config.server.port;

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(config.server.host);
});
