import { Box, Button, Space, Text, Title } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import { Link } from "react-router-dom";

interface IHeader {
  is_login: boolean;
}
export default function Header({ is_login }: IHeader) {
  const location = useLocation();
  return (
    <Box style={{ padding: "0 50px", width: "calc(100% - 100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box style={{ height: "75px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <Title order={3}>Remix Community</Title>
          </Link>
          <Space w="xl" />
          <Space w="xl" />
          <Link to="/shop">
            <Text
              style={{
                color: location.pathname === "/shop" ? "black" : "gray",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              상점
            </Text>
          </Link>
        </Box>
        <Box style={{ display: "flex" }}>
          {is_login ? (
            <>
              <Link to="/post/create">
                <Button>글쓰기</Button>
              </Link>
              <Space w="xs" />
              <Link to="/auth/sign-out">
                <Button variant="light">로그아웃</Button>
              </Link>
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button variant="light">로그인</Button>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
