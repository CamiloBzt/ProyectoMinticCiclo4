import React, { useMemo, useContext, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { COLUMNS } from './columns';
import { TaskContext } from '../../../contexts/TaskContext';
import { UserContext } from "../../../contexts/UserContext";
import TaskModalEdit from "../task-modal/TaskModalEdit";
import types from "../../../types/types";
import { getTasksFetch } from "../../../helpers/tasksFetch";
import Swal from 'sweetalert2';

import './TaskTable.css';



export const TaskTable = () => {

  const { tasks, dispatchTask } = useContext(TaskContext);

  const { user, dispatchUser } = useContext(UserContext);

  const columns = useMemo(() => COLUMNS, []);


  const handleDelete = ( taskIdx, userId ) => {

    Swal.fire({
      title: 'Esta seguro que desea eliminar esta tarea?',
      text: "No será posible revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        const token = localStorage.getItem( 'token' );

        fetch('http://localhost:4000/api/delete/' + userId,  {
          method: 'PUT',
          body: JSON.stringify( { indice: taskIdx } ),
          headers: {
            'Content-Type': 'application/json',
            token
          }
      })
            .then(res => res.json())
            .then(data => {

              if (data?.message) {
                throw new Error(data.message);
              }

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
            })
            .catch(err => {
              if ('Error: Auth Failed'.localeCompare(err) === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sesión Finalizada',
                    text: 'Será enviado a login para iniciar una nueva sesión',
                    timer: 3000
                  }).then( data => {
                    localStorage.clear();
                    dispatchUser( { type: types.logout } );
                  });
            }
            });




        Swal.fire(
          'Eliminada!',
          'La tarea ha sido eliminada',
          'success'
        )
      }
    })




  
  };

  const data = useMemo(() => {

    console.log(tasks);

    return tasks.map( (task, idx ) => {

      const { title } = task;
      const done = (
        <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked
                />
              </div>
      );

      const edit = (
        <TaskModalEdit 
        task={ {...task, indice: idx  }}
        userId={ user['_id']  } />
      );

      const deleted = (
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
      );

      const priority = (
        <span 
          className=  { `btn priority-text btn-${task.priority?.cssClass}` }
          style= {{
            display: 'inline-block',
            width: '100%'
          }}
          >
         {
           task.priority?.text
         }
        </span>
      );

      const taskDate = (
        <span>
         { task.date }
        </span>
      );


      return {
        title,
        id: idx + 1,
        done,
        edit,
        delete: deleted,
        priority,
        date: taskDate
      }

    });

  }, [ tasks ]);

  const tableInstance = useTable({
    columns: COLUMNS,
    data,
  }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    pageOptions,
    setPageSize
  } = tableInstance;

  
  useEffect(() => {
    setPageSize(5);
  }, []);

  return (
    <>
    <div className="table__container">
    <table {...getTableProps()} >
      <thead style={{
        backgroundColor: '#004225',
      }}>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-success">
              {
                headerGroup.headers.map(colum => (
                  <th {...colum.getHeaderProps(colum.getSortByToggleProps())}>
                    {colum.render('Header')}
                {/*     <span>
                    {colum.isSorted
                      ? colum.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> */}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          page.map(row => {
            prepareRow(row);
            return (
              <tr { ...row.getRowProps() }>
                {
                  row.cells.map(cell => {
                 /*    console.log(cell); */
                    return  <td { ...cell.getCellProps() }>
                      {
                        cell.render('Cell')
                      }
                    </td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
     <div className="table__pagination">
       <span>
          Page{' '}
            <strong>{ state.pageIndex + 1 } of { pageOptions.length }</strong>
       </span>{ ' ' }
        <button 
          className="btn btn-primary" 
          onClick={ () => { previousPage() } }
          disabled={ !canPreviousPage }> Previous </button>
        <button 
          className="btn btn-primary" 
          onClick={ () => { nextPage() }}
          disabled={ !canNextPage }
          >Next</button>
     </div>
    </>
  )
}
