import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Todos from './components/Todos'
import axios from 'axios'
import {useState, useEffect} from 'react'

function App() {

  const [todos, setTodos] = useState([])
  const [val, setVal] = useState('')
  const [crtId, setCrtId] = useState('')
  const baseURL = 'http://localhost:5000'

useEffect(() => {
  axios.get(`${baseURL}/read-todos`).then((res) => setTodos(res.data)).catch(err => console.log(err.message))
}, [todos])

const handleSubmit = (e) => {
  if(crtId === '') { //add new todo
    val.length !== 0 && (
      axios.post(`${baseURL}/add-todo`,{text: val}).then(res => setVal('')).catch(err => console.log(err))
    )
  } else { //update todo
    axios.post(`${baseURL}/update-todo`,{_id: crtId, text: val}).then(res => {
      setVal('')
      setCrtId('')
    }).catch(err => console.log(err))
  }
}

const getUpdatingTodo = (id, txt) => {
  setVal(txt)
  setCrtId(id)
}

const deleteTodo = (_id) => {
  axios.post(`${baseURL}/delete-todo`, {_id}).then(res => console.log(res)).catch(err => console.log(err))
}

  return (
    <main className='app'>
      <h1 className="header">Todo App</h1>
      <Box component="form" sx={{'& > :not(style)': { m: 1 }}} noValidate autoComplete="off">
        <TextField label="todo list" variant="standard" style={{width: '40%'}} value={val} onChange={(e) => setVal(e.target.value)} />
        <Button variant="contained" style={{borderRadius: "0", bottom: "-10px", minWidth: "9rem"}} onClick={handleSubmit}>{crtId===''?'Add' : 'Edit'}</Button>
    </Box>
    <section className='todosBox'>
      { todos.length > 0 && todos.map(todo => (
        <Todos key={Math.random()} todo={todo} deleteTodo={() => deleteTodo(todo._id)} update={() => getUpdatingTodo(todo._id, todo.text)}/>
      ))}
    </section>
    </main>
  );
}

export default App;
