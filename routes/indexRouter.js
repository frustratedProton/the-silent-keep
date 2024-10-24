import { Router } from 'express';
import { getAllMessages } from '../controllers/messageController.js';

const router = Router();
// router.get('/', (req, res) => {
//     res.render('index')
// });
router.get('/', getAllMessages);

router.get('/sign-in', (req, res) => {
    res.render('sign-in');
    // res.render('sign-up');
});

export default router;
