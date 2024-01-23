import { useState } from 'react';
import { useSelector } from 'react-redux';
import categoryNameIcon from '../../assetsSVG/categoryNameIcon.svg';
import levelIcon from '../../assetsSVG/levelIcon.svg';


export default function AddEditCategory(){
    const email = useSelector(state => state.login.email);
    const [name, setName] = useState('');
    const [level, setLevel] = useState('Iniciante');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleName(e){
        setName(e.target.value);
    }
    function handleLevel(e){
        setLevel(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            email: email,
            name: name,
            level: level,
        }

        fetch('http://localhost/ServerPHP/BeYou-BackEnd/categories/addCategorie.php', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(formData) 
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setSuccess("");
                setError("");
                setError(data.error);
            }else if(data.success){
                setError("");
                setSuccess(data.success);
            }
        });
    }
    return(
        <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
            <h1 className="text-2xl font-semibold mt-2">Crie uma categoria</h1>
            <form onSubmit={handleSubmit} action="http://localhost/ServerPHP/BeYou-BackEnd/categories/addCategorie.php"
            className='flex flex-col items-center my-3'>
                <label htmlFor='name' className='text-2xl font-semibold text-blueFont my-1'>Nome</label>
                <div className='flex items-center w-[80%] border-solid border-2 border-[#0082E1] rounded-[6px]'>                   
                    <label htmlFor='name'>
                        <img src={categoryNameIcon} alt="coffe icon" className="w-[30px] h-[30px] ml-2" />
                    </label>
                    <input 
                    type='text'
                    maxLength={55}
                    value={name}
                    onChange={handleName}
                    name="name"
                    id="name"
                    
                    autoComplete='off'
                    placeholder='Estudos'
                    className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none" />
                </div>
                <label htmlFor='name' className='text-2xl font-semibold text-blueFont my-2'>Seu nível atual</label>
                <div className='flex items-center border-solid border-2 border-[#0082E1] rounded-[6px]'>
                    <label htmlFor='importance'>
                        <img src={levelIcon} alt="importance icon" className="w-[30px] h-[30px] mx-2" />
                    </label>
                    <select name='importance' id='importance' form='habitsForm'
                    value={level} 
                    onChange={handleLevel}
                    className='text-2xl my-[9px]'>
                        <option value='Iniciante'>Iniciante</option>
                        <option value='Intermediário'>Intermediário</option>
                        <option value='Avançado'>Avançado</option>
                    </select>
                </div>
                <div className='flex justify-center my-4 mt-6'>
                    <input type={'submit'} value="Criar Categoria"
                    className='w-[206px] h-[53px] text-white text-[20px] font-bold bg-[#0082E1] hover:bg-[#0276c9] rounded-[12px] cursor-pointer'
                    />
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
            </form>
        </div>
    )
}