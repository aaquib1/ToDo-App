import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [listOfToDo, setListOfTodo] = useState([]);
  const [nameTodo, setTodoName] = useState("");
  const [todoContent, setTotdoContent] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getTodo")
      .then((res) => {
        console.log(res.data);
        setListOfTodo(res.data);
      })
      .catch((err) => console.log(err.message));
    return () => {};
  }, []);
  const addTodo = () => {
    const data = {
      nameTodo,
      todoContent,
    };
    console.log(data)
    axios
      .post("http://localhost:5000/addTodo", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };
  const deleteTodo = () => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/deleteTodo/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }
  const updateTodo = () => {
    const data = {
      nameTodo,
      todoContent,
    };
    console.log(data)
    axios
      .put(`http://localhost:5000/updateTodo/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }
  return (
    <div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name='todoName'
          value={nameTodo}
          onChange={(e) => {
            setTodoName(e.target.value)
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Example textarea
        </label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name='todoContent'
          value={todoContent}
          onChange={(e) => {
            setTotdoContent(e.target.value)
          }}
        ></textarea>
        <button onClick={()=>addTodo()} className=" btn btn-success">Add</button>
      </div>
      {listOfToDo.map((item, key) => (
        <div>
          <ul class="list-group" key={key}>
            <li class="list-group-item" onClick={()=>setId(item._id)}>{item.nameTodo}</li>
            <li class="list-group-item">{item.todoContent}</li>
          </ul>
          <button className=" btn btn-warning" onClick={()=>updateTodo()}>Edit</button>

          <button className=" btn btn-danger" onClick={()=>deleteTodo()}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
