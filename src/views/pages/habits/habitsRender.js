import ReturnButton from "../components/returnButton";
import AddHabit from "./addHabit";
import HabitsList from "./habitsList";

export default function HabitsRender(){
    return(
        <div className="mb-4">
            <ReturnButton/>
            <div className="flex justify-between w-[100%] h-[100%]">
                <div>
                    <HabitsList/>
                </div>
                <div className="">
                    <AddHabit/>
                </div>
            </div>
        </div>
        
    )
}