import { FC, useEffect, useState } from "react";
import { PersonCard } from "../components/cards/PersonCard";
import { SecondaryHeading } from "../headings/SecondaryHeading";
import { Styles } from "../types";

export const People: FC<{ people: any }> = ({ people }) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, [people]);

  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  };

  return (
    <>
      <SecondaryHeading text="Records" />
      <div style={styles.container}>
        {people.map((person: any, index: number) => {
          return <PersonCard person={person!} key={index} />;
        })}
      </div>
    </>
  );
};
