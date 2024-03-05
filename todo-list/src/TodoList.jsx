import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState({ desc: "", date: "" });
    const [todos, setTodos] = useState([]);

    const addTodo = (e) => {
        e.preventDefault(); 
        setTodos([...todos, todo]);
        setTodo({ desc: "", date: "" }); 
    }

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

    const handleDelete = (index) => {
        let reducedTodo = [...todos];

        reducedTodo.splice(index, 1);

        setTodos(reducedTodo);
    }

    return (
        
            <div class="info">

                <div class="add-todo">
                    <h3>Add todo:</h3>
                    <input class="one" type="text" name="desc" placeholder="Description" onChange={handleChange} value={todo.desc} />
                    <input class="one" type="date" name="date" placeholder="Date" onChange={handleChange} value={todo.date} />
                    <button onClick={addTodo}>Add Todo</button>
                </div>
            
            
                <TodoTable todos={todos} handleDelete={handleDelete} />

            
       </div>
    );
}

export default TodoList;