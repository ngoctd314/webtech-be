/**
 * Required Dev Module
 */
import development from './development';
import production from './production';

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
    default:
      return development;
  }
}

export default config();
