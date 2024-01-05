import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nameEnter } from './perfilSlice'

export default function Perfil(){
    const dispatch = useDispatch();
    let email = useSelector(state => state.login.email);
    const [perfil , setPerfil] = useState({name: '', text: '', constace: '', author: '', img_link: ''});
        useEffect(() => {
            function getData(){
                fetch('http://localhost/ServerPHP/Models/perfil/getData.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email})
                })
                .then((response) => response.json(email))
                .then((data) => {
                    if(data.error){
                        console.log(data.error);
                    } else {
                        setPerfil(data.data);
                        dispatch(nameEnter(perfil.name));
                    }
                })
            }
        getData();
        }, [])
    return(
        <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] max-w-[740px] mb-2">
            <div className="m-2">
                <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="flex">
                        <img alt="user profile" src={perfil.img_link} className="w-[84px] h-[84px] rounded-full" />
                        <div className="flex flex-col justify-center ml-5">
                            <h1 className="text-3xl font-medium">Bom dia, {perfil.name}</h1>
                            <h2 className="text-blueFont text-2xl">Seja sua melhor versão</h2>
                        </div>
                    </div>
                    <div className="mt-1">
                        <h3 className="font-medium text-lg">{perfil.text}</h3>
                        <h2 className="text-blueFont text-lg">- {perfil.author}</h2>
                    </div>
                </div>
                <div>
                    <div className="border-solid border-[2px] border-[#0082E1] w-[110px] rounded-[6px]">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="font-medium text-lg">Constância</h3>
                            <p className="font-medium text-lg">{perfil.constance}</p>
                            <p className="font-medium text-lg text-blueFont">Dias</p>
                        </div>
                    </div>
                    <div className="border-solid border-[2px] border-[#0082E1] w-[110px] rounded-[6px] mt-2">
                        <div className="flex flex-col items-center ustify-center m-2">
                            <p className="font-medium text-lg">09:50</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}