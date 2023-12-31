import { useState } from 'react';
import loginIMG from '../assets/loginIMG.png';
import LoginForm from './login';
import RegisterForm from './register';

export default function RenderForms(){
    let [isLogin, setIsLogin] = useState(true);
    function handleLogin(){
        console.log(isLogin)
        if(isLogin === false){
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }
    return(
        <div className='w-[100vw] h-[100vh] flex items-center justify-center font-mainFont'>
            <div className="hidden lg:flex flex-col items-center justify-center w-[460px] h-[560px] text-white bg-[#0082E1] rounded-l-[12px]">
                <img src={loginIMG} alt='Computador com post-its e gráficos' className='w-[269px] h-[269px]' />
                <h1 className='text-[40px] font-bold my-2'>Be You</h1>
                <p className='text-2xl'>Seu gerenciador de hábitos favorito</p>
            </div>
            <div className="flex flex-col lg:justify-top w-[90vw] h-[90vh] ms:w-[70vw] ms:h-[90vh] lg:w-[460px] lg:h-[560px] border-2 border-[#0082E1] rounded-[12px] lg:rounded-r-[12px] lg:rounded-l-none">
                <ul className='flex w-[100%] max-h-[100px] justify-evenly mt-7'>
                    <li onClick={handleLogin} className={`${isLogin === true ? 'text-[#0082E1]' : 'text-[#A19B9B]'} text-2xl cursor-pointer font-medium`}>Entrar</li>
                    <li onClick={handleLogin}  className={`${isLogin === true ? 'text-[#A19B9B]' : 'text-[#0082E1]'} text-2xl cursor-pointer font-medium`}>Registrar-se</li>                   
               </ul>
               <div className='w-[100%] border-solid border-[1px] border-[#0082E1] mt-7'></div>
                <div className={`${isLogin === true ? 'block' : 'hidden'}`}>
                        <LoginForm />
                </div>
                <div className={`${isLogin === true ? 'hidden' : 'block'}`}>
                        <RegisterForm />
                </div>
            </div>
        </div>
    )
}
