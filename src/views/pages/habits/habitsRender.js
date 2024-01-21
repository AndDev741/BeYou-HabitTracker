import { useSelector } from "react-redux";
import ReturnButton from "../components/returnButton";
import AddHabit from "./addHabit";
import EditHabit from "./editHabits";
import HabitsList from "./habitsList";


export default function HabitsRender(){
    const isEditMode = useSelector(state => state.habits.editModeOn);
    return(
        <div className="mb-4">
            <ReturnButton/>
            <div className="flex justify-between w-[100%] h-[100%]">
                <div>
                    <HabitsList/>
                </div>
                <div className="">
                    <div className={`${isEditMode === true ? 'hidden' : 'block'}`}>
                        <AddHabit/>
                    </div>
                    <div className={`${isEditMode === true ? 'block' : 'hidden'}`}>
                        <EditHabit/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}