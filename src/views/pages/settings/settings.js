import ReturnButton from '../components/returnButton';
import PerfilSettings from './perfilSettings';

export default function Settings(){
    
    return(
        <div className="m-2">
            <ReturnButton/>
            <div className="mt-8">
                <h3 className='text-2xl font-medium ml-1'>Perfil</h3>
                <PerfilSettings />
            </div>
        </div>
    )
}