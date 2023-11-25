import { Box, Button, Space, Textarea } from "@mantine/core";
import { useFetcher, useNavigation } from "react-router-dom";

export default function CommentUpload() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  return (
    <Box>
      <fetcher.Form method="post">
        <Textarea name="commentContent" placeholder="댓글을 입력하세요." disabled={navigation.state === "submitting"}></Textarea>
        <Space h="lg" />
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" name="action">
            작성하기
          </Button>
        </Box>
      </fetcher.Form>
    </Box>
  );
}
