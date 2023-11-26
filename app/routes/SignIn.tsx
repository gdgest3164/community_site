import type { IActionData } from "./auth";
import { ActionIcon, Box, Button, Card, Divider, Group, Input, Space, Text } from "@mantine/core";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useState } from "react";

export default function SignIn() {
  const navigation = useNavigation();
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<IActionData>();

  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.message.title,
        message: message.message.message,
        color: message.message.color,
      });
    }
  }, [message]);
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group style={{ spacing: "xs" }}>
          <Link to="/">
            <ActionIcon variant="transparent" color="gray" size="lg" aria-label="Settings">
              <IconChevronLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <Text style={{ weight: "500" }}>로그인</Text>
        </Group>
        <Divider my="md" />
        <Form method="post">
          <Input
            name="email"
            type="email"
            variant="filled"
            placeholder="이메일"
            disabled={navigation.state === "submitting"} // UI 최적화
            required
          />
          <Space h="sm" />
          <Input name="password" type="password" variant="filled" placeholder="비밀번호" disabled={navigation.state === "submitting"} required />
          <Space h="sm" />
          <Button type="submit" fullWidth radius="md" loading={navigation.state === "submitting"}>
            로그인
          </Button>
          <Space h="sm" />
          <Link to="/auth/sign-up">
            <Button variant="light" fullWidth radius="md" disabled={navigation.state === "submitting"}>
              회원가입
            </Button>
          </Link>
        </Form>
      </Card>
    </Box>
  );
}
