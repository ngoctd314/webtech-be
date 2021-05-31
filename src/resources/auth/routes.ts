/**
 * Required External Modules
 */
import express from 'express';

/**
 * Required Dev Modules
 */
import { authenticated } from '@middleware';
import { login, logout, register } from './controllers';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Create new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              password:
 *                type: string
 *          example:
 *            email: admin@example.com
 *            firstName: admin
 *            lastName: web tech
 *            password: adminpassword
 *    responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Validation error
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login user in to system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *          example:
 *              email: admin@example.com
 *              password: admin.password
 *    responses:
 *      200:
 *        description: Login successfully
 *      400:
 *        description: Validation error
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *  delete:
 *    tags:
 *      - Auth
 *    summary: Logout user, delete cookie
 *    responses:
 *      200:
 *        description: Logout successfully
 *      400:
 *        description: Validation error
 */
router.delete('/logout', authenticated, logout);

export default router;
