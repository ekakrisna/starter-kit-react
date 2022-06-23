import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoForm from './TodoForm';
import { Button } from 'antd';

const TodoItem = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-2 bg-white border border-gray-300">
      <div className="flex flex-col gap-2">
        <div>{new Date(data.createdAtUnix).toLocaleString('ID-id')}</div>
        <div>{data.text}</div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  data: PropTypes.any,
};

export default TodoItem;
