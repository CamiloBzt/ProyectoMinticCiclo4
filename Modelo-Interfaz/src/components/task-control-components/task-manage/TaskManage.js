import React, { useState } from "react";
import "./TaskManage.css";
import TaskModal from "../task-modal/TaskModal";
import TaskModalList from "../task-modal/TaskModalList";
import { useForm2 } from "../../../hooks/useForm2";

export const TaskManage = ({ setUpdate, update }) => {

  const [edit, setedit] = useState(false);

  const { handleInputChange, formValues } = useForm2({ search: '' });


  return (
    <div className="manage__container">
      <div
        className="input-group input-group-lg task__input"
        style={{
          width: "60%",
          "max-width": "800px"
        }}
      >
        <TaskModalList searchForm={ formValues } />

        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          name="search"
          onChange={ handleInputChange }
        />
      </div>

      <div className="btn-group">
        <TaskModal setUpdate={setUpdate} update={update}/>
      {/*   <button type="button" className="btn btn-success btn-statistics">
          Statistics
        </button> */}
      </div>
    </div>
  );
};
