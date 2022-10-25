import { FC, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../queries";
import { Person } from "../../gql/graphql";

type UpdatePersonFormProps = {
  data: Person;
  setEditMode: any;
};

export const UpdatePersonForm: FC<UpdatePersonFormProps> = ({
  data,
  setEditMode,
}) => {
  const [person, setPerson] = useState({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, [data]);

  type onFinishProps = {
    firstName: string;
    lastName: string;
    cars: any;
  };
  const onFinish = (values: onFinishProps) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id: data.id,
        firstName,
        lastName,
      },
    });
    form.resetFields();
    setEditMode(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPerson((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      size="large"
      layout="vertical"
      onFinish={onFinish}
      initialValues={person}
    >
      <Input.Group compact>
        <Form.Item
          label="First name:"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name" }]}
          style={{ marginBottom: 20 }}
        >
          <Input
            placeholder="i.e. John"
            name="firstName"
            onChange={(e) => handleChange(e)}
            value={person.firstName}
          />
        </Form.Item>
        <Form.Item
          label="Last name:"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
          style={{ marginBottom: 20, marginLeft: 20 }}
        >
          <Input
            placeholder="i.e. Smith"
            name="lastName"
            onChange={(e) => handleChange(e)}
            value={person.lastName}
          />
        </Form.Item>
      </Input.Group>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
