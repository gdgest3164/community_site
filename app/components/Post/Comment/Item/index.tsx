import { ActionIcon, Box, Button, Menu, Modal, Space, Text, Textarea } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface ICommentItem {
  comment: any;
  is_owner: boolean;
}
export default function CommentItem({ comment, is_owner }: ICommentItem) {
  const fetcher = useFetcher();
  const createdAtDate = new Date(comment.created_at ?? "");
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <Box style={{ padding: "15px", borderBottom: "1px solid #eaeaea", userSelect: "element", background: "#ebebeb", borderRadius: "10px" }}>
      <Box>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Text>{comment.writer.name}</Text>
            <Text>
              {createdAtDate.toLocaleDateString()} {createdAtDate.toLocaleTimeString()}
            </Text>
          </Box>
          {is_owner && (
            <Box>
              <Menu shadow="md" width={200} position="left-start">
                <Menu.Target>
                  <ActionIcon variant="transparent" color="black" aria-label="Settings">
                    <IconDotsVertical />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconPencil size={24} />} onClick={() => setMode("edit")}>
                    글 수정하기
                  </Menu.Item>
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
            </Box>
          )}
        </Box>
        <Space h="md" />
        {mode === "view" ? (
          <Text>{comment.content}</Text>
        ) : (
          <Box>
            <fetcher.Form
              method="post"
              onSubmit={() => {
                setMode("view");
              }}
            >
              <input type="hidden" name="commentId" value={comment.id} />
              <Textarea name="commentContent" placeholder="댓글을 입력하세요." defaultValue={comment.content ?? ""} />
              <Space h="lg" />
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <Button variant="default" onClick={() => setMode("view")}>
                  취소
                </Button>
                <Space w="xs" />
                <Button color="red" type="submit" name="action">
                  수정하기
                </Button>
              </Box>
            </fetcher.Form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
