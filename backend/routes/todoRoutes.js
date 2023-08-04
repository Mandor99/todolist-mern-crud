const {Router} = require('express')
const { getTodos, addTodo, deleteTodo, updateTodo } = require('../controllers/todoController')
const router = Router()

router.get('/read-todos', getTodos)
router.post('/add-todo', addTodo)
router.post('/delete-todo', deleteTodo)
router.post('/update-todo', updateTodo)

module.exports = router
