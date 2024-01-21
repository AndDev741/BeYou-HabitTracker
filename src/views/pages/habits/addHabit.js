import { useState } from 'react';
import { useSelector } from 'react-redux';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';
import timeIcon from '../../assetsSVG/timeIcon.svg';

export default function AddHabit(){
    let email = useSelector(state => state.login.email);
    let [name, setName] = useState('');
    let [importance, setImportance] = useState('lv1');
    let [dificulty, setDificulty] = useState('easy');
    let [category, setCategory] = useState('professional');
    let [weekDays, setWeekDays] = useState(['Segunda']);
    let [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSucess] = useState('');
    
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
    const ordenateWeek = {
        Segunda: 1,
        Terça: 2,
        Quarta: 3,
        Quinta: 4,
        Sexta: 5,
        Sábado: 6,
        Domingo: 7,
    }
    let weekDaysOrganized = weekDays.sort((a, b) => ordenateWeek[a] - ordenateWeek[b]);
    function handleDescription(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(weekDaysOrganized.length >= 1){
            weekDaysOrganized = weekDaysOrganized.join(', ');
        }
        const Habitsdata = {
            email: email,
            name: name,
            importance: importance,
            dificulty: dificulty,
            category: category,
            weekDays: weekDaysOrganized,
            description: description
        }
        
        fetch('http://localhost/ServerPHP/Models/habits/habitsRegister.php', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Habitsdata),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
                setError('');
                setError(data.error);
                setSucess("");
            } else if(data.success) {
                setSucess(data.success);
                setError("");
                window.location.reload();
                }else {
                setSucess('');
                setError('Ocorreu um erro inesperado');
            }
          })
          .catch((error) => {
            console.error('Erro na requisição', error.message);
          });
      }
     
      

    return(
            <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
                <h2 className="text-3xl font-medium m-4">Adicione um hábito novo</h2>
                <div className="border-solid border-[1px] border-[#0082E1] w-[100%]"></div>
                <form className="flex flex-col justify-evenly" id='habitsForm' 
                action='http://localhost/ServerPHP/Models/habits/habitsRegister.php' onSubmit={handleSubmit}>
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
                                maxLength={55}
                                value={name}
                                onChange={handleName}
                                name="name"
                                id="name"
                                required
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
                                    <option value='nível 1'>nível 1</option>
                                    <option value='nível 2'>nível 2</option>
                                    <option value='nível 3'>nível 3</option>
                                    <option value='nível 4'>nível 4</option>
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
                                    <option value='Fácil'>Fácil</option>
                                    <option value='Mediano'>Mediano</option>
                                    <option value='Dificil'>Dificil</option>
                                    <option value='Desafiante'>Desafiante</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-2xl text-blueFont font-medium my-2" 
                            htmlFor="importance">Categoria</label>
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
                                    <div className='flex justify-center items-center m-2'>
                                </div>
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
                                    value="Segunda"
                                    checked={weekDays.includes('Segunda')}
                                    onChange={handleWeekDays}
                                    id='Segunda' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Segunda' className="text-2xl cursor-pointer" >Segunda</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Terça"
                                    checked={weekDays.includes('Terça')}
                                    onChange={handleWeekDays}
                                    id='Terça' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Terça' className="text-2xl cursor-pointer">Terça</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Quarta"
                                    checked={weekDays.includes('Quarta')}
                                    onChange={handleWeekDays}
                                    id='Quarta' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Quarta' className="text-2xl cursor-pointer">Quarta</label>
                                </div>
                            </div>
                            <div className='flex justify-evenly items-center w-[100%] '>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Quinta"
                                    checked={weekDays.includes('Quinta')}
                                    onChange={handleWeekDays}
                                    id='Quinta' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Quinta' className="text-2xl cursor-pointer">Quinta</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Sexta"
                                    checked={weekDays.includes('Sexta')}
                                    onChange={handleWeekDays}
                                    id='Sexta' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Sexta' className="text-2xl cursor-pointer">Sexta</label>
                                </div>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Sábado"
                                    checked={weekDays.includes('Sábado')}
                                    onChange={handleWeekDays}
                                    id='Sábado' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Sábado' className="text-2xl cursor-pointer">Sábado</label>
                                </div>
                            </div>
                            <div className='flex justify-center w-[100%] '>
                                <div className='flex justify-center items-center m-2'>
                                    <input 
                                    type='checkbox'
                                    value="Domingo"
                                    checked={weekDays.includes('Domingo')}
                                    onChange={handleWeekDays}
                                    id='Domingo' 
                                    className='w-[25px] h-[25px] mr-2 cursor-pointer'
                                    />                        
                                    <label htmlFor='Domingo' className="text-2xl cursor-pointer">Domingo</label>
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
                    <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                    <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
                </form>
            </div>
    )
}