import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import Icon from "./images/icon.png";

function ToDoList() {
  const listStorage = localStorage.getItem("List");

  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);

  function addItem(form) {
    form.preventDefault();
    if (!newItem) {
      return;
    }
    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.getElementById("entry-input").focus();
  }

  function clicked(index) {
    const auxList = [...list];
    auxList[index].isCompleted = !auxList[index].isCompleted;
    setList(auxList);
  }

  function deleted(index) {
    const auxList = [...list];
    auxList.splice(index, 1);
    setList(auxList);
  }

  function allDeleted() {
    setList([]);
  }

  return (
    <div className="main">
      <h1>To Do List</h1>
      <form onSubmit={addItem}>
        <input
          id="entry-input"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          type="text"
          placeholder="Add task"
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>

      <div className="taskList">
        <div style={{ textAlign: "center" }}>
          {list.length < 1 ? (
            <img className="icon" src={Icon} />
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className={item.isCompleted ? "item completed" : "item"}
              >
                <span
                  onClick={() => {
                    clicked(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    deleted(index);
                  }}
                  className="del"
                >
                  Delete
                </button>
              </div>
            ))
          )}

          {list.length > 0 && (
            <button
              onClick={() => {
                allDeleted();
              }}
              className="deleteAll"
            >
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
