import { useData } from "../contexts/data-context";
import { BarChart } from "./BarChart";
import { Filters } from "./Filters";

export const Home = () => {
  const {
    state: { age, date, gender },
  } = useData();

  return (
    <>
      {(age || date || gender) && (
        <div>
          <h3>Filters Applied</h3>
          <p>
            <b>Age: </b>
            {age !== 0 && <p>{age}</p>}
          </p>
          <p>
            <b>Gender: </b>
            {gender && <p>{gender}</p>}
          </p>
        </div>
      )}

      <BarChart />
      <Filters />
    </>
  );
};
