import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginApi } from "../../api/auth.api";
import { USER_LOGGED_IN } from "../../store/actions/user.action";
import { getUserApi } from "../../api/user.api";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const mutationLogin = useMutation((params) =>
    loginApi({
      email: params.email,
      password: params.password,
    })
  );

  const mutationUserData = useMutation(() => getUserApi());

  const dispatch = useDispatch();

  const handleLogin = () => {
    mutationLogin.mutate(
      {
        email: "fake@mail.com",
        password: "fakePassword",
      },
      {
        onSuccess: (accessToken) => {
          jsCookie.set("accessToken", accessToken);
          mutationUserData.mutate(undefined, {
            onSuccess: (data) => {
              dispatch({
                type: USER_LOGGED_IN,
                payload: {
                  accessToken,
                  data: {
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                  },
                },
              });
              navigate("/home");
            },
            onError: (error) => {
              console.log(error);
            },
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex w-full justify-center items-center min-h-[100vh]">
        <div className="block">
          <div className="pb-8 text-center">
            <div className="text-lg font-bold mb-3">Login Page</div>
            <Button loading={mutationLogin.isLoading} onClick={handleLogin}>
              Get Access Token | Login
            </Button>
          </div>
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
