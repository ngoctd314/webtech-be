import { Router } from 'express';

import { authenticated } from '@middleware';
import { upload } from './controllers';

const router = Router();

router.get('/', authenticated, upload);

export default router;
