import { FC, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";
import { Car } from "../../gql/graphql";
import { OwnerSelectBox } from "./OwnerSelectBox";
import { Styles } from "../../types";

type UpdateCarFormProps = {
  data: Car;
  setEditMode: any;
};

export const UpdateCarForm: FC<UpdateCarFormProps> = ({
  data,
  setEditMode,
}) => {
  const [car, setCar] = useState({
    ...data,
  });
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [form] = Form.useForm();
  const [ownerId, setOwnerId] = useState<string | undefined>(car.personId);
  const previousOwnerId = car.personId;

  const [updateCar] = useMutation(UPDATE_CAR, {
    update(cache, { data }) {
      const { updateCar } = data!;
      const { people } = cache.readQuery({ query: GET_PEOPLE })!;
      if (!people || !updateCar) {
        return;
      }
      let newPeople = people.map((person) => {
        if (!person) {
          return person;
        }

        let newPerson = { ...person };

        if (person.id === updateCar.personId) {
          newPerson.cars = [];
          person.cars?.map((car) =>
            car?.id === updateCar.id ? updateCar : car
          );

          let found = false;

          if (!person.cars) {
            newPerson.cars = [];
            return newPerson;
          }

          for (const car of person.cars!) {
            if (car?.id === updateCar.id) {
              newPerson.cars.push(updateCar);
              found = true;
            } else {
              newPerson.cars.push(car);
            }
          }

          if (!found) {
            newPerson.cars.push(updateCar);
          }
        }

        // Remove if the car was previously owned by this person and changed to another person
        if (person.id === previousOwnerId && person.id !== updateCar.personId) {
          newPerson.cars = person.cars?.filter(
            (car) => car?.id !== updateCar.id
          );
        }

        return newPerson;
      });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: newPeople,
        },
      });
    },
  });

  type onFinishProps = {
    year: string;
    make: string;
    model: string;
    price: string;
    personId: string;
  };
  const onFinish = (values: onFinishProps) => {
    const { make, model, year, price, personId } = values;
    updateCar({
      variables: {
        ...car,
        make,
        model,
        year: Number.parseInt(year),
        price: Number.parseFloat(price),
        personId: personId ?? ownerId,
        id: data.id,
      },
    });
    form.resetFields();
    setEditMode(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const styles: Styles = {
    container: {
      display: "flex",
      width: "100%",
      gap: "1rem",
    },
    inputItem: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: "10%",
    },
    selectItem: {
      flexGrow: 1,
      flexBasis: "15%",
    },
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      size="large"
      layout="horizontal"
      onFinish={onFinish}
      initialValues={car}
    >
      <Input.Group compact style={styles.container}>
        <Form.Item
          label="Make:"
          name="make"
          style={styles.inputItem}
          rules={[
            { required: true, message: "Please input the make of the car" },
          ]}
        >
          <Input
            placeholder="Make"
            value={car.make}
            name="make"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Model:"
          name="model"
          style={styles.inputItem}
          rules={[
            { required: true, message: "Please input the model of the car" },
          ]}
        >
          <Input
            placeholder="Model"
            value={car.model}
            name="model"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Year:"
          name="year"
          style={styles.inputItem}
          rules={[
            { required: true, message: "Please input the year of the car" },
          ]}
        >
          <Input
            name="year"
            type="number"
            value={car.year}
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Price:"
          name="price"
          style={styles.inputItem}
          rules={[
            { required: true, message: "Please input the price of the car" },
          ]}
        >
          <Input
            prefix="$"
            name="price"
            type="number"
            value={car.price}
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Owner:"
          name="personId"
          style={styles.selectItem}
          rules={[
            { required: true, message: "Please select the owner of the car" },
          ]}
        >
          <OwnerSelectBox ownerId={car.personId} onChange={setOwnerId} />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button type="primary" htmlType="submit">
              Update Car
            </Button>
          )}
        </Form.Item>
      </Input.Group>
    </Form>
  );
};
