/**
 * Required Dev Module
 */
import development from './development';
import production from './production';
import ci from './ci';

const { NODE_ENV } = process.env;

/**
 * Configuration environment
 */
function config() {
  switch (NODE_ENV) {
    case 'development': {
      return development;
    }
    case 'production':
      return production;
    case 'ci':
      return ci;
    default:
      return development;
  }
}

export default config();
