import { ActionIcon, Box, Button, Divider, Space, TextInput } from "@mantine/core";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import QueryString from "qs";
import { authenticate } from "~/auth.server";
import PostUpload from "~/components/Post/Upload";
import { getPostById, updatePost, type TPost } from "~/models/post.service";
import supabase from "~/models/supabase";

interface ILoaderData {
  post: TPost;
}

interface InputData {
  id: string;
  title: string;
  content: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const post = await getPostById(postId);

  const { accessToken } = await authenticate(request);
  if (!accessToken) return redirect("/auth/sign-in");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (user && user.id !== post.data.writer.user_id) return redirect("/auth/sign-in");
  return json<ILoaderData>({ post: post.data });
};

export const action: ActionFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const boardId = params.boardId as string;

  const data = QueryString.parse(await request.text()) as unknown as InputData;
  const post = await getPostById(postId);

  const { accessToken } = await authenticate(request);
  if (!accessToken) return redirect("/auth/sign-in");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (user && user.id !== post.data.writer.user_id) return redirect("/auth/sign-in");

  await updatePost(postId, data.title, data.content);

  return redirect(`/${boardId}/${postId}`);
};

export default function PostIdUpdate() {
  const { post } = useLoaderData<ILoaderData>();
  const { boardId, postId } = useParams();
  return (
    <Box>
      <Form method="post">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/${boardId}/${postId}`}>
            <ActionIcon variant="transparent" color="black" aria-label="Settings">
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <TextInput style={{ width: "100%" }} placeholder="제목" variant="filled" size="xl" name="title" defaultValue={post.title as string} />
        </Box>
        <Divider mt={20} mb={15} />
        <Box>
          <PostUpload defaultValue={post.content} />
        </Box>
        <Space h="xl" />
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">수정하기</Button>
        </Box>
        <Divider mt={20} mb="xs" />
      </Form>
    </Box>
  );
}
