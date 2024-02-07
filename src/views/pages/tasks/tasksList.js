import editIcon from '../../assetsSVG/editIcon.svg'

export default function TasksList(){
    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[741px] min-h-[550px] ml-2">
            <h1 className="text-3xl font-medium m-4">Suas tarefas</h1>
            <div>
                <TaskDiv/>
            </div>
        </div>
    )
}

function TaskDiv(){
    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[236px] h-[100%] my-2 mx-1">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold text-blueFont ml-2 mt-1">Teste</h1>
                <button><img src={editIcon} alt='edit pencil icon' className="w-[24px] mr-2 mt-1" /></button>
            </div>
        </div>
    )
}