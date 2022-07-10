import { notification } from "antd";

export const pushNotif = (type, content, description, duration = 4.5) => {
  notification[type]({
    message: content,
    description: description,
    duration: duration,
  });
};
