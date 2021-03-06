import { isEmpty, size } from 'lodash';
import React, {useState, useEffect} from 'react';
// import shortid from 'shortid';
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions';


function App() {

  const [task, setTask] = useState('')

  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)
  
useEffect(() => {
  (async () => {
    const result = await getCollection("tasks")

    if (result.statusResponse) {
      console.log(result.data);
      setTasks(result.data)
    }
    
    
  })()
  
}, [])

  const validForm = () => {
    let isValid = true
    setError(null)
    if(isEmpty(task)){
      setError('Debes ingresar una Tarea.')
      return isValid = false
    }

    return isValid
  }

  // const addTask = (e) => {
  //   e.preventDefault();

  //   if (!validForm()) {
  //     return
  //   }

  //   const newTask = {
  //     id: shortid.generate(),
  //     name: task
  //   }

  //   setTasks([...tasks, newTask]);
  //   console.log(newTask.name);
  //   console.log(tasks);

  //   setTask('');
  // }

  const addTask = async(e) => {
    e.preventDefault();

    if (!validForm()) {
      return
    }

    const result = await addDocument('tasks', {name : task})

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    setTasks([...tasks, {id: result.data.id, name: task}]);
    
    console.log(tasks);

    setTask('');
  }


  // const deleteTask = (id) =>{
  //   const filterTask = tasks.filter(task => task.id !== id)

  //   setTasks(filterTask)
  // }

  const deleteTask = async(id) =>{

    const result = await deleteDocument('tasks', id)

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const filterTask = tasks.filter(task => task.id !== id)

    setTasks(filterTask)
  }


  const editTask = (theTask) =>{
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  // const saveTask = (e) => {
  //   e.preventDefault();

  //   if (!validForm()) {
  //     return
  //   }
  //   const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
  //   setTasks(editedTasks)
  //   console.log(editedTasks)
  //   // console.log(newTask.name);
  //   // console.log(tasks);
  //   setEditMode(false)
  //   setTask('')
  //   setId('')
  // }

  const saveTask = async(e) => {
    e.preventDefault();

    if (!validForm()) {
      return
    }

    const result = await updateDocument('tasks', id, {name: task})

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    console.log(editedTasks)
    setEditMode(false)
    setTask('')
    setId('')
  }
 

  return (
    <div className='container mt-5'>
      <h1> Cursos </h1>
      <hr/>
      <div className='row'>
        <div className='col-8'>
          <h4 className='text-center'>Lista de Cursos</h4>
          {
            size(tasks) === 0 ? (
              <li className='list-group-item'>No hay cursos programados.</li>
            ) : (
              <ul className='list-group'>
            {

              tasks.map((task) => (
                <li className='list-group-item' key={task.id}>
                <img className='mr-3' 
                src={task.name.includes('React') ? 'https://sigdeletras.com/images/blog/202004_react_leaflet/react.png' 
                : task.name.includes('react') ? 'https://sigdeletras.com/images/blog/202004_react_leaflet/react.png'
                : task.name.includes('Angular') ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png'
                : task.name.includes('angular') ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png'
                : task.name.includes('Vue') ? 'https://victorroblesweb.es/wp-content/uploads/2017/03/vuejs2-victorroblesweb.jpg'
                : task.name.includes('vue') ? 'https://victorroblesweb.es/wp-content/uploads/2017/03/vuejs2-victorroblesweb.jpg'
                : 'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'}
                 height='50px' width='100px'/>
                <span className='lead'>{task.name}</span>
                <button 
                className='btn btn-danger btn-sm float-right mx-2'
                onClick={() => deleteTask(task.id)}
                >Eliminar
                </button>
                <button 
                className='btn btn-warning btn-sm float-right'
                onClick={() => editTask(task)}
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
        <h4 className='text-center'>
          {editMode ? 'Modificar Curso' : 'Agregar Curso'}
        </h4>
        <form onSubmit={editMode ? saveTask : addTask}>
          <input
          className='form-control mb-2'
          placeholder='Ingrese un Curso...'
          type='text'
          onChange={(text) => setTask(text.target.value)}
          value = {task}
          />
          {
            error && <span className='text-danger mb-5'>{error} </span>
              //&& significa que es un if de una sola linea
          }
          
          <button 
          className={editMode ? 'btn btn-warning btn-block mt-2' : 'btn btn-dark btn-block mt-2' }
          type='submit'>
            {editMode ? 'Editar Curso' : 'Agregar Curso'}
          </button>
        </form>
        </div>
      </div>
    </div>  
  );
}

export default App;
