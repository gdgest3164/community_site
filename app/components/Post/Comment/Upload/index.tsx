import { Box, Button, Space, Textarea } from "@mantine/core";
import { Form } from "@remix-run/react";
import { useNavigation } from "react-router-dom";
import { InputType } from "~/routes/$boardId.$postId._index";

export default function CommentUpload() {
  const navigation = useNavigation();
  return (
    <Box>
      <Form method="post">
        <Textarea name="commentContent" placeholder="댓글을 입력하세요." disabled={navigation.state === "submitting"}></Textarea>
        <Space h="lg" />
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" name="action" value={InputType.CREATE_COMMENT}>
            작성하기
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
