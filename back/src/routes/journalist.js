import {Router} from 'express';
import {getAllArticlesByJournalistId} from '../controllers/articleController.js';

const journalistRouter = Router();
journalistRouter.get('/:id/articles', getAllArticlesByJournalistId)

export default journalistRouter;