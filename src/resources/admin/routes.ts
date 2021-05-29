/**
 * Required External Modules
 */
import express from 'express';

/**
 * Required Dev Modules
 */
import { crudUser } from './controllers';
import { authenticated, authorization } from '@middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/admin/users:
 *  get:
 *    tags:
 *      - Admin
 *    summary: Get all user of system
 *    responses:
 *      200:
 *        description: All Users
 *      401:
 *        description: Unauthenticated
 *      403:
 *        description: Unauthorization (admin permission)
 */
router.get('/users', authenticated, authorization('admin'), crudUser._read);

export default router;
