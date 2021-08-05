import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export default function TaskCalendar() {

  const [value, onChange] = useState(new Date());

  console.log(value);


  return (
    
      <Calendar
        onChange={onChange}
        value={value}
      />
    
  );
}
