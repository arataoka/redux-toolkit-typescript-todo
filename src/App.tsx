import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Style from './App.module.css';

import {FaSignInAlt} from "react-icons/all";
import TaskList from "./features/task/TaskList";
import TaskDetail from "./features/task/TaskDetail";

function App() {
  const Logout=()=>{
    localStorage.removeItem("lovalJWT");
    window.location.href = "/";
  }
  return (
<div className={Style.containerTasks}>
  <div className={Style.appTasks}>
    <button className={Style.signBtn} onClick={Logout}>
      <FaSignInAlt/>
    </button>
    <TaskList/>
  </div>
  <div className={Style.appDetails} >
    <TaskDetail/>
  </div>
</div>
  );
}

export default App;
