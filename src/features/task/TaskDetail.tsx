import React, {useEffect} from "react";
import styles from "./TaskDetail.module.css";
import { useSelector } from "react-redux";
import { selectSelectedTask } from "./taskSlice";

const TaskDetails = () => {
    const selectedTask = useSelector(selectSelectedTask);
    console.log(selectedTask)
    return (
        <div className={styles.details}>
            {selectedTask.title && (
                <>
                    <h2>{selectedTask.title}</h2>
                    <p>Created at </p>
                    <h3>{selectedTask.created_at}</h3>
                    <p>Updated at </p>
                    <h3>{selectedTask.updated_at}</h3>
                </>
            )}
        </div>
    );
};

export default TaskDetails;