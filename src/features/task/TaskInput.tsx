import React from 'react';
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from "react-redux";
import styles from "./TaskInput.module.css"
import {
    fetchAsyncCreate,
    fetchAsyncUpdate,
    editTask,
    selectEditedTask
} from "./taskSlice";

const BEFORE_ASSERTED_ID = 0;


const TaskInput = () => {
        const dispatch = useDispatch();
        const editedTask = useSelector(selectEditedTask);
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            editedTask.id === BEFORE_ASSERTED_ID ? dispatch(editTask({
                    id: BEFORE_ASSERTED_ID,
                    title: event.target.value,
                }))
                :
                dispatch(editTask({
                    id: editedTask.id,
                    title: event.target.value,
                }))
        }
        const isDisabled = editedTask.title.length === 0
        const createClicked = () =>{
            dispatch(fetchAsyncCreate(editedTask));
            dispatch(editTask({id:BEFORE_ASSERTED_ID,title:''}));
        }
        const updateClicked = () =>{
            dispatch(fetchAsyncUpdate(editedTask));
            dispatch(editTask({id:BEFORE_ASSERTED_ID,title:''}))
        }


            return(
                <div>
                    <input type="text"
                           className={styles.taskInput}
                           value={editedTask.title}
                           onChange={handleInputChange}
                           placeholder="Please input task"
                    />
                    <div className={styles.switch}>
                        {editedTask.id === BEFORE_ASSERTED_ID ?
                            (<Button
                                variant="contained"
                                disabled={isDisabled}
                                onClick={createClicked}
                                color="primary"
                            >Create</Button>) :
                            (<Button
                                variant="contained"
                                disabled={isDisabled}
                                onClick={updateClicked}
                                color="primary"
                            >Update</Button>)
                        }
                    </div>

                </div>
            );
    }
;

export default TaskInput;
