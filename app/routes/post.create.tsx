import { ActionIcon, Box, Button, Divider, Select, Space, TextInput, Title } from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import PostUpload from "~/components/Post/Upload";

export default function PostCreate() {
  const boards = [
    { id: "1", name: "공지사항" },
    { id: "2", name: "자유게시판" },
  ];
  return (
    <Box style={{ padding: "0 50px", paddingTop: "50px", width: "calc(100% - 100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Link to={"/"}>
          <ActionIcon variant="transparent" color="black" aria-label="Settings">
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Space w="xs" />
        <Title>글 작성</Title>
      </Box>
      <Divider mt={20} mb={20} />
      <Form method="post">
        <Box style={{ display: "flex" }}>
          <Select
            name="board_id"
            size="xl"
            placeholder="게시판"
            data={boards.map((board) => ({
              value: board.id.toString(),
              label: board.name,
            }))}
          />
          <Space w="md" />
          <TextInput style={{ width: "100%" }} placeholder="제목" variant="filled" size="xl" name="title" />
        </Box>
        <Space h="xl" />
        <PostUpload />
        <Space h="xl" />
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">작성하기</Button>
        </Box>
      </Form>
    </Box>
  );
}
