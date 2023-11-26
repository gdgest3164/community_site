import { Box, Space } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/SideBar";
import { getBoards, type TBoard } from "~/models/board.service";
import { getPosts, type TPost } from "~/models/post.service";

interface ILoaderData {
  boards: TBoard[] | [];
  posts: TPost[] | [];
}

export const loader: LoaderFunction = async ({ request }) => {
  const boards = await getBoards();
  const recentPost = await getPosts();
  return json<ILoaderData>({
    boards: boards.data as TBoard[],
    posts: recentPost.data as TPost[],
  });
};

export default function Index() {
  const { boards, posts } = useLoaderData<ILoaderData>();
  return (
    <Box style={{ display: "flex", padding: "0 50px", paddingTop: "50px", width: "calc(100% -100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box>
        <SideBar boards={boards ?? []} />
      </Box>
      <Space w="xl" />
      <Box style={{ width: "100%" }}>{posts ? posts.map((post: any) => <PostItem key={post.id} post={post} path={post.board.path} />) : null}</Box>
    </Box>
  );
}
