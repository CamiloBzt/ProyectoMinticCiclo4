import React from "react";
import  TaskCalendar  from "../../components/task-control/task-calendar/TaskCalendar";
import { TaskManage } from "../../components/task-control/task-manage/TaskManage";
import TaskModal from "../../components/task-control/task-modal/TaskModal";
import  { TaskTable }  from "../../components/task-control/task-table/TaskTable";
import "./TaskControlView.css";

export const TaskControlView = () => {
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
};
