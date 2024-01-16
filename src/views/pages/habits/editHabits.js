import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editMode } from './habitsSlice';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';
import timeIcon from '../../assetsSVG/timeIcon.svg';
import backFormIcon from '../../assetsSVG/backFormIcon.svg'
import deleteIcon from '../../assetsSVG/deleteIcon.svg'

export default function EditHabit(){
    const dispatch = useDispatch();
    let email = useSelector(state => state.login.email);
    let Habitname = useSelector(state => state.habits.name);
    let HabitDificulty = useSelector(state => state.habits.dificulty);
    let HabitCategory = useSelector(state => state.habits.category);
    let HabitDescription = useSelector(state => state.habits.description);
    let HabitWeekDays = useSelector(state => state.habits.weekDays);
    let habitImportance = useSelector(state => state.habits.importance);
    let habitID = useSelector(state => state.habits.id);

    const [name, setName] = useState('');
    const [importance, setImportance] = useState('');
    const [dificulty, setDificulty] = useState('');
    const [category, setCategory] = useState('');
    const [weekDays, setWeekDays] = useState([]);
    const [description, setDescription] = useState('');
    console.log(HabitWeekDays)
    useEffect(() => {
        setName(Habitname);
        setImportance(habitImportance);
        setDificulty(HabitDificulty);
        setCategory(HabitCategory);
        setWeekDays(HabitWeekDays);
        setDescription(HabitDescription)
        
    }, [Habitname, HabitCategory, HabitDescription, HabitDificulty, HabitWeekDays])
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
    function handleDescription(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(weekDays.length > 1){
            weekDays = weekDays.join(', ');
        }
        const Habitsdata = {
            email: email,
            name: name,
            importance: importance,
            dificulty: dificulty,
            category: category,
            weekDays: weekDays,
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
              setError(data.error);
              setSucess("");
            } else if(data.success) {
              setSucess(data.success);
              setError("");
              setName('');
              setCategory('professional');
              setDescription('');
              setDificulty('easy');
              setImportance('lv1');
              setWeekDays('monday')
            }else {
                setSucess('');
                setError('Ocorreu um erro inesperado');
            }
          })
          .catch((error) => {
            console.error('Erro na requisição', error.message);
          });
      }

    const isEditMode = useSelector(state => state.habits.editModeOn);
    function dispatchEditMode(){
        if(isEditMode === true){
            dispatch(editMode(false));
        }
    }
      

    return(
            <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
                <div className='flex w-[100%] justify-between'>
                    <button onClick={dispatchEditMode}><img src={backFormIcon} alt="coffe icon" className="w-[40px] h-[40px] ml-2 mt-2" /></button>
                    <button><img src={deleteIcon} alt="coffe icon" className="w-[40px] h-[40px] mr-2 mt-2" /></button>
                </div>
                <h2 className="text-3xl font-medium my-2 text-center">Editando o hábito <span className='text-blueFont'>{Habitname}</span></h2>
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
                        <input type={'submit'} value="Editar hábito"
                        className='w-[246px] h-[53px] text-white text-2xl font-bold bg-[#0082E1] rounded-[12px] cursor-pointer'
                        />
                    </div>
                    <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                    <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
                </form>
            </div>
    )
}