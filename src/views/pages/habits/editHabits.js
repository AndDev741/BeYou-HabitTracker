import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editMode } from './habitsSlice';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';
import backFormIcon from '../../assetsSVG/backFormIcon.svg'
import deleteIcon from '../../assetsSVG/deleteIcon.svg'
import timeIcon from '../../assetsSVG/timeIcon.svg'

export default function EditHabit() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.login.email);
    const habit = useSelector(state => state.habits);
    const [categoriesData, setCategoriesData] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [name, setName] = useState('');
    const [importance, setImportance] = useState('');
    const [dificulty, setDificulty] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => { 
        setName(habit.name);
        setImportance(habit.importance);
        setDificulty(habit.dificulty);
        setCategory(habit.category);
        setDescription(habit.description);
    }, [habit]);

    const fetchCategories = () => {
        fetch("http://localhost/ServerPHP/BeYou-BackEnd/categories/getCategories.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategoriesData(data.data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição', error.message);
        });
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let categoryId, categoryName;

        if (habit.category === category) {
            categoryId = category[0].toString();
            categoryName = category[1].toString();
        } else {
            [categoryId, categoryName] = category.split(',');
        }

        const habitsData = {
            email,
            habitID: habit.id,
            name,
            importance,
            dificulty,
            categoryName,
            categoryId,
            description
        };

        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/editHabits.php', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(habitsData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess("");
            } else if(data.success) {
                setSuccess(data.success);
                setError("");
                window.location.reload();
            } else {
                setSuccess('');
                setError('Ocorreu um erro inesperado');
            }
        })
        .catch(error => {
            console.error('Erro na requisição', error.message);
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/deleteHabit.php', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({habitID: habit.id})
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                setSuccess("");
                setError("");
                setDeleteMessage(data.error);
            } else if(data.success) {
                setError("");
                setSuccess("");
                setDeleteMessage(data.success);
                setDescription("");
                window.location.reload();
            }
        });
    };

    return (
        <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
            <div className='flex w-[100%] justify-between items-center'>
                <button onClick={() => dispatch(editMode(false))}>
                    <img src={backFormIcon} alt="coffe icon" className="w-[40px] h-[40px] ml-2 mt-2" />
                </button>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{deleteMessage}</p>
                <form onSubmit={handleDelete}>
                    <button><img src={deleteIcon} alt="coffe icon" className="w-[40px] h-[40px] mr-2 mt-2" /></button>
                </form>
            </div>
            <h2 className="text-3xl font-medium my-2 text-center">Editando o hábito <span className='text-blueFont'>{name}</span></h2>
            <div className="border-solid border-[1px] border-[#0082E1] w-[100%]"></div>
            <form className="flex flex-col justify-evenly" id='habitsForm' onSubmit={handleSubmit}>
                <div className='flex'>
                    <InputWithIcon
                        icon={coffeIcon}
                        label="Nome"
                        value={name}
                        onChange={handleChange(setName)}
                        maxLength={55}
                        placeholder='Estudar algo'
                    />
                    <SelectWithIcon
                        icon={importanceIcon}
                        label="Importância"
                        value={importance}
                        onChange={handleChange(setImportance)}
                    >
                        <option value='nível 1'>nível 1</option>
                        <option value='nível 2'>nível 2</option>
                        <option value='nível 3'>nível 3</option>
                        <option value='nível 4'>nível 4</option>
                    </SelectWithIcon>
                </div>
                <div className='flex justify-between my-1'>
                    <SelectWithIcon
                        icon={dificultyIcon}
                        label="Dificuldade"
                        value={dificulty}
                        onChange={handleChange(setDificulty)}
                    >
                        <option value='Fácil'>Fácil</option>
                        <option value='Mediano'>Mediano</option>
                        <option value='Dificil'>Dificil</option>
                        <option value='Desafiante'>Desafiante</option>
                    </SelectWithIcon>
                    <SelectWithIcon
                        icon={categoryIcon}
                        label="Categoria"
                        value={category}
                        onChange={handleChange(setCategory)}
                    >
                        <option value=""></option>
                        {categoriesData.map(category => (
                            <option key={category.id} value={`${category.id},${category.name}`}>{category.name}</option>
                        ))}
                    </SelectWithIcon>
                </div>
                <div className="flex flex-col mx-2 mt-2">
                    <label className="text-center text-2xl text-blueFont font-medium my-2" htmlFor="description">Descrição</label>
                    <Textarea
                        value={description}
                        onChange={handleChange(setDescription)}
                        placeholder="Crie uma bela descrição"
                    />
                </div>
                <div className='flex justify-center my-4'>
                    <input type={'submit'} value="Editar hábito" className='w-[246px] h-[53px] text-white text-2xl font-bold bg-[#0082E1] rounded-[12px] cursor-pointer' />
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
            </form>
        </div>
    );
}

const InputWithIcon = ({ icon, label, ...props }) => (
    <div className="flex flex-col mx-2">
        <label className="text-2xl text-blueFont font-medium my-2" htmlFor={props.id}>{label}</label>
        <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
            <label htmlFor={props.id}>
                <img src={icon} alt={`${label} icon`} className="w-[30px] h-[30px] ml-2" />
            </label>
            <input {...props} className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none" />
        </div>
    </div>
);

const SelectWithIcon = ({ icon, label, children, ...props }) => (
    <div className="flex flex-col mx-2">
        <label className="text-2xl text-blueFont font-medium my-2" htmlFor={props.id}>{label}</label>
        <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
            <label htmlFor={props.id}>
                <img src={icon} alt={`${label} icon`} className="w-[30px] h-[30px] mx-2" />
            </label>
            <select {...props} className='text-2xl my-[9px]'>
                {children}
            </select>
        </div>
    </div>
);

const Textarea = ({...props }) => (
    <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
        <textarea {...props} className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none" />
    </div>
);
