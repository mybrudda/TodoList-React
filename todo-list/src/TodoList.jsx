import { useState } from "react";

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
            
            
            

            <table>
    <thead>
        <tr>
            <th className="header-cell">Description</th>
            <th className="header-cell">Date</th>
            <th className="header-cell">Action</th> 
        </tr>
    </thead>
    <tbody>
        {todos.map((todo, index) => (
            <tr key={index}>
                <td className="todo">{todo.desc}</td>
                <td className="date">{todo.date}</td>
                <td>
                    <button class="delete-btn"onClick={() => handleDelete(index)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
       </div>
    );
}

export default TodoList;