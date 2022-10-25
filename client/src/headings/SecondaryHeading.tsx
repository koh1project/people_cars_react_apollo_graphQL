import { FC } from "react";
import { Styles } from "../types";
import { Typography, Divider } from "antd";

const { Title } = Typography;

const styles: Styles = {
  h2: {
    textAlign: "center",
  },
};

export const SecondaryHeading: FC<{ text: string }> = ({ text }) => (
  <Divider>
    <Title level={2} style={styles.h2}>
      {text}
    </Title>
  </Divider>
);
