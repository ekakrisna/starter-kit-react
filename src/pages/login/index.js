import { Button } from "antd";
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

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex w-full justify-center pt-8">
        <div>
          <div className="text-lg font-bold mb-3">Login Page</div>
          <Button loading={mutationLogin.isLoading} onClick={handleLogin}>
            Get Access Token | Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
