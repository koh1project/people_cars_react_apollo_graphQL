import { FC } from "react";
import { Car } from "../../gql/graphql";

import { CarCard } from "../cards/CarCard";
import { Styles } from "../../types";

type CarListProps = {
  cars: Car[];
};
const styles: Styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingBottom: "1rem",
  },
};

export const CarsList: FC<CarListProps> = ({ cars }) => {
  return (
    <div style={styles.container}>
      {cars.map((car, index) => {
        return <CarCard car={car} key={index} />;
      })}
    </div>
  );
};
