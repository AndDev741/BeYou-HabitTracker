export default function Perfil(){
    let imageLink = "https://64.media.tumblr.com/6ef0668bfb71b05a85e6bea24a915577/c3cf49e4cb5d0e6c-20/s1280x1920/d100dc28acef3e158e455283126efe527492fb2e.jpg"
    return(
        <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] max-w-[740px] mb-2">
            <div className="m-2">
                <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="flex">
                        <img alt="user profile" src={imageLink} className="w-[84px] h-[84px] rounded-full" />
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