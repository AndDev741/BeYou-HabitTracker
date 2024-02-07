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
    let habitImportance = useSelector(state => state.habits.importance);
    let habitID = useSelector(state => state.habits.id);
    console.log(HabitCategory)
    let [categoriesData, setCategoriesData] = useState('');
    const [error, setError] = useState('');
    const [success, setSucess] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [name, setName] = useState('');
    const [importance, setImportance] = useState('');
    const [dificulty, setDificulty] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
   

    //Get categories
    useEffect(() => {
        fetch("http://localhost/ServerPHP/BeYou-BackEnd/categories/getCategories.php", {
            method: "POST",
            headers: {"Content-Type": "aplication/json"},
            body: JSON.stringify({email: email})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setError(data.error);
            }else{
                data = data.data
                setCategoriesData(data);
            }
        })
    }, [])

    //Update the inputs
    useEffect(() => { 
        setName(Habitname);
        setImportance(habitImportance);
        setDificulty(HabitDificulty);
        setCategory(HabitCategory);
        setDescription(HabitDescription)
    }, [Habitname, HabitCategory, HabitDescription, HabitDificulty, habitImportance])
    
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
    function handleDescription(e){
        setDescription(e.target.value);
    }   

    const isEditMode = useSelector(state => state.habits.editModeOn);
    function dispatchEditMode(){
        if(isEditMode === true){
            dispatch(editMode(false));
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const Habitsdata = {
            email: email,
            habitID: habitID,
            name: name,
            importance: importance,
            dificulty: dificulty,
            category: category,
            description: description
        }
        //edit
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/editHabits.php', {
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
      //delete
      function handleDelete(e){
        e.preventDefault();
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/deleteHabit.php', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({habitID: habitID})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setSucess("");
                setError("");
                setDeleteMessage(data.error);
                
            }else if(data.success){
                setError("");
                setSucess("");
                setDeleteMessage(data.success);
                setDescription("");
                window.location.reload();
            }
        })
      }
      if(deleteMessage.length > 1){
        setTimeout(() => {
            setDeleteMessage("");
          }, 3000);
      }
      

    return(
            <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
                <div className='flex w-[100%] justify-between items-center'>
                <button onClick={dispatchEditMode} action="http://localhost/ServerPHP/BeYou-BackEnd/habits/editHabits.php">
                    <img src={backFormIcon} alt="coffe icon" className="w-[40px] h-[40px] ml-2 mt-2" />
                </button>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{deleteMessage}</p>
                <form onSubmit={handleDelete}>
                    <button><img src={deleteIcon} alt="coffe icon" className="w-[40px] h-[40px] mr-2 mt-2" /></button>
                </form>
                </div>
                <h2 className="text-3xl font-medium my-2 text-center">Editando o hábito <span className='text-blueFont'>{name}</span></h2>
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
                                className='text-2xl mx-3 my-[9px] max-w-[200px]'>
                                    <option value=""></option>
                                    {categoriesData.length > 0 ? (
                                        categoriesData.map((category) => (
                                            <option value={`${category.id},${category.name}`}>{category.name}</option>
                                        ))
                                    ) : null}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mx-2 my-2">
                            <label className="text-center text-2xl text-blueFont font-medium my-2" 
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