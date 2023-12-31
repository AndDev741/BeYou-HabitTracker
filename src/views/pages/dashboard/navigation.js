import habitsIcon from '../../assetsSVG/habitsIcon.svg'
import taskIcon from '../../assetsSVG/taskIcon.svg'
export default function Navigation(){
    return(
        <div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[134px] h-[50px] ">
                <div className='flex items-center justify-evenly mt-[6px]'>
                    <img src={habitsIcon} className="w-[35px]" />
                    <p className='text-[20px] font-medium'>Hábitos</p>
                </div>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[134px] h-[50px] mt-5 ">
                <div className='flex items-center justify-evenly mt-[6px]'>
                    <img src={taskIcon} className="w-[35px]" />
                    <p className='text-[20px] font-medium'>Tarefas</p>
                </div>
            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[134px] h-[50px] mt-5 ">

            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[134px] h-[50px] mt-5 ">

            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[134px] h-[50px] mt-5 ">

            </div>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] rounded-r-[25px] w-[164px] h-[50px] mt-12 ">

            </div>
        </div>
    )
}