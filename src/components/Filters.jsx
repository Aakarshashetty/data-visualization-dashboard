import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Filters.css";
import { useData } from "../contexts/data-context";
import { formatDate } from "../backend/utils/formatDate";
import { useCookies } from "react-cookie";

export const Filters = () => {
  const [customDate, setCustomDate] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const [filters, setFilters] = useState({
    age: 0,
    gender: "",
    date: !customDate ? "" : { startDate: "", endDate: "" },
  });
  const { dispatcher } = useData();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastSevenDays = new Date(today);
  lastSevenDays.setDate(today.getDate() - 7);
  const thisMonth = today.toLocaleString("default", { month: "short" });
  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, age: e.target.value })}>
        <option value={0}>Age</option>
        <option value="15-25">15-25</option>
        <option value=">25">{">"}25</option>
      </select>
      <select
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label>
        Date:
        <input
          type="text"
          value={
            customDate && (filters.date.startDate) &&(filters.date.endDate)
              ? filters.date.startDate + "to" + filters.date.endDate
              : ""
          }
        />
        <div className="date">
          <span
            onClick={() => {
              setFilters({ ...filters, date: formatDate(today) });
              setCustomDate(false);
            }}
          >
            Today
          </span>
          <span
            onClick={() => {
              setFilters({ ...filters, date: formatDate(yesterday) });
              setCustomDate(false);
            }}
          >
            Yesterday
          </span>
          <span
            onClick={() => {
              setFilters({ ...filters, date: formatDate(lastSevenDays) });
              setCustomDate(false);
            }}
          >
            Last 7 Days
          </span>
          <span
            onClick={() => {
              setFilters({ ...filters, date: thisMonth });
              setCustomDate(false);
            }}
          >
            This month
          </span>
          <span onClick={() => setCustomDate(!customDate)}>Custom range</span>
          {customDate && (
            <div>
              <label>From Date:</label>
              from:
              <input
                type="date"
                value={filters.date?.startDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    date: {
                      ...filters,
                      date: { ...filters.date, startDate: e.target.value },
                    },
                  })
                }
              />
              to:
              <input
                type="date"
                value={filters.date?.endDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    date: {
                      ...filters,
                      date: { ...filters.date, endDate: e.target.value },
                    },
                  })
                }
              />
            </div>
          )}
        </div>
      </label>
      <button
        onClick={() => {
          dispatcher({ type: "APPLY_FILTERS", payload: filters });
          setCookie('name', filters);
        }}
      >
        Apply
      </button>
    </div>
  );
};
