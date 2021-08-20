import React, { useState, useEffect, useContext, useRef } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { UserContext } from '../../../contexts/UserContext';
import TaskModalByDate from '../task-modal/TaskModalByDate';

import './TaskCalendar.css';

export default function TaskCalendar() {

  const [value, onChange] = useState(new Date());
  const [filteredTasks, setfilteredTasks] = useState([]);
  const { user } = useContext( UserContext );
  const firstRender = useRef(true);

  const searchTaskByDate = ( tasks ) => {
    return tasks.filter( t => {
      const taskDate = new Date(t.date);
      taskDate.setDate(taskDate.getDate() + 1);
      return taskDate.toLocaleDateString() === value.toLocaleDateString();
    });

  };

  useEffect(() => {

    if (firstRender.current) {
        firstRender.current = false;
    }
    else {
      console.log( user );
      setfilteredTasks( searchTaskByDate( user?.tasks ) );
    }
  }, [ value ]);


  return (
    <div className="calendar-container">
    <TaskModalByDate 
      filteredTasks={ filteredTasks } 
    />
    <Calendar
        onChange={onChange}
        value={value}
      />
    </div>


    
    
  );
}
