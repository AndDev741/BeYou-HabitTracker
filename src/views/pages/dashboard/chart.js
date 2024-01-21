import { useState } from 'react';
import ApexChart from 'react-apexcharts';

export default function Chart() {
    //Usar redux para transformar esse valor globalmente depois
    let [tasks, setTasks] = useState([15, 10]);
    
    const options = {
        chart: {
            type: 'donut',
        },
        labels: ['Tarefas Feitas', 'Tarefas Não Feitas'],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                customScale: 1,
                expandOnClick: false
            },
        },
        legend: {
            show: false
        },
        series: tasks, // Ajuste os valores conforme necessário
        colors: ['#0082E1', '#EC5A5A'],
    };

    return (
        <div>
            <ApexChart options={options} series={options.series} type="donut" width="250" />
        </div>
    );
}
