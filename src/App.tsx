import './App.css';
import { useState } from 'react';

export default function App() {
  const initialItems = [
    { id: 1, text: 'Create', done: false },
    { id: 2, text: 'Awesome', done: false },
    { id: 3, text: 'Code', done: true },
  ];

  const initialNewTodo = 'test';
  const [items, setItems] = useState(initialItems);
  const [newTodoValue, setNewTodoValue] = useState(initialNewTodo);

  function generateNewId() {
    const maxId = items.reduce((acc, val) => {
      acc = acc === undefined || acc < val.id ? val.id : acc;
      return acc;
    }, 0);
    return maxId + 1;
  }

  function addTodo() {
    setItems([
      ...items,
      { id: generateNewId(), text: newTodoValue, done: false },
    ]);
    setNewTodoValue('');
  }

  function updateTodoStatus(itemId: number) {
    setItems(
      items.map((item) => {
        return item.id === itemId ? { ...item, done: !item.done } : item;
      })
    );
  }

  function deleteTodo(itemId: number) {
    const newItems = items.filter((item) => {
      return item.id !== itemId;
    });
    setItems(newItems);
  }

  return (
    <>
      <div className="main-container">
        <h1>React Todo list</h1>
        <div className="add-todo-container">
          <label>Add todo</label>
          <input
            type="text"
            name="newTodo"
            value={newTodoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
          />
          <button
            disabled={newTodoValue === ''}
            className="secondary"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <hr />
        <div className="todo-list-container">
          {items.map((item) => {
            return (
              <TodoItem
                item={item}
                updateTodoStatus={updateTodoStatus}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function TodoItem({item, updateTodoStatus, deleteTodo}: {item: any, updateTodoStatus: any, deleteTodo: any}) {
  return (
    <div className="todo-item-container">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => updateTodoStatus(item.id)}
      />
      <span style={{ textDecorationLine: item.done ? 'line-through' : '' }}>
        {item.text}
      </span>
      <button className="danger" onClick={() => deleteTodo(item.id)}>
        {' '}
        Delete{' '}
      </button>
    </div>
  );
}
