import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import './TaskModal';

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
    width: 600,
    minHeight: '600px',
    height: '75vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    overflow: 'scroll'
  },
}));

export default function TaskModalByDate({ filteredTasks }) {
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

  useEffect(() => {

    if (filteredTasks.length === 0) return;

    handleOpen();

  }, [ filteredTasks ])

  const body = (
    <div style={modalStyle} className={classes.paper}>
        { 
                    filteredTasks.map( (task,idx) => (
                        <div key={`${task.title}${idx}`}>
                            <h2 id="simple-modal-title"
                            className="task__title">{ task.title }</h2>
                            <p id="simple-modal-description"
                            className="task__text">{ task.description }</p>
                            <p id="simple-modal-description">{ task.date }</p>
                            <hr/>
                        </div>
                    ))
                }
    </div>
  );

  return (
    <div>
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
