import { FC, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";

import { CREATE_CAR, GET_PEOPLE } from "../../queries";
import { OwnerSelectBox } from "./OwnerSelectBox";
import { Styles } from "../../types";

export const CreateCarForm: FC = () => {
  const [form] = Form.useForm();
  const [ownerId, setOwnerId] = useState<string>();
  const id = uuidv4();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [createCar] = useMutation(CREATE_CAR, {
    update(cache, { data }) {
      const { createCar } = data!;
      const { people } = cache.readQuery({ query: GET_PEOPLE })!;
      if (!people || !createCar) {
        return;
      }

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people.map((person) => {
            if (!person) {
              return person;
            }

            if (person.id === createCar.personId) {
              let newPerson = { ...person };
              let newCars: any[] = [];
              if (person.cars && person.cars.length > 0) {
                newCars = person.cars.slice();
              }
              newCars.push(createCar);
              newPerson.cars = newCars;
              return newPerson;
            }
            return person;
          }),
        },
      });
    },
  });

  const onFinish = (values: {
    make: string;
    model: string;
    year: string;
    price: string;
    personId: string;
  }) => {
    const { year, make, model, price, personId } = values;

    createCar({
      variables: {
        id,
        year: Number.parseInt(year),
        make,
        model,
        price: Number.parseFloat(price),
        personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        createCar: {
          __typename: "Car",
          id,
          year: Number.parseInt(year),
          make,
          model,
          price: Number.parseFloat(price),
          personId,
        },
      },
    });
    form.resetFields();
  };

  const styles: Styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputItem: {
      flexShrink: 1,
      flexBasis: "150%",
      marginRight: "0.5rem",
    },
  };

  return (
    <div>
      <Form
        form={form}
        name="create-car"
        size="large"
        layout="horizontal"
        onFinish={onFinish}
      >
        <Input.Group compact style={styles.container}>
          <Form.Item
            label="Year:"
            name="year"
            style={styles.inputItem}
            rules={[
              { required: true, message: "Please input the year of the car" },
            ]}
          >
            <Input name="year" type="number" placeholder="Year" />
          </Form.Item>
          <Form.Item
            label="Make:"
            name="make"
            style={styles.inputItem}
            rules={[
              { required: true, message: "Please input the make of the car" },
            ]}
          >
            <Input placeholder="Make" />
          </Form.Item>
          <Form.Item
            label="Model:"
            name="model"
            style={styles.inputItem}
            rules={[
              { required: true, message: "Please input the model of the car" },
            ]}
          >
            <Input placeholder="Model" />
          </Form.Item>
          <Form.Item
            label="Price:"
            name="price"
            style={styles.inputItem}
            rules={[
              { required: true, message: "Please input the price of the car" },
            ]}
          >
            <Input prefix="$" type="number" />
          </Form.Item>
          <Form.Item
            label="Person:"
            name="personId"
            style={styles.inputItem}
            rules={[
              { required: true, message: "Please select the owner of the car" },
            ]}
          >
            <OwnerSelectBox onChange={setOwnerId} ownerId={ownerId} />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldError("create-car").length > 0
                }
              >
                Add Car
              </Button>
            )}
          </Form.Item>
        </Input.Group>
      </Form>
    </div>
  );
};
