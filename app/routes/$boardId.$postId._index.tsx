import { ActionIcon, Box, Button, Divider, Menu, Modal, Space, Text, Title } from "@mantine/core";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useActionData, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import { IconChevronLeft, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { getUserToken } from "~/auth.server";
import CommentItem from "~/components/Post/Comment/Item";
import CommentUpload from "~/components/Post/Comment/Upload";
import PostView from "~/components/Post/Viewer";
import type { TPost } from "~/models/post.service";
import { deletePost, getPostById, updateViewById } from "~/models/post.service";
import supabase from "~/models/supabase";
import type { IActionData } from "./auth";
import { createComment, getCommentById, updateComment, type TComment, deleteComment } from "~/models/comment.service";
import { showNotification } from "@mantine/notifications";

interface ILoaderData {
  is_login: boolean;
  user?: User | null;
  post: TPost;
}

export enum InputType {
  DELETE_POST = "0",
  CREATE_COMMENT = "1",
  UPDATE_COMMENT = "2",
  DELETE_COMMENT = "3",
}

type InputData = {
  action: InputType;
  commentId: string;
  commentContent: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const post = await getPostById(postId);
  await updateViewById(postId);

  const { accessToken } = await getUserToken(request);
  if (!accessToken) {
    return json<ILoaderData>({ is_login: false, post: post.data as unknown as TPost });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  return json<ILoaderData>({ is_login: true, user, post: post.data as unknown as TPost });
};

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId as string;
  const postId = parseInt(params.postId as string);
  const data = QueryString.parse(await request.text()) as unknown as InputData;
  const post = await getPostById(postId);
  const { accessToken } = await getUserToken(request);
  if (!accessToken) {
    return json<ILoaderData>({ is_login: false, post: post.data as unknown as TPost });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  switch (data.action) {
    case InputType.DELETE_POST: {
      if (user && (user as User).id === post.data.writer.user_id) {
        await deletePost(postId);
        return redirect(`/${boardId}`);
      } else {
        return json<IActionData>({
          error: true,
          message: {
            title: "삭제 실패",
            message: "권한이 없습니다.",
            color: "red",
          },
        });
      }
    }
    case InputType.CREATE_COMMENT: {
      if (user && data.commentContent) {
        await createComment(postId, user.id, data.commentContent);
        return redirect(`/${boardId}/${postId}`);
      } else {
        return json<IActionData>({
          error: true,
          message: {
            title: "댓글 작성 실패",
            message: "권한이 없습니다.",
            color: "red",
          },
        });
      }
    }
    case InputType.UPDATE_COMMENT: {
      if (user && data.commentId && data.commentContent) {
        const originalComment = await getCommentById(parseInt(data.commentId));
        if (originalComment.data.writer.user_id !== user.id) {
          return json<IActionData>({
            error: false,
            message: {
              title: "댓글 수정 실패",
              message: "권한이 없습니다.",
              color: "red",
            },
          });
        }
        await updateComment(parseInt(data.commentId), data.commentContent);
        return redirect(`/${boardId}/${postId}`);
      } else {
        return json<IActionData>({
          error: true,
          message: {
            title: "댓글 수정 실패",
            message: "권한이 없습니다.",
            color: "red",
          },
        });
      }
    }
    case InputType.DELETE_COMMENT: {
      if (user && data.commentId) {
        const originalComment = await getCommentById(parseInt(data.commentId));
        if (originalComment.data.writer.user_id !== user.id) {
          return json<IActionData>({
            error: false,
            message: {
              title: "댓글 삭제 실패",
              message: "권한이 없습니다.",
              color: "red",
            },
          });
        }

        await deleteComment(parseInt(data.commentId));
        return redirect(`/${boardId}/${postId}`);
      } else {
        return json<IActionData>({
          error: false,
          message: {
            title: "댓글 삭제 실패",
            message: "권한이 없습니다.",
            color: "red",
          },
        });
      }
    }
  }
};

export default function PostId() {
  const { post, is_login, user } = useLoaderData<ILoaderData>();
  const fetcher = useFetcher();
  const { boardId } = useParams();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
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
    <Box>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link to={`/${boardId}`}>
            <ActionIcon variant="transparent" color="black" aria-label="Settings">
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <Title>{post.title}</Title>
        </Box>

        {is_login && user && user.id === post.writer.user_id && (
          <>
            <Menu shadow="md" width={200} position="left-start">
              <Menu.Target>
                <ActionIcon variant="transparent" color="black" aria-label="Settings">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Link to={`/${boardId}/${post.id}/update`}>
                  <Menu.Item leftSection={<IconPencil size={24} />}>글 수정하기</Menu.Item>
                </Link>
                <Menu.Item color="red" leftSection={<IconTrash size={24} />} onClick={() => setDeleteModalOpened(true)}>
                  글 삭제하기
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Modal opened={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} title="글 삭제">
              <Text style={{ align: "center" }}>정말 글을 삭제하시겠습니까?</Text>
              <Space h="lg" />
              <Space h="lg" />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
                  취소
                </Button>
                <Space w="md" />
                <fetcher.Form method="post">
                  <Button color="red" type="submit" name="action" value={0}>
                    삭제
                  </Button>
                </fetcher.Form>
              </Box>
            </Modal>
          </>
        )}
      </Box>
      <Divider mt={20} mb={15} />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>{post.writer.name}</Text>
        <Box style={{ display: "flex" }}>
          <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
          <Space w="md" />
          <Text>조회 {post.view}회</Text>
        </Box>
      </Box>
      <Space h="xl" />
      <Box>
        <PostView content={post.content ?? "글이 없습니다."} />
      </Box>
      <Divider mt={20} mb={15} />
      {user && <CommentUpload />}
      <Space h="lg" />
      <Text style={{ fontWeight: "700" }}>댓글 {(post.comment as TComment[]).length} 개</Text>
      {(post.comment as TComment[]).map((comment, i: number) => {
        return (
          <div key={i}>
            <CommentItem comment={comment} is_owner={Boolean(user && comment.writer.user_id === user.id)} /> <Space h={"sm"} />
          </div>
        );
      })}
      <Space h="lg" />
    </Box>
  );
}
