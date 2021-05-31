import { Router } from 'express';

// Dev
import { crudComment } from './controllers';
import { authenticated } from '@middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/comment:
 *  post:
 *    tags:
 *      - Comment
 *    summary: Create comment on post
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              post:
 *                type: string
 *              content:
 *                type: string
 *              photo:
 *                type: string
 *    responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Post and content are required
 *       403:
 *         description: Must authenticated to create comment
 */
router.post('/', authenticated, crudComment._create);

/**
 * @swagger
 * /api/v1/comment:
 *  get:
 *    tags:
 *      - Comment
 *    summary: Get comment on post
 *    responses:
 *      200:
 *        description: Get comments successfully
 */
router.get('/', authenticated, crudComment._read);

export default router;
