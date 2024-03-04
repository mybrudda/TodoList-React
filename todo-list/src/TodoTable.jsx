import React from "react";

function TodoTable({ todos, handleDelete }) {
    return (
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
                            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;