import React from 'react';
import Style from "./TaskItem.module.css";
import {fetchAsyncDelete,selectTask,editTask} from "./taskSlice";
import {useDispatch} from "react-redux";
import {BsTrash, FaEdit} from "react-icons/all";
import {taskType} from "../../types/type.js"

type TaskProps ={
    task:taskType
}

const TaskItem:React.FC<TaskProps> = ({task}) => {
    const dispatch = useDispatch();
    return (
        <li className={Style.listItem}>
            <span className={Style.cursor} onClick={()=> dispatch(selectTask(task))}>
                {task.title}
            </span>
            <div>
                <button
                onClick={()=>dispatch(fetchAsyncDelete(task.id))}
                className={Style.taskIcon}
                >
                    <BsTrash/>

                </button>
                <button onClick={()=>dispatch(editTask(task))}
                className={Style.taskIcon}
                >
                    <FaEdit/>
                </button>
            </div>

        </li>
    );
};

export default TaskItem;
