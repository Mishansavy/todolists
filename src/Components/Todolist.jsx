import React, { useEffect, useState } from "react";
import "./todolist.css";
import axios from "axios";

export default function Todolist() {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");

  function addActivity() {
    if (activity.trim() !== "") {
      axios
        .post("http://localhost:8000/api/todoitems/", { description: activity })
        .then((response) => {
          setListData([...listData, response.data]);
          setActivity("");
        })
        .catch((error) => console.error("Error adding todo item: ", error));
    }
  }

  function removeActivity(i) {
    const newListData = listData.filter((elem, id) => i !== id);
    setListData(newListData);
  }

  function editActivity(i) {
    setEditingIndex(i);
    setEditedText(listData[i].description);
  }

  function saveEdit() {
    if (editedText.trim() !== "") {
      const saveListData = listData.map((item, index) =>
        editingIndex === index ? { ...item, description: editedText } : item
      );
      setListData(saveListData);
      setEditingIndex(-1);
    }
  }

  function removeAll() {
    setListData([]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todoitems/")
      .then((response) => setListData(response.data))
      .catch((error) => console.error("Error fetching todo items: ", error));
  }, []);

  return (
    <div className="container">
      <div className="header">To-Do List</div>
      <input
        type="text"
        placeholder="Add List"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <button className="addlist" onClick={addActivity}>
        Add List
      </button>
      <div className="listHeading">Your List</div>
      {listData.map((data, i) => (
        <div key={i}>
          {editingIndex === i ? (
            <>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Edit your item..."
              />
              <button className="save" onClick={saveEdit}>
                Save
              </button>
            </>
          ) : (
            <>
              <div className="list-data">{data.description}</div>
              <div className="list-btn">
                <button className="btn" onClick={() => removeActivity(i)}>
                  Remove
                </button>
                <button className="btn" onClick={() => editActivity(i)}>
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      {listData.length > 0 && (
        <button className="removeall" onClick={removeAll}>
          Remove All
        </button>
      )}
    </div>
  );
}
