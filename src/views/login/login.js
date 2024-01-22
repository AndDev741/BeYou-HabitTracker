import { CiMail ,CiLock, CiRead, CiUnread} from 'react-icons/ci';
import { useState } from 'react';
import { useNavigate }  from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { emailEnter, isLogged } from './loginSlice';

export default function LoginForm(){
    let navigate = useNavigate();
    let [inputType, setinputType] = useState('password');
    let [passIcon, setPassIcon] = useState(<CiRead/>);
    let [email, setEmail] = useState('');
    let [pass, setPass] = useState('');
    let [error, setError] = useState('');
    let [sucess, setSucess] = useState('');
    const dispatch = useDispatch();
    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePass(e){
        setPass(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            email: email,
            password: pass
        };
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/login/loginValidation.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setError(data.error);
                setSucess("");
            } 
            else if(data.sucess){
                dispatch(emailEnter(email));
                dispatch(isLogged(true));
                setSucess(data.sucess);
                setError("");
                setSucess("Login efetuado com sucesso!")
                navigate("/dashboard");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handlePasswordIcon(){
        if(inputType === 'password'){
            setinputType('text');
            setPassIcon(<CiUnread/>);
        } else {
            setinputType('password');
            setPassIcon(<CiRead/>);
        }
    }
    return(
        <div className='flex flex-col items-center justify-center mt-8'>
            <h1 className='text-[35px] ms:text-[40px] text-center font-bold'>Bem vindo <span className='text-[#0082E1]'>de volta!</span></h1>
            <form 
            method='post'
            action='http://localhost/ServerPHP/BeYou-BackEnd/login/loginValidation.php' 
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center mt-10'>
                <div>
                    <label className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px]'>
                        <CiMail className='text-[25px] cursor-pointer mx-4'/>
                        <input type={'email'}
                        name='email' id='email'
                        placeholder='seuemail@exemplo.com'
                        value={email}
                        onChange={handleEmail}
                        className='w-[55vw] sm:w-[60vw] h-[60px] ms:w-[280px]  ms:h-[44px] text-2xl ms:text-xl placeholder:text-[#777171] focus:outline-none'/>
                    </label>
                    <label className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px] mt-12'>
                        <CiLock className='text-[25px] cursor-pointer mx-4'/>
                        <input type={inputType}
                        name='password' id='password'
                        placeholder='sua senha secreta'
                        value={pass}
                        onChange={handlePass}
                        className='w-[55vw] sm:w-[60vw] h-[60px] ms:w-[280px]  ms:h-[44px] text-2xl ms:text-xl placeholder:text-[#777171] focus:outline-none'/>
                        <span onClick={handlePasswordIcon} className='text-[26px] cursor-pointer mx-2'>{passIcon}</span>
                    </label>
                </div>
                <div className='mt-4'>
                    <a href='/' className='text-2xl ms:text-xl text-[#0082E1] cursor-pointer underline'>Esqueceu a senha?</a>
                </div>
                <div>
                    <input type={'submit'}value={'Entrar'} className='w-[75vw] h-[50px] ms:w-[256px] ms:h-[43px] text-2xl text-white font-medium bg-[#0082E1] hover:bg-[#2b7fbb] rounded-[20px] cursor-pointer mt-10 mb-3'/>
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold mt-2'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold'>{sucess}</p>
            </form>
        </div>
    )
}

