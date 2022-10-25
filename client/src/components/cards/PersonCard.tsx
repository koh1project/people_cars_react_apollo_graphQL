import { FC, useState } from "react";
import { Car, Maybe, Person } from "../../gql/graphql";
import { Card } from "antd";
import { CarsList } from "../lists/CarsList";
import { EditOutlined } from "@ant-design/icons";
import { DeletePersonButton } from "../../buttons/DeletePersonButton";
import { UpdatePersonForm } from "../forms/UpdatePersonForm";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Styles } from "../../types";

export const PersonCard: FC<{ person: Person }> = ({ person }) => {
  const [isEditMode, setEditMode] = useState(false);
  const location = useLocation();
  const inTopPage = location.pathname === "/";

  const { cars } = person;
  const isCarsType = (cars: Maybe<Maybe<Car>[]> | undefined): cars is Car[] => {
    if (!cars) {
      return false;
    }

    return cars.length > 0;
  };

  const styles: Styles = {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  };
  return (
    <>
      {isEditMode ? (
        <UpdatePersonForm data={person} setEditMode={setEditMode} />
      ) : (
        <Card
          title={`${person.firstName} ${person.lastName}`}
          style={styles.container}
          actions={[
            <EditOutlined key="Update" onClick={() => setEditMode(true)} />,
            <DeletePersonButton id={person.id} />,
          ]}
        >
          {isCarsType(cars) && <CarsList cars={cars} />}
          {inTopPage && <Link to={`/people/${person.id}`}>Learn More</Link>}
        </Card>
      )}
    </>
  );
};
