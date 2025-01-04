import { useState } from 'react';
import './App.css';

function App() {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);

  const handelChange = (e) => {
    setValue(e.target.value);
  }
  const handelOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      const obj = {
        title: value,
        status: TODO,
        id: Date.now()
      }
      setTasks((prevTasks) => [...prevTasks, obj]);
    }
  }

  const handelDrag = (e, task) => {
    setDragTask(task);
  }

  const handelDragOver = (e) => {
    e.preventDefault();
  }

  const handelDragNDrop = (status) => { }

  const handelOnDrop = (e) => {
    const status = e.target.getAttribute('data-status');
    if (status === TODO) {

    } else if (status === DOING) {

    } else if (status === DONE) {

    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        type='text'
        value={value}
        onChange={handelChange}
        onKeyDown={handelOnKeyDown}
      />
      <div className='board'>
        <div className='todo'
          data-status={TODO}
          onDrop={handelOnDrop}
          onDragOver={handelDragOver}
        >
          <h2 className='todo-col'>TODO</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === TODO && <div
                draggable
                onDrag={(e) => handelDrag(e, task)}
                className='task-item'
                key={task.id}
              >
                {task.title}
                <div>
                  <span className='btn'>✍️</span>
                  <span className='btn'>🗑️</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className='doing'
          data-status={DOING}
          onDrop={handelOnDrop}
          onDragOver={handelDragOver}
        >
          <h2 className='doing-col'>DOING</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DOING && <div
                draggable
                key={task.id}
                className='task-item'
              >
                {task.title}
                <div>
                  <span className='btn'>✍️</span>
                  <span className='btn'>🗑️</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className='done'
          data-status={DONE}
          onDrop={handelOnDrop}
          onDragOver={handelDragOver}
        >
          <h2 className='done-col'>DONE</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DONE && <div
                draggable
                className='task-item'
                key={task.id}
              >
                {task.title}
                <div>
                  <span className='btn'>✍️</span>
                  <span className='btn'>🗑️</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
