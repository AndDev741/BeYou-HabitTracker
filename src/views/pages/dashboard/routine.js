import editIcon from '../../assetsSVG/editIcon.svg'
import morningIcon from '../../assetsSVG/morningIcon.svg'
import afternoonIcon from '../../assetsSVG/afternoonIcon.svg'
import nightIcon from '../../assetsSVG/nightIcon.svg'

export default function Routine(){
    const LifeEXP = 75;
    return(
        <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[550px] h-[600px] overflow-scroll">
            <div className='flex justify-between'>
                <div className="flex flex-col m-3"> 
                    <div className="flex">
                        <h2 className="text-2xl font-bold mr-2">Rotina Diária</h2>
                        <button><img src={editIcon} alt='edit pencil icon' className="w-[24px]" /></button>
                    </div>
                    <h4 className="text-lg text-blueFont list-item ml-4">Nome da rotina</h4>
                </div>
                <div className='flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[110px] m-3'>
                    <h2 className='text-xl font-bold'>Vida</h2>
                    <h3 className='text-[16px] font-bold text-blueFont'>LV 5</h3>
                    <div className='border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[90%] bg-white h-[10px]'>
                        <div className={`w-[${LifeEXP}%] h-full rounded-r-[12px] bg-blue-500`}></div>
                    </div>   
                    <p className='text-blueFont text-[10px] mb-1'>2500xp/3500</p>                 
                </div>
            </div>
            {/* Renderização da lista */}
            <div className='ml-4'>
                <div className='flex'>
                    <img src={morningIcon} alt="café em computador" className="w-[30px] mr-2" />
                    <h4 className="text-lg text-blueFont font-bold">Manhã 05:00 - 12:00</h4>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Acordar, Fazer um belo café da manhã e banhar <span className='text-blueFont font-bold text-[17px]'>- 05:30</span></label>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para a academia <span className='text-blueFont font-bold text-[17px]'>- 06:00</span></label>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para o serviço <span className='text-blueFont font-bold text-[17px]'>- 07:00</span></label>
                </div>
            </div>
            <div className='ml-4'>
                <div className='flex items-center mt-4'>
                    <img src={afternoonIcon} alt="café da tarde" className="w-[35px] mr-2" />
                    <h4 className="text-lg text-blueFont font-bold">Tarde 12:00 - 18:00</h4>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Acordar, Fazer um belo café da manhã e banhar <span className='text-blueFont font-bold text-[17px]'>- 05:30</span></label>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para a academia <span className='text-blueFont font-bold text-[17px]'>- 06:00</span></label>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para o serviço <span className='text-blueFont font-bold text-[17px]'>- 07:00</span></label>
                </div>
            </div>
            <div className='ml-4'>
                <div className='flex items-center mt-4'>
                    <img src={nightIcon} alt="lua com núvem" className="w-[35px] mr-2" />
                    <h4 className="text-lg text-blueFont font-bold">Noite 18:00 - 22:00</h4>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Acordar, Fazer um belo café da manhã e banhar <span className='text-blueFont font-bold text-[17px]'>- 05:30</span></label>
                </div>
                <div className='flex items-center mt-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para a academia <span className='text-blueFont font-bold text-[17px]'>- 06:00</span></label>
                </div>
                <div className='flex items-center mt-4 mb-4'>
                    <input type={'checkbox'} className=" min-w-[30px] min-h-[30px] cursor-pointer"/>
                    <label className='text-lg ml-2 text-[17px]'>Ir para o serviço <span className='text-blueFont font-bold text-[17px]'>- 07:00</span></label>
                </div>
            </div>
        </div>
    )
}