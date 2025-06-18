const express = require('express');
const { getAwards, createAward,updateAward, deleteAward, getAwardStats } = require('../controllers/awardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAwards);
router.post('/',authMiddleware, createAward);
router.put('/:id',authMiddleware, updateAward);
router.delete('/:id',authMiddleware, deleteAward);
router.get('/stats', getAwardStats); 
module.exports = router;
