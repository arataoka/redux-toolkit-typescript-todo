import React from 'react';
import Style from './App.module.css';
import {FaSignInAlt} from "react-icons/all";
import TaskList from "./features/task/TaskList";
import TaskDetail from "./features/task/TaskDetail";
import TaskInput from "./features/task/TaskInput";
import Header from "./features/login/Header";

function App() {
  const Logout=()=>{
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  }
  return (
<div className={Style.containerTasks}>
  <div className={Style.appTasks}>
    <button className={Style.signBtn} onClick={Logout}>
      <FaSignInAlt/>
    </button>
    <Header/>
    <TaskInput/>
    <TaskList/>
  </div>
  <div className={Style.appDetails} >
    <TaskDetail/>
  </div>
</div>
  );
}

export default App;
