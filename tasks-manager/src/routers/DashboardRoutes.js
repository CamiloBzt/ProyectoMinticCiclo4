import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { Navbar } from '../components/navbar/Navbar';
import { TaskControlView } from "../views/task-control/TaskControlView";
import { TaskHomeView } from "../views/tasks-home/TaskHomeView";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/home" component={ TaskHomeView } /> 
                    <Route exact path="/task-control" component={ TaskControlView }/>
                    <Redirect to="/home" />
                </Switch>  
            </div>  
        </>
    )
}
