const router = require('express').Router();
const { checkAuth } = require('../../middlewares/authMiddleware');
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/users', userRoutes);
router.use('/todos', checkAuth, todoRoutes);

module.exports = router;
