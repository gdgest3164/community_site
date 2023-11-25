import { Box, Button, Grid, Space, Text, Title } from "@mantine/core";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useState } from "react";
import PointSelect from "~/components/Point/Select";

export default function Shop() {
  //   const { user, point } = useLoaderData<ILoaderData>();
  const clientKey = process.env.TOSS_CLIENT_KEY as string;
  const [selected, setSelected] = useState(2000);
  return (
    <Box
      style={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Title>포인트 구매하기</Title>
      <Text>1 포인트 보유</Text>
      <Space h="xl" />
      <Grid columns={4}>
        <Grid.Col span={1}>
          <PointSelect value={2000} is_select={selected === 2000} onClick={() => setSelected(2000)} />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect value={5000} is_select={selected === 5000} onClick={() => setSelected(5000)} />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect value={10000} is_select={selected === 10000} onClick={() => setSelected(10000)} />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect value={30000} is_select={selected === 30000} onClick={() => setSelected(30000)} />
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Box style={{ display: "flex", justifyContent: "end" }}>
        <Button
          style={{ width: "150px" }}
          onClick={() =>
            loadTossPayments(clientKey).then((tossPayment) =>
              tossPayment.requestPayment("카드", {
                amount: 1, // 결제 금액
                orderId: Math.random().toString(36).substring(2, 11), // 랜덤 문자열
                orderName: `${selected}P 구매`,
                customerName: "김동한",
                successUrl: `${window ? window.location.origin : ""}/shop/success`,
                failUrl: `${window ? window.location.origin : ""}/shop/fail`,
                customerEmail: "rlaehdgs12@naver.com",
              })
            )
          }
        >
          구매하기
        </Button>
      </Box>
    </Box>
  );
}
