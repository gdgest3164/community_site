import { ActionIcon, Box, Button, Divider, Menu, Modal, Space, Text, Title } from "@mantine/core";
import { Link, useFetcher, useParams } from "@remix-run/react";
import { IconChevronLeft, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import CommentItem from "~/components/Post/Comment/Item";
import CommentUpload from "~/components/Post/Comment/Upload";
import PostView from "~/components/Post/Viewer";

export default function PostId() {
  const fetcher = useFetcher();
  const { boardId } = useParams();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const post = { id: 1, title: "제목", writer: { name: "김동한" }, created_at: "2023-11-25", view: 1, content: "내용" };
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
                <Menu.Item color="red" leftSection={<IconTrash size={24} />} onClick={() => setDeleteModalOpened(true)}>
                  글 삭제하기
                </Menu.Item>
              </Link>
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
      <CommentUpload />
      <Space h="lg" />
      {[{ id: 1, writer: { name: "김동한" }, content: "댓글", created_at: "2023-11-25" }].map((comment, i) => (
        <CommentItem key={i} comment={comment} is_owner={true} />
      ))}
      <Space h="lg" />
    </Box>
  );
}
