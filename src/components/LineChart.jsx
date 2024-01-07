import { useParams } from "react-router-dom"
import { useData } from "../contexts/data-context";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const LineChart = () => {
    const {label} = useParams();
    const {getFilteredData} = useData();
    const dates = [...new Set(getFilteredData().map(entry => entry.day))].slice(9,)
    const timeSpent = (getFilteredData().map(entry=>entry[label]))
    const resultArray = timeSpent.reduce((result, _, index) => {
        if (index % 4 === 0) {
          const sumOfFour = timeSpent.slice(index, index + 4).reduce((acc, num) => acc + num, 0)/100;
          result.push(sumOfFour);
        }
        return result;
      }, []);
      
    return(
        <>  
            <Line
            data = {{
                labels:dates,
                datasets:[
                    {
                        label:"Time spent",
                        data: resultArray.map(val => val),
                        borderWidth:1
                    }
                ]
            }} 
            options={{
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        beginAtZero: true
                    },
                }
            }}
            height={300}
            />

        </>
    )
}