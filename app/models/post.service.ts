import type { TComment } from "./comment.service";
import supabase from "./supabase";

export type TPost = {
  id: number;
  title: string | null;
  content: string | null;
  created_at: string;
  writer: {
    name: string;
    user_id: string;
  };
  board: {
    name: string;
    path: string;
  };
  view: number;
  comment: TComment | TComment[] | null;
};

//게시글 최신순으로 모두 불러오기
export async function getPosts() {
  return await supabase.from("post").select("*").order("created_at", { ascending: false });
}

//특정 게시판의 게시글을 최신순으로 정렬하여 불러오기
export async function getPostByBoardId(board_id: number) {
  return await supabase.from("post").select("*, writer(name)").eq("board_id", board_id).order("created_at", { ascending: false });
}

//게시글 id를 통해 댓글을 최신순으로 정렬하면서 게시글 불러오기
export async function getPostById(id: number) {
  return await supabase.from("post").select("*, writer(name, user_id), comment(*, writer(name, user_id)").order("created_at", { foreignTable: "comment", ascending: false }).eq("id", id).single();
}

//미리 정의해둔 post_view_increment 함수를 RPC로 실행
export async function updateViewById(id: number) {
  return await supabase.rpc("post_view_increment", { x: 1, row_id: id });
}

// 게시글 생성하기
export async function createPost(title: string, content: string, board_id: number, writer: string) {
  return await supabase.from("post").insert({ title, content, board_id, writer });
}

// 게시글 수정하기
export async function updatePost(id: number, title: string, content: string) {
  return await supabase.from("post").update({ title, content }).eq("id", id);
}

// 게시글 삭제하기
export async function deletePost(id: number) {
  return await supabase.from("post").delete().eq("id", id);
}
