import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { UserContext } from '../../../contexts/UserContext';

import './TaskModalGeneric.css';

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

export default function TaskModalList({ searchForm: { search } }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [filteredTasks, setfilteredTasks] = useState([]);
    const { user } = useContext(UserContext);

    const searchTasksByTitle = ( tasks=[] ) => {

        if (tasks.length === 0) handleClose();

        return tasks.filter(t => t.title.includes( search ));
    }


    useEffect(() => {
        if (!open) return;
        setfilteredTasks( searchTasksByTitle( user?.tasks ) );
    }, [ open ]);


    const handleOpen = () => {
        !!search && setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
                { 
                    filteredTasks.map( (task,idx) => (
                        <div key={`${task.title}${idx}`}>
                            <h2 id="simple-modal-title"
                                className="task__title">{ task.title }</h2>
                            <p id="simple-modal-description"
                                className="task__text">{ task.description }</p>
                            <hr/>
                        </div>
                    ))
                }

        </div>
    );

    return (
        <div>
            <button 
                type="button"
                onClick={handleOpen}
                style={{
                    width:'80px',
                    height: '3rem'
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
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

















































