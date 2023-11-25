import { Box, Space } from "@mantine/core";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/SideBar";

export default function Index() {
  return (
    <Box style={{ display: "flex", padding: "0 50px", paddingTop: "50px", width: "calc(100% -100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box>
        <SideBar boards={[{ path: "/notice", name: "공지사항" }]} />
      </Box>
      <Space w="xl" />
      <Box style={{ width: "100%" }}>
        {(
          [
            { id: 1, title: "제목1", writer: { name: "김동한" }, created_at: "2023-11-25", view: 1, board: { name: "공지사항", path: "notice" } },
            { id: 2, title: "제목2", writer: { name: "김동한2" }, created_at: "2023-11-25", view: 1, board: { name: "공지사항", path: "notice" } },
          ] as any
        ).map((post: any) => (
          <PostItem key={post.id} post={post} path={post.board.path} />
        ))}
      </Box>
    </Box>
  );
}
