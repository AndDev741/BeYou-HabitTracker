import { CiMail ,CiLock, CiRead, CiUnread, CiUser } from 'react-icons/ci';
import { useState } from 'react';

export default function RegisterForm(){
    let [inputType, setinputType] = useState('password');
    let [passIcon, setPassIcon] = useState(<CiRead/>);
    let [error, setError] = useState("");
    let [sucess, setSucess] = useState("");
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");

    function handlePassword(){
        if(inputType === 'password'){
            setinputType('text');
            setPassIcon(<CiUnread/>);
        } else {
            setinputType('password');
            setPassIcon(<CiRead/>);
        }
    }

    function changeName(e){
        setName(e.target.value);
    }
    function changeEmail(e){
        setEmail(e.target.value);
    }
    function changePass(e){
        setPass(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
          name: name,
          email: email,
          password: pass,
        };
    
        fetch('http://localhost/ServerPHP/Models/login/registerValidation.php', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
              setSucess("");
            } else if(data.success) {
              setSucess(data.success);
              setError("");
            }
          })
          .catch((error) => {
            console.error('Erro na requisição', error.message);
          });
      }
    return(
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-[30px] ms:text-[35px] text-center font-bold'>Se registre <span className='text-[#0082E1]'>e organize melhor sua vida!</span></h1>
            <form method='post' action='http://localhost/ServerPHP/Models/login/registerValidation.php'
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center my-3'>
                <div>
                    <label className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px] my-3'>
                        <CiUser className='text-[25px] cursor-pointer mx-4'/>
                        <input type={'name'}
                        name='name' id='name'
                        value={name}
                        onChange={changeName}
                        maxLength={'55'}
                        placeholder='Qual o seu nome?'
                        required
                        className='w-[55vw] sm:w-[60vw] h-[60px] ms:w-[280px]  ms:h-[44px] text-2xl ms:text-xl placeholder:text-[#777171] focus:outline-none'/>
                    </label>
                    <label className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px] my-3'>
                        <CiMail className='text-[25px] cursor-pointer mx-4'/>
                        <input type={'email'}
                        name='email' id='email'
                        value={email}
                        onChange={changeEmail}
                        maxLength={'255'}
                        placeholder='seuemail@exemplo.com'
                        required
                        className='w-[55vw] sm:w-[60vw] h-[60px] ms:w-[280px]  ms:h-[44px] text-2xl ms:text-xl placeholder:text-[#777171] focus:outline-none'/>
                    </label>
                    <label className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px] my-3'>
                        <CiLock className='text-[25px] cursor-pointer mx-4'/>
                        <input type={inputType}
                        name='password' id='password'
                        value={pass}
                        onChange={changePass}
                        maxLength={'255'}
                        placeholder='Crie uma senha boa!'
                        required
                        className='w-[55vw] sm:w-[60vw] h-[60px] ms:w-[280px]  ms:h-[44px] text-2xl ms:text-xl placeholder:text-[#777171] focus:outline-none'/>
                        <span onClick={handlePassword} className='text-[26px] cursor-pointer mx-2'>{passIcon}</span>
                    </label>
                </div>
                <div>
                    <input type={'submit'}value={'Registrar'} className='w-[256px] h-[43px] text-2xl text-white font-medium bg-[#0082E1] hover:bg-[#2b7fbb] rounded-[20px] cursor-pointer mt-4'/>
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold mt-2'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold'>{sucess}</p>
            </form>
        </div>
    )
}