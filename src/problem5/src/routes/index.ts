import express from 'express';
import bookRoute from './bookRoute';
import categoryRoute from './categoryRoute';

const router = express.Router();

router.use('/books', bookRoute);
router.use('/categories', categoryRoute);

export default router;
