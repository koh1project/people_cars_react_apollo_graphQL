import { FC } from "react";
import { Styles } from "../types";
import { Typography } from "antd";

const { Title } = Typography;

const styles: Styles = {
  title: {
    textAlign: "center",
  },
};

export const PrimaryHeading: FC<{ text: string }> = ({ text }) => (
  <Title style={styles.title}>{text}</Title>
);
