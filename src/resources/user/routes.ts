/**
 * Required External Modules
 */
import express from 'express';

/**
 * Required Dev Modules
 */
import {
  updateInfo,
  updatePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
  verifyUser,
  getMe,
  challengeSolved,
  getCertificate,
} from './controllers';
import { authenticated } from '@middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *  post:
 *    tags:
 *      - User
 *    summary: Forgot password
 *    requestBody:
 *    responses:
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/v1/user/verify/{token}:
 *  get:
 *    tags:
 *      - User
 *    responses:
 */
router.get('/verify/:token', authenticated, verifyUser);

/**
 * @swagger
 * /api/v1/user/me:
 *  get:
 *    tags:
 *      - User
 *    responses:
 */
router.get('/me', authenticated, getMe);

/**
 * @swagger
 * /api/v1/user/reset-password/{resetToken}:
 *  post:
 *    tags:
 *      - User
 *    responses:
 */
router.post('/reset-password/:resetToken', resetPassword);

/**
 * @swagger
 * /api/v1/user/update-password:
 *  patch:
 *    tags:
 *      - User
 *    responses:
 */
router.patch('/update-password', authenticated, updatePassword);

/**
 * @swagger
 * /api/v1/user/update-info:
 *  patch:
 *    tags:
 *      - User
 *    responses:
 */
router.patch(
  '/update-info',
  authenticated,
  updateInfo('firstName', 'lastName', 'gender', 'address')
);

/**
 * @swagger
 * /api/v1/user/solved:
 *  patch:
 *    tags:
 *      - User
 *    responses:
 */
router.patch('/solved', authenticated, challengeSolved);

/**
 * @swagger
 * /api/v1/user/certificate:
 *  get:
 *    tags:
 *      - User
 *    responses:
 */
router.get('/certificate', authenticated, getCertificate);

/**
 * @swagger
 * /api/v1/user:
 *  delete:
 *    tags:
 *      - User
 *    responses:
 */
router.delete('/', deleteUser);

export default router;
