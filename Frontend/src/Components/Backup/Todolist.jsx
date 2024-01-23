import React, { useEffect, useState } from "react";
import "./todolist.css";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router";
export default function Todolist() {
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");
  const [listData, setListData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");
  //checking and showing the data of the
  // passing user data after logging in and adding uselocation

  const location = useLocation();
  const userData = location.state?.userData;

  // state to hold user description
  const [userDescription, setUserDescription] = useState("");

  //navigations
  const navigate = useNavigate();
  const Login = () => {
    navigate("/todolists/login");
  };

  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      addActivity();
    }
  };
  // logout

  const Logout = async () => {
    try {
      const logoutResponse = await axios.get(
        "http://127.0.0.1:8000/accounts/logout/",
        { message }
      );
      if (logoutResponse.data.message) {
        // setIsLoggedIn(false);
        console.log("your are logged out");
        navigate("/");
        console.log(message);
      }
    } catch (error) {
      console.error("logout error : ", error);
    }
  };

  function addActivity() {
    if (activity.trim() !== "") {
      axios
        .post("http://localhost:8000/api/todoitems/", {
          description: activity,
        })
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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/todoitems/")
  //     .then((response) => setListData(response.data))
  //     .catch((error) => console.error("Error fetching todo items: ", error));
  // }, []);
  useEffect(() => {
    if (userData) {
      // user data description field
      setUserDescription(userData.description);

      // fetch and set user-specific data based on user Id
      axios
        .get(
          `http://localhost:8000/accounts/register/user/${userData.user_id}/`
        )
        .then((response) => {
          setUserDescription(response.data.description);
        })
        .catch((error) => console.error("Error fetching user data: ", error));
    }
    // fetch and set list data
    axios
      .get("http://localhost:8000/api/todoitems/")
      .then((response) => setListData(response.data))
      .catch((error) => console.error("error fetching todo items: ", error));
  }, [userData]);

  return (
    <div className="container">
      <div className="header">To-Do List</div>
      {/* testing the login user data  */}
      <div>
        {userData ? (
          <h2 className="header">welcome {userData.user_name}</h2>
        ) : (
          <p>No user data available</p>
        )}
      </div>
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
      <button className="addlist" onClick={Login}>
        Login
      </button>
      <button
        style={{
          backgroundColor: "red",
          color: "#fff",
          border: "0px solid red",
          margin: "10px 10px",
          padding: "9px 10px",
          borderRadius: "11px",
        }}
        onClick={() => Logout()}
      >
        Logout
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
