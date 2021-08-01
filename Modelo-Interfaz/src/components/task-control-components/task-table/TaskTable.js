import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from '../../../contexts/TaskContext';
import { UserContext } from "../../../contexts/UserContext";
import { getTasksFetch } from "../../../helpers/tasksFetch";
import types from "../../../types/types";
import TaskModalEdit from "../task-modal/TaskModalEdit";
import "./TaskTable.css";

export const TaskTable = React.memo( () => {

const { tasks, dispatchTask } = useContext( TaskContext );

const { user, dispatchUser } = useContext( UserContext );

  const onOpenEdit = (task) => {
    console.log(task);
  };


  const handleDelete = ( taskIdx, userId ) => {
    fetch('http://localhost:4000/api/delete/' + userId,  {
      method: 'PUT',
      body: JSON.stringify( { indice: taskIdx } ),
      headers: {
        'Content-Type': 'application/json'
      }
  })
        .then(res => res.json())
        .then(data => {
           getTasksFetch( userId )
            .then(data => {

              const tasks =  data.tareas.map(task => {
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

              dispatchTask({
                type:types.getTasks,
                payload: tasks
              });
            });
        });
  };


  return (
    <div className="table__container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Done</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {/* ROW 1 */}
             {
              tasks.map(( task, idx ) => (
              <tr key = { `${task.title}${task.description}${task.description?.scale}` }>
            <th scope="row">{ (idx + 1) }</th>
            <td>{ task.title }</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked
                />
              </div>
            </td>
            <td>
               <TaskModalEdit 
                    task={ {...task, indice: idx  }}
                    userId={ user['_id']  } />
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger" onClick={ () => handleDelete( idx, user['_id'] ) }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </td>
            <td className = { `table-${task.priority?.cssClass }` }>
              <span className="btn priority-text">
               {
                 task.priority?.text
               }
              </span>
            </td>
          </tr>
              ))
            }
         
                 </tbody>
      </table>
    </div>
  );
} );
