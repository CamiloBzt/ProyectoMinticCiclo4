import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useForm2 } from '../../../hooks/useForm2';
import { dateToInputDate } from '../../../helpers/Helper';
import { TaskContext } from '../../../contexts/TaskContext';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function TaskModalEdit({ task, userId }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { dispatchTask } = useContext( TaskContext );
  const { formValues, handleEdit, handleInputChange } = useForm2({
    title: task.title,
    description: task.description,
    taskDate: task.date,
    priority: task.priority?.scale || 1,
    id: task['_id']
  }, dispatchTask, handleClose);

  const { title, description, taskDate, priority } = formValues;

  const body = (
    <div style={modalStyle} className={classes.paper}>

      <form onSubmit = { (ev) => handleEdit(ev, formValues, task.indice , userId) }>

        <h2 id="simple-modal-title">Edit Task  
          <span className = { `btn btn-outline-${ task.priority?.cssClass || 'success' }` }
            style={{
              marginLeft: '1.2rem'
            }}>
            {
              task.priority?.text || 'LOW'
            }
          </span>
        </h2>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title for your task.."
            name="title"
            value = {title}
            onChange = { handleInputChange }
            required
          />
        </div>
        <div class="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
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
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Priority
          </label>
          <div
            className="priority-options"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <input 
              type="radio" 
              name="priority" 
              class="btn-check" 
              id="btn-check-1" 
              autoComplete="off"
              onChange={ handleInputChange }
              value="1" 
              />
            <label class="btn btn-success" htmlFor="btn-check-1">Baja</label>

            <input 
              type="radio" 
              name="priority" 
              class="btn-check" 
              id="btn-check-2" 
              autoComplete="off"
              onChange={ handleInputChange }
              value="2"
              />
            <label class="btn btn-warning" htmlFor="btn-check-2">Media</label>

            <input 
              type="radio" 
              name="priority" 
              class="btn-check" 
              id="btn-check-3" 
              autoComplete="off"
              onChange={ handleInputChange }
              value="3"
              />
            <label class="btn btn-danger" htmlFor="btn-check-3">Alta</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
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
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Fecha:
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput2"
            value = { taskDate }
            pattern="\d{2}-\d{2}-\d{4}"
            name="taskDate"
            onChange = { handleInputChange  }
          />
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{
            "margin": "1rem auto",
          }}
        >
          Confirmar
        </button>

      </form>
    </div>
  );

  return (
    <div>
      <button 
                className="btn btn-outline-warning"
                onClick={ () => handleOpen() }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
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
