import { Select } from "antd";
import { FC, SetStateAction } from "react";
import { useQuery } from "@apollo/client";

import { GET_PEOPLE } from "../../queries";
import { Styles } from "../../types";

const { Option } = Select;

type OwnerSelectBoxProps = {
  ownerId: string | undefined;
  onChange: React.Dispatch<SetStateAction<string | undefined>>;
};

export const OwnerSelectBox: FC<OwnerSelectBoxProps> = ({
  ownerId,
  onChange,
}) => {
  const { loading, data } = useQuery(GET_PEOPLE);
  const handleChange = (value: string) => {
    onChange(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.people || data.people.length === 0) {
    return <div>No data</div>;
  }

  const styles: Styles = {
    container: {
      maxWidth: "100%",
    },
  };

  return (
    <Select
      placeholder="Select a person"
      style={styles.container}
      value={ownerId}
      onChange={(value) => handleChange(value)}
    >
      {data.people.map(
        (person) =>
          person && (
            <Option
              key={person.id}
              value={person.id}
            >{`${person.firstName} ${person.lastName}`}</Option>
          )
      )}
    </Select>
  );
};
