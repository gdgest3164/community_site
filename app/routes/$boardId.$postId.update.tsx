import { Box, Space } from "@mantine/core";

export default function BoardId() {
  return (
    <Box style={{ display: "felx", padding: "0 50px", paddingTop: "50px", width: "calc(100% -100pc)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box>Sidebar 위치</Box>
      <Space w="xl" />
      <Box style={{ width: "100%" }}>게시글 리스트 위치</Box>
    </Box>
  );
}
