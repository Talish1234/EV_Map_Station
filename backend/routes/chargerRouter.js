const { addCharger, getAllChargers, updateCharger, deleteCharger } = require('../controllers/chargercontroller');
const authMiddleware = require('../middleware/authmiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

const router= require('express').Router();

router.get('/', getAllChargers);
router.post('/add', authMiddleware,isAdminMiddleware,addCharger);
router.patch('/update/:id', authMiddleware,isAdminMiddleware,updateCharger);
router.delete('/delete/:id', authMiddleware, isAdminMiddleware,deleteCharger);

module.exports = router;