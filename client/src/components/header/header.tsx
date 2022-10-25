import { FC } from "react";
import { Styles } from "../../types";
import { PrimaryHeading } from "../../headings/PrimaryHeading";
import { Divider } from "antd";

const styles: Styles = {
  header: {
    width: "100%",
  },
};

export const Header: FC = () => (
  <header style={styles.header}>
    <PrimaryHeading text="People and their cars" />
    <Divider />
  </header>
);
