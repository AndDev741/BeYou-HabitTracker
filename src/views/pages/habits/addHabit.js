import { useState } from 'react';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';
import timeIcon from '../../assetsSVG/timeIcon.svg';

export default function AddHabit(){
    let [name, setName] = useState('');
    let [importance, setImportance] = useState('lv1');
    let [dificulty, setDificulty] = useState('easy');
    let [category, setCategory] = useState('professional');
    let [weekDays, setWeekDays] = useState(['monday']);
    let [description, setDescription] = useState('');
    
    function handleName(e){
        setName(e.target.value);
    }
    function handleImportance(e){
        setImportance(e.target.value);
    }
    function handleDificulty(e){
        setDificulty(e.target.value);
    }
    function handleCategory(e){
        setCategory(e.target.value);
    }
    function handleWeekDays(e){
        const { value, checked} = e.target;
        if(checked){
            setWeekDays([...weekDays, value]);
        } else {
            setWeekDays(weekDays.filter((day) => day !== value));
        }
    }
    function handleDescription(e){
        setDescription(e.target.value);
    }

    const data = {
        name: name,
        importance: importance,
        dificulty: dificulty,
        category: category,
        weekDays: weekDays,
        description: description
    }

    console.log(data)

    return(
            <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] h-[100%] mr-4">
                <h2 className="text-3xl font-medium m-4">Adicione um hábito novo</h2>
                <div className="border-solid border-[1px] border-[#0082E1] w-[100%]"></div>
                <form className="flex flex-col justify-evenly" id='habitsForm'>
                    <div className='flex my-2'>
                        <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="name">Nome</label>
                            <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
                                <label htmlFor='name'>
                                    <img src={coffeIcon} alt="coffe icon" className="w-[30px] h-[30px] ml-2" />
                                </label>
                                <input 
                                type='text'
                                value={name}
                                onChange={handleName}
                                name="name"
                                id="name"
                                placeholder='Estudar algo'
                                className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none" />
                            </div>
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="importance">Importância</label>
                            <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
                                <label htmlFor='importance'>
                                    <img src={importanceIcon} alt="importance icon" className="w-[30px] h-[30px] mx-2" />
                                </label>
                                <select name='importance' id='importance' form='habitsForm' 
                                value={importance} 
                                onChange={handleImportance}
                                className='text-2xl my-[9px]'>
                                    <option value='lv1'>nível 1</option>
                                    <option value='lv2'>nível 2</option>
                                    <option value='lv3'>nível 3</option>
                                    <option value='lv4'>nível 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between my-1'>
                        <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="difficulty">Dificuldade</label>
                            <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
                                <label htmlFor='difficulty'>
                                    <img src={dificultyIcon} alt="dificulty icon" className="w-[30px] h-[30px] mx-2" />
                                </label>
                                <select name='difficulty' id='difficulty' form='habitsForm' 
                                value={dificulty}
                                onChange={handleDificulty}
                                className='text-2xl mx-4 my-[9px]'>
                                    <option value='easy'>Fácil</option>
                                    <option value='medium'>Mediano</option>
                                    <option value='hard'>Dificil</option>
                                    <option value='veryHard'>Desafiante</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="importance">Categorias</label>
                            <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
                                <label htmlFor='importance'>
                                    <img src={categoryIcon} alt="category icon" className="w-[30px] h-[30px] mx-2" />
                                </label>
                                <select name='importance' id='importance' form='habitsForm' 
                                value={category}
                                onChange={handleCategory}
                                className='text-2xl mx-3 my-[9px]'>
                                    <option value='professional'>Professional</option>
                                    <option value='estudos'>Estudos</option>
                                    <option value='espirito'>Espirito</option>
                                    <option value='esportes'>Esportes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center my-3'>
                        <img src={timeIcon} alt="time icon" className="w-[40px] h-[40px] mx-2" />
                        <h1 className='text-3xl'>Dias da semana</h1>
                    </div>
                    <div className='flex justify-center'>
                        <div className="flex flex-col mx-2 border-solid border-2 border-[#0082E1] rounded-[6px] w-[100%]">
                            <div className='flex justify-evenly items-center w-[100%] '>
                                <div className='flex justify-start items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="monday"
                                    checked={weekDays.includes('monday')}
                                    onChange={handleWeekDays}
                                    id='monday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='monday' className="text-2xl cursor-pointer" >Segunda</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="tuesday"
                                    checked={weekDays.includes('tuesday')}
                                    onChange={handleWeekDays}
                                    id='tuesday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='tuesday' className="text-2xl cursor-pointer">Terça</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="wednesday"
                                    checked={weekDays.includes('wednesday')}
                                    onChange={handleWeekDays}
                                    id='wednesday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='wednesday' className="text-2xl cursor-pointer">Quarta</label>
                                </div>
                            </div>
                            <div className='flex justify-evenly items-center w-[100%] '>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="thursday"
                                    checked={weekDays.includes('thursday')}
                                    onChange={handleWeekDays}
                                    id='thursday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='thursday' className="text-2xl cursor-pointer">Quinta</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="friday"
                                    checked={weekDays.includes('friday')}
                                    onChange={handleWeekDays}
                                    id='friday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='friday' className="text-2xl cursor-pointer">Sexta</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="saturday"
                                    checked={weekDays.includes('saturday')}
                                    onChange={handleWeekDays}
                                    id='saturday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='saturday' className="text-2xl cursor-pointer">Sábado</label>
                                </div>
                            </div>
                            <div className='flex justify-center w-[100%] '>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="sunday"
                                    checked={weekDays.includes('sunday')}
                                    onChange={handleWeekDays}
                                    id='sunday' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='sunday' className="text-2xl cursor-pointer">Domingo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="name">Descrição</label>
                            <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
                                <textarea 
                                type='text'
                                value={description}
                                onChange={handleDescription}
                                name="description"
                                id="description"
                                maxLength={255}
                                placeholder='Crie uma bela descrição'
                                className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none" />
                            </div>
                    </div>
                    <div className='flex justify-center my-4'>
                        <input type={'submit'} value="Criar novo hábito"
                        className='w-[246px] h-[53px] text-white text-2xl font-bold bg-[#0082E1] rounded-[12px] cursor-pointer'
                        />
                    </div>
                </form>
            </div>
    )
}