import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authorEnter, constanceEnter, img_linkEnter, nameEnter, textEnter } from './perfilSlice'

export default function Perfil(){
    const dispatch = useDispatch();
    const [perfil , setPerfil] = useState({name: '', text: '', constance: 0, author: '', img_link: ''});
    let email = useSelector(state => state.login.email);
    let name = useSelector(state => state.perfil.name);
    let text = useSelector(state => state.perfil.text);
    let author = useSelector(state => state.perfil.author);
    let constance = useSelector(state => state.perfil.constance);
    let img_link = useSelector(state => state.perfil.img_link);

    //clock
    const date = new Date();
    const [hours, setHours] = useState(date.getHours());
    const [minutes, setMinutes] = useState(date.getMinutes());
    let halfMinute = 30000
    setInterval(() => {
        const date = new Date();
        setHours(date.getHours());
        setMinutes(date.getMinutes());
        console.log(hours);
        console.log(minutes);
    }, halfMinute);
    
    useEffect(() => {
        fetch('http://localhost/ServerPHP/Models/perfil/getData.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email})
        })
        .then((response) => response.json())
        .then((data) => {
        if(data.error){
            console.log(data.error);
        }else {
            data = data.data;
            dispatch(nameEnter(data.name));
            dispatch(textEnter(data.text));
            dispatch(authorEnter(data.author));
            dispatch(constanceEnter(data.constance));
            dispatch(img_linkEnter(data.img_link));
        }
            })
    }, [email, dispatch])

    useEffect(() => {
        setPerfil({name: name, text: text, constance: constance, author: author, img_link: img_link});
    }, [name, text, constance, author, img_link]);

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
                            <p className="font-medium text-lg">{`${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes}`}</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}