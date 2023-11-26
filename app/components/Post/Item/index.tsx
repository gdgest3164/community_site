import { Badge, Box, Divider, Space, Text } from "@mantine/core";
import { Link } from "@remix-run/react";

interface IPostItem {
  post: any;
  path: string;
}
export default function PostItem({ post, path }: IPostItem) {
  return (
    <>
      <Link to={`/${path}/${post.id}`} prefetch="intent">
        <Box style={{ width: "100%", display: "flex", alignContent: "center", justifyContent: "space-between" }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Badge color="blue" mr="md">
              {path}
            </Badge>
            <Text>{post.title}</Text>
          </Box>
          <Box style={{ display: "flex" }}>
            <Text>{post.writer.name}</Text>
            <Space w="md" />
            <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
            <Space w="md" />
            <Text>조회 {post.view}회</Text>
          </Box>
        </Box>
      </Link>
      <Divider my="xs" />
    </>
  );
}
