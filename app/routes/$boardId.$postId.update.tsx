import { ActionIcon, Box, Button, Divider, Space, TextInput } from "@mantine/core";
import { Form, Link, useParams } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import PostUpload from "~/components/Post/Upload";

// interface ILoaderData {
//   post: {
//     title: string;
//     content: string;
//   };
// }

export default function PostIdUpdate() {
  // const { post } = useLoaderData<ILoaderData>();
  const post = { content: "test", title: "제목" };
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
