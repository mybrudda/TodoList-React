import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ desc: "", date: "", priority: "" });
  };

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };

  const columns = [
    { headerName: "Description", field: "desc", sortable: true,  floatingFilter: true,filter: true, floatingFilterComponentParams: { suppressFilterButton: true }},
    { headerName: "Date", field: "date", sortable: true, filter: true, floatingFilter: true , floatingFilterComponentParams: { suppressFilterButton: true }},
    { headerName: "Priority", field: "priority", sortable: true, filter: true, floatingFilter: true,  floatingFilterComponentParams: { suppressFilterButton: true },
        cellStyle: params => params.value == "High" ? {color: "red"} : {color: "black"}},
];

  return (
    <div className="info" >
        <div className="input-container">
             <h3>Add todo:</h3>
      <input
        type="text"
        name="desc"
        onChange={handleChange}
        value={todo.desc}
      />
      <input
        type="date"
        name="date"
        onChange={handleChange}
        value={todo.date}
      />
      <input
        type="text"
        name="priority"
        onChange={handleChange}
        value={todo.priority}
      />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={handleDelete}>Delete</button>

        </div>
     
      <div
        className="ag-theme-material" style={{ height: '500px', width: '600px' }}
       
      >
        <AgGridReact 
        
        rowSelection="single"
        ref={gridRef}
        onGridReady={params => gridRef.current = params.api}
        animateRows={true}
        columnDefs={columns} 
        rowData={todos}></AgGridReact>
      </div>
    </div>
  );
}

export default TodoList;
