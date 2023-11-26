import { Box, Divider, Space, Text, Title } from "@mantine/core";
import SideBar from "~/components/SideBar";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { TBoard } from "~/models/board.service";
import { getBoards, getBoradByPath } from "~/models/board.service";
import type { TPost } from "~/models/post.service";
import { getPostByBoardId } from "~/models/post.service";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import PostItem from "~/components/Post/Item";

interface ILoaderData {
  boards: TBoard[] | [];
  posts?: TPost[] | [];
}

export const loader: LoaderFunction = async ({ params }) => {
  const path = params.boardId as string;
  const boards = await getBoards();

  if (path) {
    const selectedBoard = await getBoradByPath(path);
    if (!selectedBoard.data) return json<ILoaderData>({ boards: boards.data as TBoard[] });

    const posts = await getPostByBoardId(selectedBoard.data.id as number);
    return json<ILoaderData>({ boards: boards.data as TBoard[], posts: posts.data ?? [] });
  }

  return json<ILoaderData>({ boards: boards.data as TBoard[] });
};

export default function Index() {
  const { boards, posts } = useLoaderData<ILoaderData>();
  const { boardId } = useParams();
  return (
    <Box style={{ display: "flex", padding: "0 50px", paddingTop: "50px", width: "calc(100% -100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box>
        <SideBar boards={boards ?? []} />
      </Box>
      <Space w="xl" />
      <Box style={{ width: "100%" }}>
        <Outlet />
        <Text style={{ fontWeight: "700" }}>게시글 {posts ? posts.length : 0}개</Text>
        <Divider mt={20} mb={"xs"} />
        {posts && posts.length > 0 ? (
          posts.map((post, i: number) => <PostItem post={post} path={boardId as string} key={i} />)
        ) : (
          <>
            <Title order={3}>글이 없습니다</Title>
          </>
        )}
        <Space h={50} />
      </Box>
    </Box>
  );
}
