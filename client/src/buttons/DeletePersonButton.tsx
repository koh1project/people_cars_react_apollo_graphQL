import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { GET_CONTACTS, REMOVE_CONTACT } from "../../queries";
import { DELETE_PERSON, GET_PEOPLE } from "../queries";

export const DeletePersonButton: FC<{ id: string }> = ({ id }) => {
  const [, forceUpdate] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data }) {
      const { deletePerson } = data!;
      const { people } = cache.readQuery({ query: GET_PEOPLE })!;
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people?.filter((person) => person?.id !== deletePerson?.id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (result) {
      deletePerson({
        variables: {
          id,
        },
      });

      if (window.location.href.includes("people")) {
        navigate("/");
      }
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};
