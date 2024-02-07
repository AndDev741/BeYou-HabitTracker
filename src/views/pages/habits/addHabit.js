import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import coffeIcon from '../../assetsSVG/coffeIcon.svg';
import importanceIcon from '../../assetsSVG/importanceIcon.svg';
import categoryIcon from '../../assetsSVG/categoryIcon.svg';
import dificultyIcon from '../../assetsSVG/dificultyIcon.svg';

export default function AddHabit() {
    const email = useSelector(state => state.login.email);
    const [categoriesData, setCategoriesData] = useState([]);
    const [name, setName] = useState('');
    const [importance, setImportance] = useState('nível 1');
    const [dificulty, setDificulty] = useState('Fácil');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch("http://localhost/ServerPHP/BeYou-BackEnd/categories/getCategories.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategoriesData(data.data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição', error.message);
        });
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Habitsdata = {
            email,
            name,
            importance,
            dificulty,
            categoryName: category.split(',')[1],
            categoryId: category.split(',')[0],
            description
        };
        
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/habits/habitsRegister.php', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Habitsdata),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess("");
            } else if(data.success) {
                setSuccess(data.success);
                window.location.reload();
            } else {
                setError('Ocorreu um erro inesperado');
                setSuccess('');
            }
        })
        .catch(error => {
            console.error('Erro na requisição', error.message);
        });
    };

    return (
        <div className="flex flex-col items-center border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[500px] mr-4">
            <h2 className="text-3xl font-medium m-4">Adicione um hábito novo</h2>
            <div className="border-solid border-[1px] border-[#0082E1] w-[100%]"></div>
            <form className="flex flex-col justify-evenly" id='habitsForm' onSubmit={handleSubmit}>
                <div className='flex my-2'>
                    <InputWithIcon
                        icon={coffeIcon}
                        label="Nome"
                        type="text"
                        maxLength={55}
                        value={name}
                        onChange={(e) => handleInputChange(e, setName)}
                        placeholder="Estudar algo"
                    />
                    <SelectWithIcon
                        icon={importanceIcon}
                        label="Importância"
                        value={importance}
                        onChange={(e) => handleInputChange(e, setImportance)}
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
                        onChange={(e) => handleInputChange(e, setDificulty)}
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
                        onChange={(e) => handleInputChange(e, setCategory)}
                    >
                        <option value=""></option>
                        {categoriesData.length > 0 && categoriesData.map(category => (
                            <option key={category.id} value={`${category.id},${category.name}`}>{category.name}</option>
                        ))}
                    </SelectWithIcon>
                </div>
                <div className="flex flex-col mx-2 mt-2">
                    <label className="text-center text-2xl text-blueFont font-medium my-2" htmlFor="description">Descrição</label>
                    <textarea 
                        type='text'
                        value={description}
                        onChange={(e) => handleInputChange(e, setDescription)}
                        name="description"
                        id="description"
                        maxLength={255}
                        placeholder="Crie uma bela descrição"
                        className="text-2xl flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]"
                    />
                </div>
                <div className='flex justify-center my-4'>
                    <input 
                        type='submit' 
                        value="Criar novo hábito"
                        className='w-[246px] h-[53px] text-white text-2xl font-bold bg-[#0082E1] rounded-[12px] cursor-pointer'
                    />
                </div>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <p className='text-[18px] sm:text-xl text-center text-[#0082E1] underline font-bold mb-2'>{success}</p>
            </form>
        </div>
    );
}

const InputWithIcon = ({ icon, label, ...inputProps }) => (
    <div className="flex flex-col mx-2">
        <label className="text-2xl text-blueFont font-medium my-2" htmlFor={inputProps.id}>{label}</label>
        <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
            <label htmlFor={inputProps.id}>
                <img src={icon} alt={`${label} icon`} className="w-[30px] h-[30px] ml-2" />
            </label>
            <input 
                {...inputProps}
                className="w-[100%] my-2 ml-2 text-2xl placeholder:text-[#777171] focus:outline-none"
            />
        </div>
    </div>
);

const SelectWithIcon = ({ icon, label, children, ...selectProps }) => (
    <div className="flex flex-col mx-2">
        <label className="text-2xl text-blueFont font-medium my-2" htmlFor={selectProps.id}>{label}</label>
        <div className='flex items-center w-[100%] border-solid border-2 border-[#0082E1] rounded-[6px]'>
            <label htmlFor={selectProps.id}>
                <img src={icon} alt={`${label} icon`} className="w-[30px] h-[30px] mx-2" />
            </label>
            <select 
                {...selectProps}
                className='text-2xl my-[9px]'
            >
                {children}
            </select>
        </div>
    </div>
);
