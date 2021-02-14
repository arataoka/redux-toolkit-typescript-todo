import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {taskType } from "../../types/type.js"
import {RootState} from "../../app/store";

type taskState = {
    tasks:taskType[],
    editedTask:taskType,
    selectedTask:taskType,
}

const initialState:taskState = {
    tasks: [
        {
            id: 0,
            title: "",
            created_at: "",
            updated_at: "",
        },
        {
            id: 2,
            title: "task2",
            created_at: "",
            updated_at: ""
        },
    ],
    editedTask: {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
    },
    selectedTask: {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
    },
}

const apiUrl = "http://localhost:8000/api/tasks/";
const token = localStorage.localJWT;

export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
    const res = await axios.get<taskType[]>(apiUrl, {
        headers: {
            Authorization: `JWT ${token}`,
        }
    })
    return res.data;
})

export const fetchAsyncCreate = createAsyncThunk("task/post", async (task:taskType) => {
    const res = await axios.post<taskType>(apiUrl, task, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        }
    })
    return res.data;
})

export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task:taskType) => {
    const res = await axios.put<taskType>(`${apiUrl}${task.id}/`, task, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        }
    })
    return res.data;
})

export const fetchAsyncDelete =createAsyncThunk("task/delete", async (id:number) => {
    await axios.delete(`${apiUrl}${id}/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        }
    })
    return id;
})

const taskSlice = createSlice({
        name: "task",
        initialState,
        reducers: {
            editTask(state:taskState, action:PayloadAction<taskType>) {
                state.editedTask = action.payload;
            },
            selectTask(state:taskState, action:PayloadAction<taskType>) {
                state.selectedTask = action.payload;
                console.log(state.selectedTask)
            }
        },
        extraReducers: (builder => {
            builder.addCase(fetchAsyncGet.fulfilled, (state, action:PayloadAction<taskType[]>) => {
                return {
                    ...state,
                    tasks: action.payload,
                }
            });
            builder.addCase(fetchAsyncCreate.fulfilled, (state, action:PayloadAction<taskType>) => {
                return {
                    ...state,
                    tasks: [action.payload, ...state.tasks]
                }
            });
            builder.addCase(fetchAsyncUpdate.fulfilled, (state, action:PayloadAction<taskType>) => {
                return {
                    ...state,
                    tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                    selectedTask: action.payload,
                }
            });
            builder.addCase(fetchAsyncDelete.fulfilled, (state, action:PayloadAction<number>) => {
                return {
                    ...state,
                    tasks: state.tasks.filter((task) => task.id !== action.payload),
                    selectedTask: {
                        id: 1,
                        title: "",
                        created_at: "",
                        updated_at: ""
                    },
                }
            });

        })
    }
)
export const { editTask, selectTask} = taskSlice.actions;
export const selectSelectedTask = (state:RootState) => state.task.selectedTask;
export const selectEditedTask = (state:RootState)  => state.task.editedTask;
export const selectTasks = (state:RootState)  => state.task.tasks;

export default taskSlice.reducer;
