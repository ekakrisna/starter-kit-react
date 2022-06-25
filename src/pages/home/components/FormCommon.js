import { Checkbox, DatePicker, Radio, Select } from "antd";
import React, { useMemo, useState } from "react";

const FormCommon = () => {
  const [formData, setFormData] = useState({
    select: "",
    radio: "",
    checkbox: [],
    date: "",
  });

  const optionsRadio = useMemo(() => {
    return [
      {
        value: "",
        label: "Semua",
      },
      {
        value: "1",
        label: "Rule 1",
      },
      {
        value: "2",
        label: "Rule 2",
      },
      {
        value: "3",
        label: "Rule 3",
      },
    ];
  }, []);

  const optionsCheckbox = useMemo(() => {
    return [
      {
        value: "1",
        label: "Checkbox 1",
      },
      {
        value: "2",
        label: "Checkbox 2",
      },
      {
        value: "3",
        label: "Checkbox 3",
      },
    ];
  }, []);

  const optionsSelect = useMemo(() => {
    return [
      {
        label: "Semua",
        value: "",
      },
      {
        label: "Pilihan 1",
        value: "1",
      },
      {
        label: "Pilihan 2",
        value: "2",
      },
      {
        label: "Pilihan 3",
        value: "3",
      },
      {
        label: "Pilihan 4",
        value: "4",
      },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Select
          allowClear
          showSearch
          value={formData.select}
          onChange={(e) => {
            console.log("onChange", e);
            setFormData((state) => ({
              ...state,
              select: e,
            }));
          }}
          optionFilterProp="label"
          style={{ width: "100%" }}
          options={optionsSelect}
        />
      </div>
      <div>
        <Radio.Group
          value={formData.radio}
          options={optionsRadio}
          onChange={(e) => {
            setFormData((state) => ({
              ...state,
              radio: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <Checkbox.Group
          value={formData.checkbox}
          options={optionsCheckbox}
          onChange={(e) => {
            setFormData((state) => ({
              ...state,
              checkbox: e,
            }));
          }}
        />
      </div>
      <div>
        <DatePicker
          value={formData.date}
          onChange={(e) => setFormData((state) => ({ ...state, date: e }))}
          style={{ width: "100%" }}
        />
      </div>
      <div className="p-3 border border-gray-300">
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormCommon;
