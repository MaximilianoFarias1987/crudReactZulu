import { isEmpty, size } from 'lodash';
import React, {useState} from 'react';
import shortid from 'shortid';


function App() {

  const [task, setTask] = useState('')

  const [tasks, setTasks] = useState([])

  const addTask = (e) => {
    e.preventDefault();

    if(isEmpty(task)){
      console.log('Task empty')
      return
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    }

    setTasks([...tasks, newTask]);
    console.log(newTask.name);
    console.log(tasks);

    setTask('');
  }


  const deleteTask = (id) =>{
    const filterTask = tasks.filter(task => task.id !== id)

    setTasks(filterTask)
  }

  return (
    <div className='container mt-5'>
      <h1> Tareas</h1>
      <hr/>
      <div className='row'>
        <div className='col-8'>
          <h4 className='text-center'>Lista de Tareas</h4>
          {
            size(tasks) === 0 ? (
              <h5 className='text-center mt-3'>No hay tareas programadas.</h5>
            ) : (
              <ul className='list-group'>
            {

              tasks.map((task) => (
                <li className='list-group-item' key={task.id}>
                <span className='lead'>{task.name}</span>
                <button 
                className='btn btn-danger btn-sm float-right mx-2'
                onClick={() => deleteTask(task.id)}
                >Eliminar
                </button>
                <button 
                className='btn btn-warning btn-sm float-right'
                >Editar
                </button>
                </li>
              ))

              
            }
            </ul>
            )
            
          }
          
        </div>
        <div className='col-4'>
        <h4 className='text-center'>Formulario de Tareas</h4>
        <form onSubmit={addTask}>
          <input
          className='form-control mb-2'
          placeholder='Ingrese la tarea...'
          type='text'
          onChange={(text) => setTask(text.target.value)}
          value = {task}
          />
          <button 
          className='btn btn-dark btn-block' 
          type='submit'>
            Agregar Tarea
          </button>
        </form>
        </div>
      </div>
    </div>  
  );
}

export default App;
