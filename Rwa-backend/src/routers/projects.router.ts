/**
 * @file project routes
 */
import { Router } from 'express';
import {
  projectRealTimeUpgrade,
  getAllProject,
} from '../controllers/projects.controller';

const router = Router();

router.route('/upgrade').get(projectRealTimeUpgrade);
router.route('/all').get(getAllProject);

export default router;
