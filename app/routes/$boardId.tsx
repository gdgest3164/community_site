import { Box, Space } from "@mantine/core";
import SideBar from "~/components/SideBar";
import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <Box style={{ display: "flex", padding: "0 50px", paddingTop: "50px", width: "calc(100% -100px)", maxWidth: "1100px", margin: "0 auto" }}>
      <Box>
        <SideBar boards={[{ path: "/notice", name: "공지사항" }]} />
      </Box>
      <Space w="xl" />
      <Box style={{ width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
