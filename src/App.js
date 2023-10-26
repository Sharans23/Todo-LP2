import React,{useState,useEffect} from 'react';
import Delete from "./Components/Delete.jsx";
import Done from "./Components/Done.jsx";
import "./App.css";
// import List from "./Components/List.jsx";


function App() {
  const[isCompleteScreen,setIsCompleteScreen]=useState(false);
  const[allTodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTask,setCompletedTask]=useState([]);




  const handleAddToDo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    };
    let updatedToDoArr=[...allTodos];
    updatedToDoArr.push(newTodoItem);
    setTodos(updatedToDoArr);
    localStorage.setItem('list',JSON.stringify(updatedToDoArr))
      setNewTitle("");
      setNewDescription("");
  }
// delete
  const handleDeleteTodo=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('list',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
// up
      // const updatedTodoArr = allTodos.filter((_, i) => i !== index);

      // localStorage.setItem('List', JSON.stringify(updatedTodoArr));
      // setTodos(updatedTodoArr);
  }

//   const handleDeleteTodo = (index) => {
//   // Create a new array by filtering out the item to delete
//   // const updatedTodoArr = allTodos.filter((index,i) => index !== index);

//   // // Update the state and local storage with the new array
//   // setTodos(updatedTodoArr);
//   // localStorage.setItem('list', JSON.stringify(updatedTodoArr));
//   console.log(index);
// }

  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTask];
    reducedTodo.splice(index);
    localStorage.setItem('completedTask',JSON.stringify(reducedTodo));
    setCompletedTask(reducedTodo);
  };

  const handleCompleteTodo=(index)=>{
    console.log("hello complete");
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth() + 1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd + '-' + mm + '-' + yyyy + 'at' + h +':' + m + ':' + s;

    let filterdItem={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr=[...completedTask];
    updatedCompletedArr.push(filterdItem);
    setCompletedTask(updatedCompletedArr);
    handleDeleteTodo(index);
        localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
       

  }



  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('List'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTask(savedCompletedTodo);
    }
  },[])

  //     useEffect(() => {
  //       localStorage.setItem(localStorage.getItem('List'), JSON.stringify(List));
  //   }, [List]);

  return (
    <div className="App">
      <h1>TO DO LIST</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="input-item ">
            <label>Title</label>
            {/* <br /> */}
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Enter the title" />
          </div>
          {/* <br /> */}
          <div className="input-item ">
            <label>Description</label>
            {/* <br /> */}
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Enter description of the task" />
          </div>
          <div className="input-item ">
            <button type="button" onClick={handleAddToDo} className="Add-btn">Add</button>
          </div>
        </div>

        <div className="btns">
          <button 
            className={`secondaryBtn ${isCompleteScreen===false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)} 
          >
            Todo
          </button>

          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)} 
          >
              Completed
          </button>
    </div>
    {/* <List/> */}
    
    <div className="list">
      {/* <div className="list-item">
        <div>
          <h3>Task</h3>
          <p>Desciption</p>
        </div>
        <div className='icon'>
          <Delete className="delete"/>
          <Done className="done"/>
        </div>
      </div>
       */}
       {isCompleteScreen===false && allTodos.map((item,index)=>{
        return(
          <div className="list-item" key={index}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <div className='icon'>
          <Delete className="delete" onClick={()=>handleDeleteTodo(index)} title="delete?"/>
          <Done className="done" onClick={()=>handleCompleteTodo(index) } title="done?"/>
        </div>
      </div>
        );
       })}

       {isCompleteScreen===true && completedTask.map((item,index)=>{
        return(
          <div className="list-item" key={index}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed On:{item.completedOn}</small></p>
        </div>
        <div className='icon'>
          <Delete className="delete" onClick={()=>handleDeleteCompletedTodo(index)} title="delete?"/>
        </div>
      </div>
        );
       })}

    </div>
      <div/>
      </div>
    </div>
  );
}

export default App;
