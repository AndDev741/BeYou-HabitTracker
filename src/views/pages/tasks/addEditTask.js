export default function AddEditTasks(){
    return(
        <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px]  min-h-[550px] mr-4">
            <h2 className="text-3xl font-medium m-4">Crie uma nova tarefa</h2>
            <div className="border-solid border-[1px] border-[#0082E1] w-[100%]"></div>
            <form>
                <div>
                    <label className="text-2xl text-blueFont font-medium my-2">Nome</label>
                </div>
            </form>
        </div>
    )
}