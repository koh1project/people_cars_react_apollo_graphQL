import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { FC } from "react";

// import { GET_CONTACTS, REMOVE_CONTACT } from "../../queries";
import { DELETE_CAR, GET_PERSON_WITH_CARS, GET_PEOPLE } from "../queries";

type DeleteCarButtonProps = {
  id: string;
  ownerId: string;
};

export const DeleteCarButton: FC<DeleteCarButtonProps> = ({ id, ownerId }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, context) {
      if (window.location.href.includes("people")) {
        const { personWithCars } = cache.readQuery({
          query: GET_PERSON_WITH_CARS,
          variables: { id: ownerId },
        })!;

        cache.writeQuery({
          query: GET_PERSON_WITH_CARS,
          data: {
            personWithCars: {
              ...personWithCars,
              id: personWithCars?.id ?? "",
              firstName: personWithCars?.firstName ?? "",
              lastName: personWithCars?.lastName ?? "",
              cars: personWithCars?.cars?.filter((car) => car?.id !== id),
            },
          },
        });
      } else {
        const { people } = cache.readQuery({ query: GET_PEOPLE })!;
        if (!people) {
          return;
        }
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: people.map((person) => {
              if (!person) {
                return person;
              }

              if (person.id === ownerId) {
                let newPerson = { ...person };
                let newCars = person.cars
                  ? person.cars.filter((car) => car?.id !== id)
                  : [];

                newPerson.cars = newCars;
                return newPerson;
              }

              return person;
            }),
          },
        });
      }
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (result) {
      deleteCar({
        variables: {
          id,
        },
      });
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
