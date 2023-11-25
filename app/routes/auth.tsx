import { showNotification } from "@mantine/notifications";
import { Outlet, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export interface IActionData {
  error: boolean;
  message: TmEssage;
}

export default function Auth() {
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<TmEssage>();

  useEffect(() => {
    if (actionData) setMessage(actionData.message);
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.title,
        message: message.message,
        color: message.color,
      });
    }
  }, [message]);

  return <Outlet />;
}
