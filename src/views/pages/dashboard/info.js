import { useState } from "react";
import Chart from "./chart";

export default function Infor(){
  let videoLink = "https://www.youtube.com/watch?v=axoZk3sz50o&t=393s&pp=ygUqb3MgMTAgaMOhYml0b3MgcXVlIG1haXMgbXVkYXJhbSBtaW5oYSB2aWRh";
  //Será transformado em valor global posteriormente
  let [tasks, setTasks] = useState([15, 10]);
  let tasksCompleted = tasks[0];
  let tasksRemaining = tasks[1];
  //15 - 100 ; 10 - x
  let progress = Math.round(tasksRemaining * 100 / tasksCompleted);
  return (
    <div className="flex items-top justify-evenly w-[550px] h-[370px] ">
      <div className="flex flex-col items-center justify-top border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[230px] h-[353px]">
        <h2 className="text-2xl text-center font-bold mt-2">Dicas Rápidas</h2>
        <p className="text-blueFont text-center font-bold m-1">Confira este vídeo com ótimas sugestões de hábitos</p>
        <div className="border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[80%] mt-3">
          <h4 className="text-blueFont text-center font-bold m-2 underline"><a href={videoLink} target={"_blank"} rel={"noreferrer"}>Os 10 Hábitos que mais mudaram minha vida</a></h4>
        </div>
        <p className="text-blueFont">Clique para assistir</p>
        <h4 className="text-lg text-center mt-1 m-2">Não se esqueça de praticar e implementar na sua rotina!</h4>
      </div>
      <div className="flex flex-col items-center justify-top border-solid border-[2px] border-[#0082E1] rounded-[12px] w-[230px] h-[353px]">
        <h2 className="text-2xl text-center font-bold mt-2">Progresso Diário</h2>
        <p className="text-blueFont text-center font-bold mt-1">Você consegue transformar este dia em um grande dia!</p>
        <div className="mt-2">
          <Chart />
        </div>
        <p className="text-blueFont text-lg font-bold">{progress}%</p>
        <br />
        <p className="text-blueFont text-lg font-bold">Completed</p>
      </div>
    </div>
  );
};


