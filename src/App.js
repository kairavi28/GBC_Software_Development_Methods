import React, {useState, useEffect} from 'react';
import TodoList from './Components/TodoList/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  function onChange(e) {
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3, 
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
    };
    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos',{
      method:'POST',
      body: JSON.stringify(value),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res) => res.json())
    .then((result) => {
      setTodos(todos.concat({...result, id: value.id}));
      setSaving(false);
    });
  }

  function updateTodo(id) {
    const newList = todos.map(todo_item => {
      if (todo_item.id === id) {
        const updatedItem = { ...todo_item, completed: !todo_item.completed };
        return updatedItem;
      }
      return todo_item;
    });
    setTodos(newList);
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo_item => todo_item.id !== id));
  }
  useEffect (() => {
    async function fetchData(){
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const result = await res.json();
      console.log(result);
      setTodos(result.slice(0,5));
      setLoading(false);
    }
    fetchData();
  }, []);


return (
<div className="App">
  <h1 className="header">My Todo List</h1>{loading ? 'Loading' : <TodoList todos={todos} updateTodo={updateTodo} removeHandler={removeTodo}/>}
    
    <div className="add-todo-form">
      {saving ? ('Saving') : (
      <form onSubmit={addTodo}>
        <input type="text" onChange={onChange}/>
        <button type="submit">Add new todo</button>
        </form>)}
        </div>
        </div>
  );
}

export default App;



