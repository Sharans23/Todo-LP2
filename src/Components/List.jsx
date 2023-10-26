import react from 'react';
import Delete from "./Delete";
import Done from "./Done.jsx";
export default function List(){
    return(
         <div className="list">
      <div className="list-item">
        <div>
          <h3>Task</h3>
          <p>Desciption</p>
        </div>
        <div className='icon'>
          <Delete className="delete"/>
          <Done className="done"/>
        </div>
      </div>
      
    </div>
    );
}