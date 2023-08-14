/* eslint-disable*/
import React, { useState, useEffect } from "react";
import "./todo.css";

const Todo = () => {
  let [todo, setTodo] = useState(["할 일"]);
  let [todoText, setAddTodoText] = useState("");

  return (
    <div className="toDo-div col">
      <p className="title">Focus TO DO</p>
      {/* TodoList 목록 */}
      <div className="toDoList-div">
        {todo.map(function (text, i) {
          return (
            <div className="toDoList row">
              <input type="checkbox" className="col-1" />
              <p className="text col">{text}</p>
              <button onClick={() => {
                let newTodo = [...todo];
                newTodo.splice(i, 1);
                setTodo(newTodo);
              }} className="col-1 del-btn">X</button>
            </div>
          );
        })}
      </div>
      {/* TodoList 목록 끝 */}
      {/* 할일 추가 창 */}
      <div className="AddToDo-div">
        <input
          type="text"
          value={todoText}
          onChange={(e) => {
            setAddTodoText(e.target.value);
          }}
          placeholder="할 일 추가하기"
        />
        <input
          type="button"
          onClick={() => {
            setTodo([todoText, ...todo]);
            setAddTodoText(""); //
          }}
          value="+"
        />
      </div>
      {/* 할일 추가 창 끝 */}
   </div>
  )
}

export default Todo;