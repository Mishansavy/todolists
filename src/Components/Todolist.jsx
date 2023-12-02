import React, { useEffect, useState } from "react";
import "./todolist.css";
import axios from "axios";
import moment from "moment";

export default function Todolist() {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");
  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      addActivity();
    }
  };
  function addActivity() {
    if (activity.trim() !== "") {
      axios
        .post("http://localhost:8000/api/todoitems/", { description: activity })
        .then((response) => {
          setListData([...listData, response.data]);
          setActivity("");
          console.log(response.data);
        })
        .catch((error) => console.error("Error adding todo item: ", error));
    }
  }

  function removeActivity(i) {
    const itemToDelete = listData[i];
    axios
      .delete(`http://localhost:8000/api/todoitems/${itemToDelete.id}/`)
      .then((response) => {
        const newListData = listData.filter(
          (item) => item.id !== itemToDelete.id
        );
        setListData(newListData);
      })
      .catch((error) => console.error("Error deleting todo item: ", error));
  }

  function editActivity(i) {
    setEditingIndex(i);
    setEditedText(listData[i].description);
  }

  function saveEdit() {
    if (editedText.trim() !== "") {
      const itemToEdit = listData[editingIndex];
      const updatedItem = { ...itemToEdit, description: editedText };

      axios
        .put(
          `http://localhost:8000/api/todoitems/${itemToEdit.id}/`,
          updatedItem
        )
        .then((response) => {
          const updatedListData = listData.map((item) =>
            item.id === itemToEdit.id ? response.data : item
          );
          setListData(updatedListData);
          setEditingIndex(-1);
        })
        .catch((error) => console.error("Error editing todo item: ", error));
    }
  }

  // function removeAll() {
  //   setListData([]);
  // }

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
        onKeyPress={handlekeypress}
      />

      <button className="addlist" onClick={addActivity}>
        Add List
      </button>
      <div className="listHeading">Your List</div>
      {listData.map((data, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            margin: "10px",
            gap: "20px",
            width: "auto",
            alignItems: "center",
          }}
        >
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
              <div className="list-time">
                {moment(data?.created_at).format("YYYY-MM-DD")}
              </div>
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
      {/* {listData.length > 0 && (
        <button className="removeall" onClick={removeAll}>
          Remove All
        </button>
      )} */}
    </div>
  );
}
