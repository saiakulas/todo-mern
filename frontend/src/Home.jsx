import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState('');

  const handleEdit = (id) => {
    axios.put(`http://localhost:3000/update/${id}`)
      .then(result => {
        console.log(result.data);
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, done: true } : todo)));
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(result => {
        console.log(result.data);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  }

  const handleAdd = () => {
    axios.post('http://localhost:3000/add', { tasks: tasks })
      .then(result => {
        console.log(result);
        setTodos([...todos, result.data]);
        setTasks('');
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:3000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{
      margin: '0 auto',
      padding: '20px',
      maxWidth: '600px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        fontSize: '2em',
        marginBottom: '20px',
      }}>TodoList</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        <input
          type="text"
          name="add"
          id="add"
          placeholder="Enter task"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1em',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
            width: '70%',
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            cursor: 'pointer',
          }}
        >Add</button>
      </div>
      {todos.length === 0 ? (
        <div>
          <h2 style={{
            fontSize: '1.2em',
            color: '#888',
          }}>No records</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
          }}>
            <button
              onClick={() => handleEdit(todo._id)}
              style={{
                padding: '5px 10px',
                fontSize: '0.9em',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >Done</button>
            <span style={todo.done ? {
              textDecoration: 'line-through',
              flex: 1,
            } : {
              flex: 1,
            }}>
              {todo.tasks}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              style={{
                padding: '5px 10px',
                fontSize: '0.9em',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#dc3545',
                color: '#fff',
                cursor: 'pointer',
              }}
            >Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
