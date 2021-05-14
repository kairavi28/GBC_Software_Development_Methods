import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, updateTodo, removeHandler }) => (
<div>
    {
        todos.map((t,i) => (
            <TodoItem key={i} todo={t} updateTodo={updateTodo} removeHandler={removeHandler} />
        ))
    }
</div>
);

export default TodoList;
