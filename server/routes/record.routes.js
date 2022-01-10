const Router = require('express')
const router = new Router()

const recordController = require('../controllers/record.controller')

router.get('/', recordController.getRecords)


module.exports = router