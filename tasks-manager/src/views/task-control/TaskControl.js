import React from 'react';
import { TaskCalendar } from '../../components/task-control/task-calendar/TaskCalendar';
import { TaskTable } from '../../components/task-control/task-table/TaskTable';
import './TaskControl.css';

export const TaskControl = () => {
    return (
<div className="taskControl__container">

        <h1 className="taskControl__title">TASKS CONTROL</h1>

        <div class="input-group input-group-lg taskControl__search" style={{'max-width': '1000px'}}>
  <span class="input-group-text" id="inputGroup-sizing-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>

    </div>
    <button type="button" class="btn btn-success add-task">Add</button>

      <TaskTable />

</div>
    )
}
