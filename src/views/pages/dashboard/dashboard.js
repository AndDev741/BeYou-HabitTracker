import Info from "./info"
import Navigation from "./navigation"
import Perfil from "./perfil/perfil"
import Routine from "./routine"

export default function Dashboard(){
    return(
        <div className="flex justify-between">
            <div className="m-3">
                <Perfil />
                <div className="flex mt-12">
                    <Navigation />
                    <Info/>
                </div>
            </div>
            <div className="right-routine m-3">
                <Routine />
            </div>
        </div>
    )
}