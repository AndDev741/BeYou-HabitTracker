import ReturnButton from "../components/returnButton"
import AddEditTasks from "./addEditTask"
import TasksList from "./tasksList"
export default function TasksRender(){
    return(
        <div className="mb-4">
            <ReturnButton/>
            <div className="flex justify-between">
                <div>
                    <TasksList/>
                </div>
                <div>
                    <AddEditTasks/>
                </div>
            </div>
        </div>
    )
}