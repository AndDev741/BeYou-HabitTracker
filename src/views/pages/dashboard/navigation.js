import habitsIcon from '../../assetsSVG/habitsIcon.svg'
import tasksIcon from '../../assetsSVG/taskIcon.svg'
import goalsIcon from '../../assetsSVG/goalsIcon.svg'
import routineIcon from '../../assetsSVG/routineIcon.svg'
import experienceIcon from '../../assetsSVG/experienceIcon.svg'
import configIcon from '../../assetsSVG/configIcon.svg'
export default function Navigation(){
    return(
        <div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[144px] h-[50px] ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='habit cicle' src={habitsIcon} className="w-[35px] ml-2" />
                    <p className='text-[20px] font-medium ml-3'>Hábitos</p>
                </button>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[144px] h-[50px] mt-5 ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='to-do list' src={tasksIcon} className="w-[35px] ml-2" />
                    <p className='text-[20px] font-medium ml-3'>Tarefas</p>
                </button>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[144px] h-[50px] mt-5 ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='arrow on target' src={goalsIcon} className="w-[35px] ml-2" />
                    <p className='text-[20px] font-medium ml-3'>Metas</p>
                </button>   
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[144px] h-[50px] mt-5 ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='home landscape' src={routineIcon} className="w-[35px] ml-2" />
                    <p className='text-[20px] font-medium ml-3'>Rotina</p>
                </button>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[144px] h-[50px] mt-5 ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='experience configuration' src={experienceIcon} className="w-[35px] ml-2" />
                    <p className='text-[20px] font-medium ml-3'>EXP</p>
                </button>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] rounded-r-[25px] w-[184px] h-[50px] mt-12 ">
                <button className='flex items-center mt-[6px]'>
                    <img alt='configuration icon' src={configIcon} className="w-[35px] ml-1" />
                    <p className='text-[17px] font-medium ml-3'>Configurações</p>
                </button>
            </div>
        </div>
    )
}