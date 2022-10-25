import { FC, useState } from "react";
import { Car } from "../../gql/graphql";
import { Card } from "antd";
import { UpdateCarForm } from "../forms/UpdateCarForm";
import { EditOutlined } from "@ant-design/icons";
import { DeleteCarButton } from "../../buttons/DeleteCarButton";
import { Styles } from "../../types";

export const CarCard: FC<{ car: Car }> = ({ car }) => {
  const [isEditMode, setEditMode] = useState(false);

  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });
  const styles: Styles = {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
  };
  return (
    <>
      {isEditMode ? (
        <UpdateCarForm data={car} setEditMode={setEditMode} />
      ) : (
        <Card
          title={`${car.year} ${car.make} ${car.model} -> ${formatter.format(
            car.price
          )}`}
          style={styles.container}
          type="inner"
          actions={[
            <EditOutlined key="Update" onClick={() => setEditMode(true)} />,
            <DeleteCarButton id={car.id} ownerId={car.personId} />,
          ]}
        ></Card>
      )}
    </>
  );
};
