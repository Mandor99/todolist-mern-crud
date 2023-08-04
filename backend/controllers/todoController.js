const todoModal = require('../modals/schema')

module.exports.getTodos = async (req, res) => {
    const todos = await todoModal.find()
    res.send(todos)
}

module.exports.addTodo = (req, res) => {
    const {text} = req.body
    todoModal.create({text}).then(_ => res.set(201).send('add new todo ...')).catch(err => console.log(err.message))
}

module.exports.deleteTodo = async (req, res) => {
    const {_id} = req.body
    await todoModal.findByIdAndDelete(_id).then(()=> res.set(201).send('deleted done ...')).catch(err=> console.log(err.message))
}

module.exports.updateTodo = async (req, res) => {
    const {_id, text} = req.body
    await todoModal.findByIdAndUpdate(_id, {text}).then(()=>res.set(201).send('updated todo ...')).catch(err=> console.log(err.message))
}
