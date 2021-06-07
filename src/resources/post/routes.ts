// *Routing for /apiVersion/post

import { Router } from 'express';

// Dev module
import { authenticated } from '@middleware';
import { crudPost, downvote, upvote } from './controllers';

const router = Router();

/**
 * @swagger
 * /api/v1/post:
 *  post:
 *    tags:
 *      - Post
 *    summary: Create post
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              problem:
 *                type: string
 *              challenge:
 *                 type: string
 *    responses:
 *      200:
 *        description: Post created
 *      400:
 *        description: Problem and challenge are required
 *      401:
 *        description: Must authenticated to create post
 *
 */
router.post('/', authenticated, crudPost._create);

/**
 * @swagger
 * /api/v1/post:
 *  get:
 *    tags:
 *      - Post
 *    summary: Get post
 *    responses:
 *      200:
 *        description: Post created
 *
 */
router.get('/', crudPost._read);

/**
 * @swagger
 * /api/v1/post/upvote:
 *  patch:
 *    tags:
 *      - Post
 *    summary: Upvote a post
 *    responses:
 *      200:
 *       description: Upvote a post successfully
 *      401:
 *       description: Must be authenticated
 */
router.patch('/upvote', authenticated, upvote);

/**
 * @swagger
 * /api/v1/post/upvote:
 *  patch:
 *    tags:
 *      - Post
 *    summary: Downvote a post
 *    responses:
 *      200:
 *       description: Downvote a post successfully
 *      401:
 *       description: Must be authenticated
 */
router.patch('/downvote', authenticated, downvote);

export default router;
