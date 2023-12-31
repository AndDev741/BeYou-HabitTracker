export default function Perfil(){
    let imageLink = "https://i.pinimg.com/550x/ba/42/59/ba4259c262a72983e6dda33165cc5fd4.jpg"
    return(
        <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] max-w-[740px] mb-2">
            <div className="m-2">
                <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="flex">
                        <img src={imageLink} className="w-[84px] h-[84px] rounded-full" />
                        <div className="flex flex-col justify-center ml-5">
                            <h1 className="text-3xl font-medium">Bom dia, André Luiz</h1>
                            <h2 className="text-blueFont text-2xl">Seja sua melhor versão</h2>
                        </div>
                    </div>
                    <div className="mt-1">
                        <h3 className="font-medium text-lg">Grandes palavras são necessárias para expressar grandes ideias</h3>
                        <h2 className="text-blueFont text-lg">- Anne with An E</h2>
                    </div>
                </div>
                <div>
                    <div className="border-solid border-[2px] border-[#0082E1] w-[110px] rounded-[6px]">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="font-medium text-lg">Constância</h3>
                            <p className="font-medium text-lg">12</p>
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