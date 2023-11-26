import supabase from "./supabase";

export type TBoard = {
  id: number;
  name: string;
  path: string;
  created_at: string | null;
};

//게시판 모두 불러오기
export async function getBoards() {
  return await supabase.from("board").select("*");
}

//특정 path를 가진 게시판 가져오기
export async function getBoradByPath(path: string) {
  return await supabase.from("board").select("*").eq("path", path).single();
}
