import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';
import timeIcon from '../../assetsSVG/timeIcon.svg';

export default function AddHabit(){
    let email = useSelector(state => state.login.email);
    let [categoriesData, setCategoriesData] = useState('');
    let [name, setName] = useState('');
    let [importance, setImportance] = useState('lv1');
    let [dificulty, setDificulty] = useState('easy');
    let [category, setCategory] = useState('');
    let [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSucess] = useState('');
    const [categoryId, categoryName] = category.split(',');

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


    function handleSubmit(e) {
        e.preventDefault();
        const Habitsdata = {
            email: email,
            name: name,
            importance: importance,
            dificulty: dificulty,
            categoryName: categoryName,
            categoryId: categoryId,
            description: description
        }
        
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/habitsRegister.php', {
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
                setSucess("");
                setError(data.error);
            } else if(data.success) {
                setError("");
                setSucess(data.success);
                window.location.reload();
                }else {
                setSucess('');
                setError('');
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
                action='http://localhost/ServerPHP/BeYou-BackEnd/habits/habitsRegister.php' onSubmit={handleSubmit}>
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
                    <div className="flex flex-col mx-2 mt-2">
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