import React, { useState } from "react";
import "./TaskManage.css";
import TaskModal from "../task-modal/TaskModal";

export const TaskManage = ({ setUpdate, update }) => {

  const [edit, setedit] = useState(false);

  return (
    <div className="manage__container">
      <div
        className="input-group input-group-lg task__input"
        style={{
          width: "60%",
          "max-width": "800px"
        }}
      >
        <span className="input-group-text" id="inputGroup-sizing-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
        />
      </div>

      <div className="btn-group">
        <TaskModal setUpdate={setUpdate} update={update}/>
        <button type="button" className="btn btn-success btn-statistics">
          Statistics
        </button>
      </div>
    </div>
  );
};
