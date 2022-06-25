import { Button, Form, Input } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { updateUserApi } from "../../../api/user.api";
import { useDispatch } from "react-redux";
import { USER_UPDATE_DATA } from "../../../store/actions";

const UserEdit = ({ data }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const mutationUpdate = useMutation((params) =>
    updateUserApi({
      name: params.name,
      email: params.email,
      avatar: params.avatar,
    })
  );

  const handleSubmit = (formData) => {
    mutationUpdate.mutate(
      {
        name: formData.name,
        email: formData.email,
        avatar: data.avatar,
      },
      {
        onSuccess: (data) => {
          dispatch({
            type: USER_UPDATE_DATA,
            payload: {
              name: data.name,
              email: data.email,
              avatar: data.avatar,
            },
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="border border-gray-300 p-3">
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          name: data.name,
          email: data.email,
        }}
        onFinish={handleSubmit}
        labelWrap
        name="form-router"
        autoComplete="off"
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <div>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={mutationUpdate.isLoading && !mutationUpdate.isError}
          >
            Update User
          </Button>
        </div>
      </Form>
    </div>
  );
};

UserEdit.propTypes = {
  data: PropTypes.any,
};

export default UserEdit;
