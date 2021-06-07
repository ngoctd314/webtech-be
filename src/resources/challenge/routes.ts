import { authenticated, authorization } from '@middleware';
import { Router } from 'express';

import { crudChallenge } from './controllers';

const router = Router();

/**
 * @swagger
 * /api/v1/challenge:
 *  post:
 *    tags:
 *      - Challenge
 *    summary: Create new challenge
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              question:
 *                type: string
 *              prepareCode:
 *                type: string
 *              srcDoc:
 *                type: string
 *            example:
 *              title: First Html challenge
 *              question: <h1>Hello world</h1>
 *              prepareCode: <h1></h1>
 *              srcDoc: document.querySelector...
 *    responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Validation error
 */
router.post('/', authenticated, authorization('admin'), crudChallenge._create);

/**
 * @swagger
 * /api/v1/challenge/all:
 *  get:
 *    tags:
 *      - Challenge
 *    summary: Get all challenge
 *    responses:
 *      200:
 *        description: Get challenge successfully
 */
router.get('/all', crudChallenge._readAll);

/**
 * @swagger
 * /api/v1/challenge/{course}:
 *  get:
 *    tags:
 *      - Challenge
 *    summary: Get course challenge
 *    parameters:
 *      - in: path
 *        name: course
 *        required: true
 *        description: The course type
 *    responses:
 *      200:
 *        description: Get course challenge successfully
 *      400:
 *        description: Course is required
 */
router.get('/:course', crudChallenge._readCourse);

/**
 * @swagger
 * /api/v1/challenge/{course}/{id}:
 *  get:
 *    tags:
 *      - Challenge
 *    summary: Get a challenge by id
 *    parameters:
 *      - in: path
 *        name: course
 *        required: true
 *        description: The challenge id
 *    responses:
 *      200:
 *        description: Get challenge successfully
 *      400:
 *        description: ID is required
 */
router.get('/:course/:id', crudChallenge._readID);

/**
 * @swagger
 * /api/v1/challenge/{id}:
 *  delete:
 *    tags:
 *      - Challenge
 *    summary: Delete a challenge
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The challenge id
 *    responses:
 *      200:
 *        description: Delete challenge successfully
 *      400:
 *        description: ID is required
 */
router.delete(
  '/:id',
  authenticated,
  authorization('admin'),
  crudChallenge._delete
);

export default router;
