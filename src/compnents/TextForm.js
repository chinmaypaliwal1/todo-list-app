import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Extra spaces removed!", "success");
  };

  const addTodo = () => {
    if (text.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: text, completed: false }]);
      setText("");
      props.showAlert("Todo added!", "success");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    props.showAlert("Todo removed!", "success");
  };

  return (
    <>
<div className="contentmain-con">
    <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          {/* <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
            id="myBox"
            rows="8"
          ></textarea> */}
        </div>
        <div className="mb-3 todo-input-btn">
          <input
            type="text"
            value={text}
            onChange={handleOnChange}
            placeholder="Add a new todo"
            className="form-control my-2 todo-list"
          />
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>   
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button className="btn btn-secondary my-2" onClick={addTodo}>Add</button>
        </div>
        <div className="my-3 text-center" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </div>
   
      <div className="container-secnd my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1>Todo List</h1>
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="form-check-input me-2"
                />
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
</div>
    </>
  );
}
