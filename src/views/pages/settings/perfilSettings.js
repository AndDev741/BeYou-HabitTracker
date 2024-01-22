import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { authorEnter, constanceEnter, img_linkEnter, nameEnter, textEnter } from '../dashboard/perfil/perfilSlice'
import submitIcon from '../../assetsSVG/submitIcon.svg'
import editIcon from '../../assetsSVG/editIcon.svg'

export default function PerfilSettings(){
    const dispatch = useDispatch();
    const [perfil, setPerfil] = useState({name: '', text: '', constance: 0, author: '', img_link: ''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [perfilName, setPerfilName] = useState('');
    const [perfilText, setPerfilText] = useState('');
    const [perfilAuthor, setPerfilAuthor] = useState('');
    const [perfilImg_link, setPerfilImg_link] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    let email = useSelector(state => state.login.email);
    let name = useSelector(state => state.perfil.name);
    let text = useSelector(state => state.perfil.text);
    let author = useSelector(state => state.perfil.author);
    let constance = useSelector(state => state.perfil.constance);
    let img_link = useSelector(state => state.perfil.img_link);

    function changeName(e){
        setPerfilName(e.target.value);
    }
    function changeText(e){
        setPerfilText(e.target.value);
    }
    function changeAuthor(e){
        setPerfilAuthor(e.target.value);
    }
    function changeImg_link(e){
        setPerfilImg_link(e.target.value)
    }
    //Requisição dos dados
    useEffect(() => {
            fetch('http://localhost/ServerPHP/BeYou-BackEnd/perfil/getData.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
            })
            .then((response) => response.json(email))
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
    }, [name, text, constance, author, img_link, dispatch, email])
    
    useEffect(() => {
        setPerfil({name: name, text: text, constance: constance, author: author, img_link: img_link});
        setPerfilName(name);
        setPerfilText(text);
        setPerfilAuthor(author);
        setPerfilImg_link(img_link);
    }, [name, text, constance, author, img_link]);

    function handleChangeName(e){
        e.preventDefault();
        name = perfilName;
        let data = {name: name, email: email};
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/perfil/changeData.php/changeName.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setSuccess('');
                setError(data.error);
            }else if(data.success){
                setError('');
                setSuccess(data.success);       
            }else{
                setSuccess('');
                setError('Não foi possível alterar seu nome, um erro ocorreu');
            }
        })
    }

    function handleChangeTextAndAuthor(e){
        e.preventDefault();
        text = perfilText;
        author = perfilAuthor;
        let data = {text: text, author: author, email: email};
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/perfil/changeData.php/changeText.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setSuccess('');
                setError(data.error);
            }else if(data.success){
                setError('');
                setSuccess(data.success);       
            }else{
                setSuccess('');
                setError('Não foi possível alterar seu texto, um erro ocorreu');
            }
        })
    }

    function handleChangeImg_link(e){
        e.preventDefault();
        img_link = perfilImg_link;
        let data = {img_link: img_link, email: email};
        fetch('http://localhost/ServerPHP/BeYou-BackEnd/perfil/changeData.php/changeIMG_LINK.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                setSuccess('');
                setError(data.error);
            }else if(data.success){
                setError('');
                setSuccess(data.success);       
            }else{
                setSuccess('');
                setError('Não foi possível alterar sua imagem, um erro ocorreu');
            }
        })
    }


    
    return(
        <div>
            <p className='text-[18px] sm:text-xl text-[#e15200] underline font-bold ml-1'>{error}</p>
            <p className='text-[18px] sm:text-xl text-[#0082E1] underline font-bold ml-1'>{success}</p>
            <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] max-w-[740px] mb-2">
                <div className="m-2">
                    <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="flex items-start">
                                <img alt="user profile" src={perfil.img_link} className="w-[84px] h-[84px] rounded-full" />
                                <button onClick={() => isOpen === false ? setIsOpen(true) : setIsOpen(false)}><img src={editIcon} alt='edit pencil icon' className="w-[26px] ml-1" /></button>
                            </div>
                            <div className={`${isOpen === false ? 'hidden' : 'absolute'} flex border-solid border-[2px] border-[#0082E1] rounded-[6px] bg-white w-[600px] h-[90px]`}>
                                <img alt="user profile" src={perfil.img_link} className="w-[84px] h-[84px] rounded-full" />
                                <form className="flex items-center ml-4" onSubmit={handleChangeImg_link}>
                                    <input className={`w-[250px] border-solid border-b-2 border-[#0082E1]`}
                                        type={'text'}
                                        value={perfilImg_link}
                                        onChange={changeImg_link}
                                    />  
                                    <button type="submit" className=" className='text-[25px] cursor-pointer ml-4'"><img src={submitIcon} alt='edit pencil icon' className="w-[26px]" /></button>
                                </form>
                                <div className="flex justify-end w-[40%]">
                                    <p onClick={() => isOpen === false ? setIsOpen(true) : setIsOpen(false)} className="text-blueFont text-2xl m-1 cursor-pointer">X</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center ml-5">
                                <div className="flex">
                                    <div className="flex text-3xl font-medium">
                                        <p>Bom dia, </p>
                                        <form className="flex items-center ml-2" onSubmit={handleChangeName}>
                                            <input className={`max-w-[240px] border-solid border-b-2 border-[#0082E1]`}
                                            type={'text'}
                                            value={perfilName}
                                            onChange={changeName}
                                            />  
                                            <button type="submit" className=" className='text-[25px] cursor-pointer mx-4'"><img src={submitIcon} alt='edit pencil icon' className="w-[26px]" /></button>
                                        </form>
                                    </div>
                                    
                                </div>
                                <h2 className="text-blueFont text-2xl">Seja sua melhor versão</h2>
                            </div>
                        </div>
                        <div className="mt-1">
                            <div className="flex items-start">
                                <form className="flex items-center ml-2 text-lg" onSubmit={handleChangeTextAndAuthor}>
                                    <input className={`w-[540px] border-solid border-b-2 border-[#0082E1]`}
                                        type={'text'}
                                        value={perfilText}
                                        onChange={changeText}
                                    />  
                                    <button type="submit" className=" className='text-[25px] cursor-pointer mx-4'"><img src={submitIcon} alt='edit pencil icon' className="w-[26px]" /></button>
                                </form>
                            </div>
                            <input className={`w-[140px] border-solid border-b-2 border-[#0082E1] text-lg text-blueFont ml-2`}
                                type={'text'}
                                value={perfilAuthor}
                                onChange={changeAuthor}
                                    />  
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
        </div>
    )
}