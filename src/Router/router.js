const express = require("express")
const router = express.Router()


const userController = require("../Controllers/userController.js")
const bookController = require("../Controllers/bookController.js")
const middleware = require("../Middleware/Auth")


router.post('/register',userController.userCreate)
router.post('/login',userController.userLogin)


router.post('/books',middleware.authentication,bookController.bookCreate)
router.get('/books',bookController.ViewBooks)
router.get('/books1',bookController.allbooks)





module.exports = router;