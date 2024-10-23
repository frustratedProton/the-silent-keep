import { Router } from 'express';
import { getAllMessages } from '../controllers/messageController.js';

const router = Router();
// router.get('/', (req, res) => {
//     res.render('index')
// });
router.get('/', getAllMessages);

export default router;