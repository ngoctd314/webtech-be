import crypto from 'crypto';

/**
 * Generate random hex token base on length
 *
 * @param length length of hex token
 * @returns
 */
function genToken(length: number) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate sha256 hasing base on token
 * @param token token
 * @returns
 */
function sha256Hash(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export { sha256Hash, genToken };
