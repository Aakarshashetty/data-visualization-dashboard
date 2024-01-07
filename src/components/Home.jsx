import { useData } from "../contexts/data-context";
import { BarChart } from "./BarChart";
import { Filters } from "./Filters";

export const Home = () => {
  const {
    state: { age, date, gender },
  } = useData();

  return (
    <>
      {(age || date || gender || date) && (
        <div>
          <h3>Filters Applied</h3>
          <div className="filters-applied">
            <span>
              {age !== 0 && (
                <p>
                  <b>Age: </b>
                  {age}
                </p>
              )}
            </span>
            <span>
              {gender && (
                <p>
                  <b>Gender: </b>
                  {gender}
                </p>
              )}
            </span>
            <span>
              {date && (
                <p>
                  <b>Date: </b>
                  {date}
                </p>
              )}
            </span>
          </div>
        </div>
      )}

      <BarChart />
      <Filters />
    </>
  );
};
