import React, { useEffect, useState } from "react";
import "./todolist.css";
import axios from "axios";

export default function Todolist() {
  const [activity, setActivity] = useState("");
  const [listData, setlistData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");

  function addActivity() {
    if (activity.trim() !== "") {
      setlistData((listData) => {
        const newlist = [...listData, activity];
        setActivity("");
        return newlist;
      });
    }
    //save todo item to the API
    axios
      .post("/api/todoitems/", { description: activity })
      .then((response) => {
        setlistData([...listData, response.data]);
        setActivity("");
      })
      .catch((error) => console.error("error adding todo item: ", error));
  }

  function removeActivity(i) {
    const newlistdata = listData.filter((elem, id) => i !== id);
    setlistData(newlistdata);
  }

  function editActivity(i) {
    setEditIndex(i);
    setEditedText(listData[i]);
  }

  function saveEdit(i) {
    if (editedText.trim() !== "") {
      const savelistdata = listData.map((item, index) =>
        i === index ? editedText : item
      );
      setlistData(savelistdata);
      setEditIndex(-1);
    }
  }

  function removeall() {
    setlistData([]);
  }
  useEffect(() => {
    //fetch todo items from the API when the components mounts
    axios
      .get("/api/todoitems")
      .then((response) => setlistData(response.data))
      .catch((error) => console.error("error fetching todo items: ", error));
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
      {listData.map((data, i) => {
        return (
          <div key={data}>
            {editIndex === i ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button className="save" onClick={() => saveEdit(i)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="list-data">{data}</div>
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
        );
      })}
      {listData.length > 0 && (
        <button className="removeall" onClick={removeall}>
          Remove All
        </button>
      )}
    </div>
  );
}
