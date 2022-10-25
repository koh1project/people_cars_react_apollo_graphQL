import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { CREATE_PERSON, GET_PEOPLE } from "../../queries";
import { Styles } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const CreatePersonForm = () => {
  const [createPerson] = useMutation(CREATE_PERSON);
  const id = uuidv4();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: { firstName: string; lastName: string }) => {
    const { firstName, lastName } = values;

    createPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update(cache, { data }) {
        const { createPerson } = data!;
        const { people } = cache.readQuery({ query: GET_PEOPLE })!;

        if (!createPerson) {
          return;
        }
        let newPeople: any[] = [];
        if (people && people.length > 0) {
          newPeople = people.slice();
        }
        console.log("newPeople: ", newPeople);

        let nerPerson = {
          ...createPerson,
          cars: [],
        };

        newPeople.push(nerPerson);
        console.log("newPeople: ", newPeople);

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: newPeople,
          },
        });
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
      marginRight: "0.5rem",
    },
  };

  return (
    <Form
      form={form}
      name="add-contact-form"
      size="large"
      layout="horizontal"
      onFinish={onFinish}
    >
      <Input.Group compact style={styles.container}>
        <Form.Item
          label="First Name:"
          name="firstName"
          style={styles.inputItem}
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name:"
          name="lastName"
          style={styles.inputItem}
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Input.Group>
    </Form>
  );
};
