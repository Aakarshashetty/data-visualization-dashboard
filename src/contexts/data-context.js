import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import * as XLSX from "xlsx";
import { dataReducer } from "../reducers/dataReducer";

export const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(dataReducer, {
    data: [],
    age: 0,
    gender: "",
    date: "",
  });
  const getFilteredData = () => {
    let filteredData = state.data;
    if (state.age !== 0) {
      filteredData = filteredData.filter((entry) => entry.age === state.age);
    } else if (state.gender !== "") {
      filteredData = filteredData.filter(
        (entry) => entry.gender === state.gender
      );
    } else if (state.date !== "") {
      filteredData = filteredData.filter((entry) => entry.day === state.date);
    } else {
      filteredData = state.data;
    }
    return filteredData;
  };
  const fetchExcelData = async () => {
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1En4FwQonyxZEIBxZPctfYhOMVOGfn8akRmz4p_tnv8E/edit?usp=drive_link"
      );
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const formattedData = jsonData.map((entry) => ({
        day: entry.A,
        age: entry.B,
        gender: entry.C,
        A: entry.D,
        B: entry.E,
        C: entry.F,
        D: entry.G,
        E: entry.H,
        F: entry.I,
      }));
      dispatcher({type:"GET_DATA",payload:formattedData})
    } catch (error) {
      console.error("Error reading data from Excel file:", error.message);
    }
  };
  useEffect(() => {
    fetchExcelData();
  }, []);

  return (
    <DataContext.Provider
      value={{  state, dispatcher, getFilteredData }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
