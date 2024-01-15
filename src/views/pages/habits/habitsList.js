import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import editIcon from '../../assetsSVG/editIcon.svg'
import fireIcon from '../../assetsSVG/fireIcon.svg'
export default function HabitsList(){
    let email = useSelector(state => state.login.email);
    const [habitsData, setHabitsData] = useState([]);
    useEffect(() => {
        fetch('http://localhost/ServerPHP/Models/habits/getHabitsData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data){
                data = data.data;
                let dataHabits = data.map((habits) => habits);
                setHabitsData(dataHabits)
            }else{
                console.log('Erro na requisição')
            }
        })
    }, [email])
    console.log(habitsData)

    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[741px] min-h-[600px] ml-2"> 
            <h1 className="text-3xl font-medium m-4">Seus hábitos</h1>
            <div className="mx-2 flex flex-wrap justify-between">
                {habitsData.length > 0 ? (
                    habitsData.map((habit) => (
                        <HabitDiv key={habit.id} name={habit.name} importance={habit.importance} constance={habit.frequency} category={habit.category} weekDays={habit.weekdays} startDate={habit.startdate} description={habit.description}/>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

function HabitDiv({name, constance, importance, category, weekDays, startDate, description}){
    const [openDiv, setOpenDiv] = useState(false);
    function handleOpenDiv(){
        openDiv === false ? setOpenDiv(true) : setOpenDiv(false);
    }
    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[236px] h-[100%] my-2">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold text-blueFont ml-2 mt-1">{name}</h1>
                <button><img src={editIcon} alt='edit pencil icon' className="w-[24px] mr-2 mt-1" /></button>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[100px] ml-2 mt-1">
                <button onClick={handleOpenDiv}>
                    <p className="text-center text-lg font-medium m-1">Detalhes</p>
                </button>
            </div>
            <div className={`${openDiv === false ? 'hidden' : 'block'}`}>
                <div className="m-2">
                    <ul>
                        <li className="text-lg font-medium">Categoria: <span className="text-blueFont font-bold">{category}</span></li>
                        <li className="text-lg font-medium">Frequência: <span className="text-blueFont font-bold">{weekDays}</span></li>
                        <li className="text-lg font-medium">Data de começo: <span className="text-blueFont font-bold">{startDate}</span></li>
                        <li className={`${description.length > 1 ? 'block' : 'hidden'} text-lg font-medium`}>Descrição: <span className="text-blueFont font-bold">{description}</span></li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center ml-2 mt-2">
                    <div className="w-[30px] h-[30px] rounded-full bg-red-400"></div>
                    <p className="text-xl font-medium ml-1">{importance}</p>
                </div>
                <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[6px] mr-2 mb-2">
                    <img src={fireIcon} alt='edit pencil icon' className="w-[30px] pt-2" />
                    <p className="text-lg font-medium mx-2">{constance} dias</p>
                </div>
            </div>
            
            
        </div>
    )
}