import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';

function App() {

  const [data, setData] = useState();
  const [input, setInput] = useState();
  const [updateInput, setUpdateInput] = useState();

  useEffect(() =>{
      fetch('http://localhost:8081/todo')
      .then(res => res.json())
      .then(data => setData(data))
  },[data])



  const strikethrough = event =>{
    if (event.target.style.textDecoration){
      event.target.style.removeProperty('text-decoration');
    } else {
      event.target.style.setProperty('text-decoration', 'line-through');
    }
  };



 const addTodo = () => {
      fetch('http://localhost:8081/todo', {
      method: 'POST',
      body: JSON.stringify({
        task: input,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
 }


 const deleteTodo = (todo_id) =>{
  fetch(`http://localhost:8081/todo/${todo_id}`, {
    method: 'DELETE',
  });
 }

 const updateTodo = (todo_id) =>{
  fetch(`http://localhost:8081/todo/${todo_id}`, {
  method: 'PUT',
  body: JSON.stringify({
    task: updateInput,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
 }






  return !data ? null :  ((
    <div className="App">
        <h1>TODO LIST</h1>
        <div className='input'>
          <label>Add Todo</label>
          <input type='text' placeholder='type your todo here' onChange={(e) =>{setInput(e.target.value)}} value={input}></input>
          <button onClick={()=> {addTodo() ; setInput('')}}>add</button>
        </div>

        <ul>
          {data.map((data, index) => <li><p onClick={strikethrough} className='pointer'>{data.task}</p> <p>:</p> <button onClick={()=> {deleteTodo(data.todo_ID)}}>-</button><input type='text' placeholder='update here' onChange={(e) =>{setUpdateInput(e.target.value)}}></input><button onClick={() => {updateTodo(data.todo_ID)}}>update</button></li>)}
        </ul>
    </div>
  ));
}

export default App;
