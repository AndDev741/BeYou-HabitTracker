import React, { useEffect, useState } from 'react';
import { editMode } from './categoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import categoryNameIcon from '../../assetsSVG/categoryNameIcon.svg';
import levelIcon from '../../assetsSVG/levelIcon.svg';
import backFormIcon from '../../assetsSVG/backFormIcon.svg'
import deleteIcon from '../../assetsSVG/deleteIcon.svg'
import { availableIcons } from './availableIcons';


export default function AddEditCategory(){
    const dispatch = useDispatch();
    const email = useSelector(state => state.login.email);
    //Edit
    const editModeOn = useSelector(state => state.categories.editModeOn)
    const editName = useSelector(state => state.categories.name);
    const editIcon = useSelector(state => state.categories.icon_index);
    const editLevel = useSelector(state => state.categories.level);
    const editXp = useSelector(state => state.categories.xp);
    const categoryId = useSelector(state => state.categories.id);
    //Add
    const [name, setName] = useState('');
    const [level, setLevel] = useState('Iniciante');
    const [selectedIcon, setSelectedIcon] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if(editModeOn === true){
            if(editLevel < 5){
                setLevel("Iniciante");
            } else if(editLevel >= 5 && editLevel < 7) {
                setLevel("Intermediário");
            } else if(editLevel >= 7){
                setLevel("Avançado");
            }
            setName(editName);
            setSelectedIcon(editIcon);
        }
    }, [editModeOn, editIcon, editName, editLevel])

    function dispatchEditMode(){
        dispatch(editMode(false));
        setName("");
        setLevel("iniciante");
        setSelectedIcon(0);
    }


    function handleName(e){
        setName(e.target.value);
    }
    function handleLevel(e){
        setLevel(e.target.value);
    }
    //Add
    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            id: categoryId,
            email: email,
            name: name,
            level: level,
            icon: selectedIcon,
        }
        //Edit
        if(editModeOn === true){
            fetch('http://localhost/ServerPHP/BeYou-BackEnd/categories/editCategories.php', {
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
                setName("");
                setSuccess(data.success);
                window.location.reload();
            }
        });
        }
        //Add
        else {
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
                setName("");
                setSuccess(data.success);
                window.location.reload();
            }
        });
        }
    }
    return(
        <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
            {editModeOn === true ? (
                <div className='flex justify-between w-[90%]'>
                    <button onClick={dispatchEditMode}>
                        <img src={backFormIcon} alt="coffe icon" className="w-[40px] h-[40px] ml-2 mt-2" />
                    </button>
                    <button>
                        <img src={deleteIcon} alt="coffe icon" className="w-[40px] h-[40px] mr-2 mt-2" />
                    </button>
                </div>
            ) : null}
            <h1 className="text-2xl font-semibold mt-2">
                {editModeOn === true ? <span>Editando a categoria <span className='text-blueFont font-bold'>{editName}</span></span> : "Crie uma categoria"}
            </h1>
            <form onSubmit={handleSubmit} action={editModeOn === true ? 'http://localhost/ServerPHP/BeYou-BackEnd/categories/addCategorie.php' : 'http://localhost/ServerPHP/BeYou-BackEnd/categories/editCategories.php'}
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
                <div className='flex flex-col items-center'>
            <label htmlFor='name' className='text-2xl font-semibold text-blueFont my-2'>Ícone</label>
                <div className='flex flex-wrap items-center justify-center border-solid border-2 border-[#0082E1] rounded-[6px] w-[80%]'>
                    {availableIcons.map((Icon, index) => (
                        <Icon 
                        value={index}
                        onClick={() => setSelectedIcon(index)}
                        className={`${selectedIcon === index ? 'scale-150 text-[#003ce1]' : ''} text-[30px] text-[#0082E1] m-2 cursor-pointer hover:scale-125`}/>
                    ))}
                </div>
            </div>
                <div className='flex justify-center my-4 mt-6'>
                    <input type={'submit'} value={editModeOn === true ? "Editar categoria" : "Criar categoria"}
                    className='w-[206px] h-[53px] text-white text-[20px] font-bold bg-[#0082E1] hover:bg-[#0276c9] rounded-[12px] cursor-pointer'
                    />
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
            </form>
        </div>
    )
}