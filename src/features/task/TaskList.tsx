import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncGet, selectTasks} from "./taskSlice";
import Style from "./TaskList.module.css"
import {fetchAsyncProf} from "../login/loginSlice";
import TaskItem from "./TaskItem";

const TaskList:React.FC = () => {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    useEffect(() =>{
        const fetchTaskProf = async()=>{
            await dispatch(fetchAsyncGet());
            await dispatch(fetchAsyncProf());
        }
        fetchTaskProf();
    },[dispatch]);

    return (
        <div>
            <ul className={Style.taskList}>
                {tasks.map(task=>(
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
