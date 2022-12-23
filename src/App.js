import React, { useState, useEffect } from "react";
import Lister from "./List";
import Alert from "./Alert";

function getLocalStorage() {
  let listHolder = localStorage.getItem("List");
  if (listHolder) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [List, setList] = useState(getLocalStorage());
  const [Editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alart, setAlert] = useState({ show: false, message: "", type: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      // dispaly alert
      showAlert(true, "danger", "Please input a value");
    } else if (name && Editing) {
      // start controls editting
      setList(
        List.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      showAlert(true, "success", "item successfully editted");
      setEditing(false);
    } else {
      // adds items to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...List, newItem]);
      setName(" ");
      showAlert(true, "success", "Added successfully");
    }
  }

  function showAlert(show = false, type = "", message = "") {
    setAlert({ show, message, type });
  }

  const clearList = () => {
    // Removes every item from the list
    setList([]);
    showAlert(true, "danger", "List successfully cleared");
  };

  const removeItem = (id) => {
    // Removes specific items from the list with the matching id
    showAlert(true, "danger", "item removed");
    setList(List.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const sItem = List.find((item) => item.id === id);
    setEditing(true);
    setEditId(id);
    setName(sItem.title);
    // end controls editting
  };

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(List));
  }, [List]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alart.show && <Alert {...alart} removeAlart={showAlert} List={List} />}
        <h3>To Do List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g jogging"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {Editing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {List.length > 0 && (
        <div className="grocery-container">
          <Lister items={List} remove={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
