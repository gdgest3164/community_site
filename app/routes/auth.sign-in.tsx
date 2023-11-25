import { ActionIcon, Box, Button, Card, Divider, Group, Input, Space, Text } from "@mantine/core";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import { IconChevronLeft } from "@tabler/icons-react";
import QueryString from "qs";
import { createUserSession, getUserToken } from "~/auth.server";
import supabase from "~/models/supabase";
import type { IActionData } from "./auth";

interface InputData {
  email: string;
  password: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);
  if (accessToken) return redirect("/");
  return {};
};

export const action: ActionFunction = async ({ request }) => {
  const inputData = QueryString.parse(await request.text()) as unknown as InputData;
  const { data, error } = await supabase.auth.signInWithPassword(inputData);
  console.log(data, error);
  if (error) {
    return json<IActionData>({
      error: true,
      message: {
        title: "로그인 실패",
        message: error.message,
        color: "red",
      },
    });
  }

  return await createUserSession({
    request,
    access_token: data.session?.access_token as string,
    refresh_token: data.session?.refresh_token as string,
    expires_at: data.session?.expires_at as number,
    user: data.user as User,
    redirectTo: "/",
  });
};

export default function SignIn() {
  const navigation = useNavigation();
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
