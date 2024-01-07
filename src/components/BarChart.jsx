import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useData } from "../contexts/data-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequiresAuth } from "./RequiresAuth";
export const BarChart = () => {
  const { getFilteredData } = useData();
  const [label, setLabel] = useState("");
  const navigate = useNavigate();
  let values = [];
  values.push(
    getFilteredData().reduce((acc, val) => (acc += val.A), 0) / 100,
    getFilteredData().reduce((acc, val) => (acc += val.B), 0) / 100,
    getFilteredData().reduce((acc, val) => (acc += val.C), 0) / 100,
    getFilteredData().reduce((acc, val) => (acc += val.D), 0) / 100,
    getFilteredData().reduce((acc, val) => (acc += val.E), 0) / 100,
    getFilteredData().reduce((acc, val) => (acc += val.F), 0) / 100
  );

  return (
    <div>
      <Bar
        data={{
          labels: ["A", "B", "C", "D", "E", "F"],
          datasets: [
            {
              label: "Total time spent",
              data: values.map((value) => value),
              value: values.map((value) => value),
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          indexAxis: "y",
          onClick: (e) => setLabel(e.chart.tooltip.dataPoints[0].label),
        }}
        height={300}
      />
      <RequiresAuth>{label !== "" && navigate(`/line/${label}`)}</RequiresAuth>
    </div>
  );
};
