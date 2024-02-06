import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { availableIcons } from "./availableIcons";
import { editMode, editName, editIconIndex, editLevel, editXp, getCategoryId} from './categoriesSlice'
import editIcon from '../../assetsSVG/editIcon.svg'

export default function CategoriesList(){
    const email = useSelector(state => state.login.email);
    const [categoriesData, setCategoriesData] = useState([]);
    const [error, setError] = useState('');
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

    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[741px] min-h-[600px] ml-2">
            <div className="m-4">
                <h1 className="text-3xl font-medium">Suas categorias de vida</h1>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <div className="flex flex-wrap">
                    {categoriesData.length > 0 ? (
                        categoriesData.map((category, index) => (
                            <CategoryDiv key={index} name={category.name} icon={category.icon_index} level={category.level} xp={category.xp} id={category.id}/>
                    ))) : (
                        <h2 className="m-4 text-2xl text-blueFont">Suas categorias irão aparecer aqui assim que criadas!</h2>
                    )}
                </div>
                
            </div>
        </div>   
    )
}

function CategoryDiv({name, icon, level, xp, id}){
    const dispatch = useDispatch();
    const isEditMode = useSelector(state => state.categories.editModeOn);
    function dispatchEditMode(){
        if(isEditMode === false){
            dispatch(editMode(true));
        }
        dispatch(editIconIndex(icon));
        dispatch(editName(name));
        dispatch(editLevel(level));
        dispatch(editXp(xp));
        dispatch(getCategoryId(id))
    }
    return(
        <div className="flex flex-col items-center border-solid border-[1px] border-[#0082E1] rounded-[6px] min-w-[190px] mt-6 mx-1">
            <div className="flex items-center justify-between m-2">
                {React.createElement(availableIcons[icon],
                {className: "text-[30px] text-blueFont"})}
                <h2 className="ml-1 text-2xl text-blueFont font-bold">{name}</h2>
                <button onClick={dispatchEditMode}><img src={editIcon} alt='edit pencil icon' className="w-[24px] ml-2" /></button>
            </div>
            <h3 className='text-xl font-bold text-blueFont'>Level {level}</h3>
                <div className='border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[90%] bg-white h-[10px]'>
                    <div className={`w-[80%] h-full rounded-r-[12px] bg-blue-500`}></div>
                </div>   
                <p className='text-blueFont text-lg mb-1'>{xp}/<span className="text-black">{120 + (level) * 120}</span></p> 
        </div>
    )
}