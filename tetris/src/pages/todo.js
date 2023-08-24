/* eslint-disable*/
import React, { useState, useEffect } from "react";
import "./todo.css";

import { authService } from "./../fbase";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const Todo = (props) => {
  let [todo, setTodo] = useState([]);
  let [todoText, setAddTodoText] = useState("");
  const [userObj, setUserObj] = useState(props.userObj);
  let [data, setData] = useState();
  let [id, setId] = useState();

  useEffect(() => {
    getData();
  }, []);

  //todo 목록 불러오기
  async function getData() {
    const dbProblems = await getDocs(query(collection(dbService, "user")));
    dbProblems.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      if (dataObj.email === userObj.email) {
        setTodo(dataObj.todos);
        setData(dataObj);
        setId(dataObj.id);
      }
    });
  }

  //todo update
  const todoRdf = doc(dbService, "user", `${id}`);

  async function onSubmit(event) {
    await setTodo([todoText, ...todo]);
    await updateDoc(todoRdf, {
      todos : [todoText, ...todo],
    });
  }

  return (
    <div className="toDo-div">
      <p className="title">Focus TO DO</p>
      {/* TodoList 목록 */}
      <div className="toDoList-div">
        {todo.map(function (text, i) {
          return (
            <div className="toDoList row" key={i}>
              <p className="text col">{text}</p>
              <button
                onClick={() => {
                  let newTodo = [...todo];
                  newTodo.splice(i, 1);
                  setTodo(newTodo);
                  updateDoc(todoRdf, {
                    todos : newTodo 
                  });
                }}
                className="col-1 del-btn"
              >
                X
              </button>
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
            onSubmit();
            setAddTodoText("");
          }}
          value="+"
        />
      </div>
      {/* 할일 추가 창 끝 */}
    </div>
  );
};

export default Todo;
