import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { availableIcons } from "./availableIcons";

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
    console.log(categoriesData)
    console.log(availableIcons)

    return(
        <div className="flex flex-col border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[741px] min-h-[600px] ml-2">
            <div className="m-5">
                <h1 className="text-3xl font-medium">Suas categorias de vida</h1>
                <p className='text-[18px] sm:text-xl text-center text-[#e15200] underline font-bold'>{error}</p>
                <div className="flex flex-wrap">
                    {categoriesData.map((category, index) => (
                        <div className="flex flex-col items-center border-solid border-[1px] border-[#0082E1] rounded-[6px] min-w-[162px] mt-6 mx-1" key={index}>
                            <div className="flex items-center m-2">
                                {React.createElement(availableIcons[category.icon_index],
                                {className: "text-[30px] text-blueFont"})}
                                <h2 className="ml-2 text-2xl text-blueFont font-bold">{category.name}</h2>
                            </div>
                            <h3 className='text-xl font-bold text-blueFont'>Level {category.level}</h3>
                                <div className='border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[90%] bg-white h-[10px]'>
                                    <div className={`w-[80%] h-full rounded-r-[12px] bg-blue-500`}></div>
                                </div>   
                                <p className='text-blueFont text-lg mb-1'>{category.xp}/<span className="text-black">{120 + (category.level) * 120}</span></p> 
                        </div>
                    ))}
                </div>
                
            </div>
        </div>   
    )
}