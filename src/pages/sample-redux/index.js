import { Button, Input } from "antd";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
  COUNTER_DECREMENT,
  COUNTER_DECREMENT_WITH_VALUE,
  COUNTER_INCREMENT,
  COUNTER_INCREMENT_WITH_VALUE,
} from "../../store/actions";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const SampleReduxPage = () => {
  const { counter } = useSelector(
    (state) => ({
      counter: state.counter,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [value, setValue] = useState(1);

  return (
    <Layout>
      <div>Sample Redux</div>
      <div>{counter}</div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => {
              dispatch({
                type: COUNTER_INCREMENT,
              });
            }}
            icon={<PlusOutlined />}
            type="primary"
          >
            Increment
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: COUNTER_DECREMENT,
              });
            }}
            icon={<MinusOutlined />}
            type="primary"
            danger
          >
            Decrement
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => {
                dispatch({
                  type: COUNTER_INCREMENT_WITH_VALUE,
                  payload: value,
                });
              }}
              icon={<PlusOutlined />}
              type="primary"
            >
              Increment with value
            </Button>
            <Button
              onClick={() => {
                dispatch({
                  type: COUNTER_DECREMENT_WITH_VALUE,
                  payload: value,
                });
              }}
              icon={<MinusOutlined />}
              type="primary"
              danger
            >
              Decrement with value
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SampleReduxPage;
