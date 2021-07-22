import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import "./TaskModal.css";
import { useForm } from "../../../hooks/useForm";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${55}%`,
    left: `${50}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: 650,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TaskModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [formValues, handleInputChange, handleFormSubmit] = useForm({
    title: '',
    description: '',
    taskDate: ''
  });

  const { title, description, taskDate } = formValues;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const body = (
    <div style={modalStyle} className={classes.paper}>

    <form onSubmit = { handleFormSubmit }>

      <h2 id="simple-modal-title">New Task</h2>

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Title for your task.."
          name="title"
          value = { title }
          onChange = { handleInputChange }
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="description"
          value = { description }
          onChange = { handleInputChange }
        ></textarea>
      </div>

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Priority
        </label>
        <div
          className="priority-options"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn btn-success">
            Baja
          </button>
          <button type="button" class="btn btn-warning">
            Media
          </button>
          <button type="button" class="btn btn-danger">
            Alta
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Recordar:
        </label>
        <div className="remember-btn-group">
        <button type="button" class="btn btn-outline-info">
            SI
          </button>
          <button type="button" class="btn btn-outline-info">
            NO
          </button>
        </div>
       
      </div>

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Fecha:
        </label>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput2"
          name="taskDate"
          value = { taskDate }
          onChange = { handleInputChange }
        />
      </div>

      <button 
        className="btn btn-success"
        type="submit"
        style={{
            "margin": "1rem auto",
        }}>
            CREAR
        </button>

        </form>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        style={{ height: "50px" }}
        className="btn btn-success"
        onClick={handleOpen}
      >
        New Task
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
