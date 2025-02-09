const express = require('express')
const router = express.Router()
const {addTodo, getTodos, getTodo, updateTodo, deleteTodo} = require('../controller/todos')
const { checkAdmin } = require('../middleware/admin')
const { authenticate } = require('../middleware/auth')

router.post('/', authenticate, addTodo );
router.get('/', authenticate, getTodos);
router.get('/:id', authenticate, getTodo);
router.put('/:id', authenticate, checkAdmin,updateTodo);
router.delete('/:id', authenticate, checkAdmin, deleteTodo)

module.exports = router;