import React, { useMemo, useContext, useState, useEffect } from 'react';

export const COLUMNS = [

    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Title',
      accessor: 'title',
   /*    Cell: (value) => {
       return  <TaskModalEdit 
       task={ {...task, indice: idx  }}
       userId={ user['_id']  } />
      } */
    },
    {
      Header: 'Done',
      accessor: 'done'
    },
    {
      Header: 'Edit',
      accessor: 'edit'
    },
    {
      Header: 'Delete',
      accessor: 'delete'
    },
    {
      Header: 'Prioriy',
      accessor: 'priority'
    },
  ];