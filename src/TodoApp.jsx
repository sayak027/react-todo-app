import React, { useEffect, useState } from 'react';

const TodoApp = () => {

    const[task, setTask] = useState("");    //temp variable -> task stored in it

    const[tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem('tasks')) || []
    );

        // {task:"Make food for family", completed:false},
        // {task:"Make food for family", completed:false},
        // {task:"Make food for family 1", completed:true},
        // {task:"Make food for family 2", completed:true},
        // {task:"Make food for family", completed:false}

    // ]);

    const[editIndex, setEditIndex] = useState("");

    const[editTask, setEditTask] = useState("");

    const[filter, setFilter] = useState("All");


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },[tasks]);

    const addTask = () => {
        setTasks([...tasks, {task: task,  completed:false}]);
        setTask("");
    };

    const deleteTask = (index) =>{
        const newTasks = tasks.filter((_, i)=> i != index);
        setTasks(newTasks);
    };

    const clearAll = () => {
        setTasks([]);
    };

    const clearCompleted = () => {
        const newTasks = tasks.filter((ele, index) => ele.completed != true );
        setTasks(newTasks);
    };

    const editingTask = (index) => {

        if(editIndex === index){
            tasks[editIndex].task = editTask
            setEditTask("");
            setEditIndex("");
        } else{
            setEditTask(tasks[index].task)
            setEditIndex(index);
        }

    };

    const toggleTask = (index) => {
        setTasks(
            tasks.map((ele, i) => (
                i == index ? {task: ele.task, completed: !ele.completed} : ele
            ))
        );
    };

    const filterTasks = tasks.filter((ele) => {
        if(filter == 'All') return ele;
        if(filter == 'Active') return ele.completed == false;
        if(filter == 'Completed') return ele.completed == true;
    });


  return (
    <div className='h-screen  bg-black  text-white  pt-15'>

    {/* Main Div */}
        <div className='bg-[#111]  rounded-2xl  p-8  max-w-150  m-auto  flex  flex-col  gap-5'>

    {/* Logo */}
            <div className='text-green-400  text-3xl  font-semibold'>TODO App</div>

    {/* Input & Button */}
            <div className='flex  gap-2'>

                <input 
                    value={task}
                    onChange={(e)=>{setTask(e.target.value)}}
                    onKeyDown={(e)=>{ e.key === 'Enter' && addTask()}}
                    className='px-5 py-3 bg-[#222] rounded-lg outline-none w-full' type='text' placeholder='Enter your task...'>
                </input>
                <button onClick={addTask} className='px-5 py-3 bg-green-400 rounded-lg text-[#222]'>ADD</button>

            </div>

    {/* Filter Section */}
            <div className='flex  justify-between  items-center'>

                <div className='flex  gap-2'>
                    <span onClick={()=> setFilter("All")} className={`px-3 py-2 rounded-sm    
                        cursor-pointer ${filter === 'All' ? 'bg-green-400  text-[#222]' : 'bg-[#222]'}`}>All
                    </span>

                    <span onClick={()=> setFilter("Active")} className={`px-3 py-2 rounded-sm    
                        cursor-pointer ${filter === 'Active' ? 'bg-green-400  text-[#222]' : 'bg-[#222]'}`}>Active
                    </span>

                    <span onClick={()=> setFilter("Completed")} className={`px-3 py-2 rounded-sm    
                        cursor-pointer ${filter === 'Completed' ? 'bg-green-400  text-[#222]' : 'bg-[#222]'}`}>Completed
                    </span>
                </div>

                <span className='text-xl'>{tasks.length} Task</span>

            </div>


    {/* Tasks */}

            <div className='flex  flex-col  gap-3  h-62.5  overflow-scroll  hide-scrollbar'>
                {
                    filterTasks.map((ele, index)=> (
                        <div className='flex  justify-between  bg-[#333]  px-4  py-3  rounded-lg  gap-5'>

                            {
                                editIndex === index ? (
                                    <input autoFocus={true} value={editTask} 
                                    onChange={(e) => setEditTask(e.target.value)} 
                                    onKeyDown={(e) => e.key == 'Enter' && editingTask(index)}
                                    className='outline-none  border-b-2  border-green-400  w-full'/>
                                ) : (
                                    <div className='flex  gap-2'>
                                        <input className='accent-green-400' type='checkbox' id={index}
                                            checked={ele.completed} onChange={()=>toggleTask(index)}
                                        />
                                        <label for={index} className={`text-lg  cursor-pointer  select-none 
                                            ${ele.completed && "line-through"}`}>
                                        {ele.task}</label>
                                    </div>

                                )
                            }

                            <div className='flex  gap-2'>
                                <span onClick={()=>deleteTask(index)} className='h-5  w-5  bg-red-400  rounded-full  cursor-pointer'></span>
                                <span onClick={()=> editingTask(index)} className={`h-5  w-5  rounded-full  cursor-pointer  ${editIndex === index ? 'bg-green-400' : 'bg-yellow-300'}`}>    
                                </span>
                            </div>

                        </div>
                    ))
                }
            </div>


    {/* Buttons */}
            <div className='flex  gap-3'>
                <button onClick={clearCompleted} className='px-3  py-2  rounded-lg  bg-red-400  cursor-pointer'>Clear Completed</button>
                <button onClick={clearAll} className='px-3  py-2  rounded-lg  bg-[#222]  cursor-pointer'>Clear All</button>
            </div>

        </div>

    </div>
  )
}

export default TodoApp;