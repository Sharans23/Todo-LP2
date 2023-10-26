import React,{useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Delete(){
      const[allTodos,setTodos]=useState([]);
//      const handleDeleteTodo = (index) => {
//   // Create a new array by filtering out the item to delete
//   // const updatedTodoArr = allTodos.filter((index,i) => index !== index);

//   // // Update the state and local storage with the new array
//   // setTodos(updatedTodoArr);
//   // localStorage.setItem('list', JSON.stringify(updatedTodoArr));
//   console.log('hello');
// }
  const handleDeleteTodo=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('list',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
    console.log("hello delete");
  }

    return (
        <DeleteIcon onClick={(index)=>handleDeleteTodo()}/>
    )
}