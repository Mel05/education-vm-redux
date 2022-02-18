import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import {
  titleChanged,
  taskDeleted,
  completedTask,
  taskAdd,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
} from "./store/task"
import configureStore from "./store/store"
import { Provider, useSelector, useDispatch } from "react-redux"
import { getError } from "./store/errors"

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deletedTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  const addTask = ({ title, completed }) => {
    dispatch(taskAdd({ title, completed }))
  }

  if (isLoading) {
    return <h1> Loading... </h1>
  }
  if (error) {
    return <p> {error} </p>
  }
  return (
    <>
      <h1> App </h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <div>
              {el.id} {el.title}
            </div>
            <div> {`Completed: ${el.completed}`}</div>
            <div>
              <button onClick={() => dispatch(completedTask(el.id))}>
                Completed
              </button>

              <button onClick={() => changeTitle(el.id)}>Change title</button>

              <button onClick={() => deletedTask(el.id)}>Deleted</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <button onClick={() => addTask({ title: "New task", completed: false })}>
        Add Task
      </button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
