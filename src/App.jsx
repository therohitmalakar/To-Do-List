import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoAdd } from "react-icons/io5";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLs();
  }
                                                                                                                                                                                                                                                                                                                                                   
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLs();
  }
  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !==id
    });
    setTodos(newTodos)
    saveToLs();
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs();
  }


  return (
    <>
    <Navbar/>
      <div className="md:container bg-[#F2B138] mx-auto my-5 pl-12 pt-5 min-h-[80vh] md:w-1/2 border-3 shadow-[8px_8px] ">
        <div className="addTodo my-5 flex flex-col ">
        <h2 className='text-lg font-bold'>Add A Todo</h2>
        <div className='flex'>

        <input onChange={handleChange} value={todo} type="text" placeholder='Add your tasks' className='w-1/2 bg-[#F5D479] border-2 outline-none py-2 pl-1' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-[#FDF3E6] text-sm font-bold p-1 border-2 cursor-pointer mx-5'><IoAdd /></button>
        </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}/>Show Finished
        <div className="todos mt-5">
        <h2 className='text-lg font-bold'>Your Todos</h2>
          {todos.length ===0 && <div className='m-5'>No Active Tasks.</div> }

          {todos.map(item=>{
          return (showFinished || !item.isCompleted ) && <div key={item.id} className="todo flex my-3 justify-between items-center"> 

          <div className='flex gap-3'>
          <input className='cursor-pointer' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through py-2 px-2 border-1 cursor-pointer ":" bg-[#F5D479] py-2 px-2 border-1 cursor-pointer"}>{item.todo}</div>
          </div>

            <div className="buttons flex mr-7 h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-[#FDF3E6] text-sm font-bold p-1 border-2 cursor-pointer mx-1'><MdEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-[#FDF3E6] text-sm font-bold p-1 border-2 cursor-pointer mx-1'><MdDeleteForever /></button>
            </div>
          </div>
          })}

        </div>

      </div>
    </>
  )
}

export default App
