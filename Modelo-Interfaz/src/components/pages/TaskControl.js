import React from "react";
import  TaskCalendar  from "../task-control-components/task-calendar/TaskCalendar";
import { TaskManage } from "../task-control-components/task-manage/TaskManage";
import  { TaskTable }  from "../task-control-components/task-table/TaskTable";
import "./TaskControl.css";




export const TaskControl = () => {
  return (
    <div className="taskControl__container">

      <h1 className="taskControl__title">TASKS CONTROL</h1>

      <div className="taskControl__manage">
        <TaskManage />
      </div>

      <div className="taskControl__table">
        <TaskTable  />
      </div>

    <div className="taskControl__calendar">
      <TaskCalendar />
    </div>
      
    </div>
  )
}
