import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const Lister = ({items,remove,editItem}) => {
  return <div className="grocery-List">
    {items.map(cap =>{
      const {id, title} =cap;
      return (
        <article key={id} className="grocery-item">
          <p className="title">{title}</p>
          <div className="btn-container">
            <button className="edit-btn" type="button" onClick={() => editItem(id)}>
              <FaEdit />
            </button>
            <button
              className="delete-btn"
              type="button"
              onClick={() => remove(id)}
            >
              <FaTrash />
            </button>
          </div>
        </article>
      );
    })}
  </div>
}

export default Lister
