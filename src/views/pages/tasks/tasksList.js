import editIcon from '../../assetsSVG/editIcon.svg';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editMode, editName, editImportance, editDificulty, editCategory, editWeekDays, editDescription, getTaskId } from './tasksSlice'; 

export default function TasksList(){
    const email = useSelector(state => state.login.email);
    const [tasksData, setTasksData] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/tasks/getTasksData.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                alert(data.error);
            }else{
                data = data.data
                let allTasks = data.map((tasks) => tasks)
                setTasksData(allTasks)
            }
        })
    }, [email])
    console.log(tasksData.map((task) => task))
    
    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[741px] min-h-[550px] ml-2">
            <h1 className="text-3xl font-medium m-4">Suas tarefas</h1>
            <div className='flex flex-wrap'>
                {tasksData.length > 0 ? (
                    tasksData.map((task) => (
                        <TaskDiv key={task.id} id={task.id} name={task.name} dificulty={task.dificulty} categoryName={task.category} categoryId={task.category_id} description={task.description} importance={task.importance} />
                    ))
                ) : (<h2 className="m-4 text-2xl text-blueFont">Suas tarefas irão aparecer aqui assim que criados!</h2>
                )}
            </div>
        </div>
    )
}

function TaskDiv({id, name, dificulty, categoryName, categoryId, importance, description}){
    const dispatch = useDispatch();
    const [openDiv, setOpenDiv] = useState(false);
    const isEditMode = useSelector(state => state.tasks.editModeOn);

    function dispatchData(){
        if(isEditMode === false){
            dispatch(editMode(true));
        }
        dispatch(editName(name));
        dispatch(editDificulty(dificulty));
        dispatch(editCategory([categoryId, categoryName]));
        dispatch(editImportance(importance));
        dispatch(editDescription(description));
        dispatch(getTaskId(id));
        console.log(isEditMode)
    }
    

    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[236px] min-h-[140px] h-[100%] my-2 mx-1">
            <div className='m-2'>
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold text-blueFont">{name}</h1>
                    <button onClick={dispatchData}>
                        <img src={editIcon} alt='edit pencil icon' className="w-[24px] mr-2 mt-1" />
                    </button>
                </div>
                <div className='border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[100px] mt-2'>
                    <button onClick={() => setOpenDiv(!openDiv)}>
                        <h3 className='text-center text-lg font-medium m-1'>Detalhes:</h3>
                    </button>
                </div>
                <ul className={`${openDiv === true ? 'block' : 'hidden'} text-lg font-medium`}>
                    <li className=''>Dificuldade: <span className='text-blueFont font-bold'>{dificulty}</span></li>
                    <li className={`${categoryName ? 'block' : 'hidden'}`}>Categoria: <span className='text-blueFont font-bold'>{categoryName}</span></li>
                    <li className={`${description ? 'block' : 'hidden'}`}>Descrição: <span className='text-blueFont font-bold'>{description}</span></li>
                </ul>       
                <div className="flex items-center mt-2">
                    <p className="text-xl font-medium">{importance}</p>
                </div>
            </div>
        </div>
    )
}