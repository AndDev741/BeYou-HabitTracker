import backIcon from '../../assetsSVG/backIcon.svg'
import { Link } from "react-router-dom"
import PerfilSettings from './perfilSettings'

export default function Settings(){
    
    return(
        <div className="m-4">
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[6px] w-[124px]">
                <Link to={'/dashboard'} className="flex items-center ">
                    <img src={backIcon} className="w-[38px] h-[38px]" />
                    <p className="text-2xl">Voltar</p>
                </Link>
            </div>
            <div className="mt-8">
                <h3 className='text-2xl font-medium ml-1'>Perfil</h3>
                <PerfilSettings />
            </div>
            
        </div>
    )
}