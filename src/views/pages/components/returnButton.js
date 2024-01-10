import backIcon from '../../assetsSVG/backIcon.svg'
import { Link } from "react-router-dom"

export default function ReturnButton(){
    return(
        <div className='m-2'>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[124px]">
                <Link to={'/dashboard'} className="flex items-center ">
                    <img src={backIcon} alt="return icon" className="w-[38px] h-[38px]" />
                    <p className="text-2xl">Voltar</p>
                </Link>
            </div>
        </div>
        
    )
}