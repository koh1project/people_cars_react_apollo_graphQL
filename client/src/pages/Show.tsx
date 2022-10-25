import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../queries";
import { PersonCard } from "../components/cards/PersonCard";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Styles } from "../types";

export const Show = () => {
  const params = useParams() as { id: string };
  const id = params.id as string;

  const { loading, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id: id ?? "" },
  });

  const styles: Styles = {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    link: {
      marginBottom: "3rem",
      display: "block",
    },
    nodata: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    carContainer: {
      width: "100%",
    },
  };

  let content = <PersonCard person={data?.personWithCars!} />;

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (!data) {
    content = <div style={styles.nodata}>No data</div>;
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.link}>
        <Button icon={<LeftOutlined />}>Go back home</Button>
      </Link>
      {content}
    </div>
  );
};
