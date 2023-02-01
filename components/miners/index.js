import React from "react";
import { Center, Notification, Text, SimpleGrid } from "@mantine/core";
import { Flex } from "@chakra-ui/react";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import moment from "moment";
import LoaderComp from "../LoaderComp";
import VolumeChart from "./VolumeChart";
import LiquidityChart from "./LiquidityChart";
import Stats from "./Stats";
import MinersPool from "./MinersPool";


export default function MinersOverview() {
  // used React-Query to fetch coingecko API
  const { data, error, isFetching } = useQuery(["Price"], async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/filecoin/market_chart?vs_currency=usd&days=183&interval=daily"
    );
    return res.json();
  });

  console.log("data is ", data);

  // Chart data for filecoin market_caps
  const marketCap = data?.market_caps.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    MarketCap: item[1],
  }));

  // Chart data for filecoin price
  const prices = data?.prices.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    Price: item[1],
  }));

  if (isFetching) return <LoaderComp />;

  if (error)
    return (
      <Center
        style={{
          width: "100%",
          height: "20%",

          left: "0px",
          top: "0px",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Fetch filecoin Chart API
        </Notification>
      </Center>
    );

  return (
    <>
      <Text c="dimmed" fz="xl" tt="uppercase">
        Miners Overview
      </Text>
      <Flex justifyContent="space-evenly">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <VolumeChart prices={prices} />
            <LiquidityChart marketCap={marketCap} />
        </SimpleGrid>
      </Flex>
      <Stats />
      <MinersPool />

    </>
  );
}
