import React, { useReducer, useContext } from "react";
import { useTasksUpdate } from "../../hooks/useUpdateTasks";
import TaskCalendar from "../task-control-components/task-calendar/TaskCalendar";
import { TaskManage } from "../task-control-components/task-manage/TaskManage";
import { TaskTable } from "../task-control-components/task-table/TaskTable";
import { TaskTable2 } from "../task-control-components/task-table/TaskTable2";
import { TaskContext } from '../../contexts/TaskContext';
import taskReducer from "../../reducers/TaskReducer";
import { UserContext } from "../../contexts/UserContext";
import userReducer from "../../reducers/userReducer";

import "./TaskControl.css";
import { useEffect } from "react";
import { getTasksFetch } from "../../helpers/tasksFetch";
import types from "../../types/types";
import { capitalize } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";



const initTasks = (user) =>  {

 // console.log(user);

  const tks = user?.tareas?.map(task => {

    return {
      ...task,
      priority: {
          scale: task.priority,
         get text() {
              switch (task.priority) {
                  case '1': return  'LOW'
                  case '2': return 'MEDIUM'
                  case '3': return 'HIGH'
                  default: return 'LOW'
              }
          },
          get cssClass() {
              switch (task.priority) {
                  case '1': return  'success'
                  case '2': return 'warning'
                  case '3': return 'danger'
                  default: return 'success'
              }
          }
      }
  }

  });

const tasksStorage = JSON.parse(localStorage.getItem('tasks'));

 if (tasksStorage && tasksStorage.length > 0 ) {
    return tasksStorage;
 }
 else if(tks) {
  return tks;
 } 
 else {
   return [];
 }

};


export const TaskControl = () => {

  const { user, dispatchUser } = useContext( UserContext );

  const [ tasks , dispatchTask ] = useReducer( taskReducer , [] , () => initTasks(user));

  

  useEffect(() => {
    localStorage.setItem( 'tasks', JSON.stringify( tasks ));
    dispatchUser({
      action: types.getUser,
      payload: {
        ...user,
        tasks,
      },
    });
  }, [ tasks ]);

  return (

      (user?.auth === false) ?

      <Redirect to="/" />

      :
      <div className="taskControl__container">

      <h1 className="taskControl__title">TASKS CONTROL <h3>({ user?.name })</h3></h1>

        <TaskContext.Provider value = { { tasks, dispatchTask } }>

        <div className="taskControl__manage" >
          <TaskManage />
        </div>

        <div className="taskControl__table" >
          <TaskTable />
        </div>

        <div className="taskControl__calendar">
          <TaskCalendar />
        </div>

        </TaskContext.Provider>


    </div>
  
  )
} ;
