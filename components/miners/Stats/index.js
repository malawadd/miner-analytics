import React from "react";
import { useQuery } from "react-query";
import { Center, Notification } from "@mantine/core";
import StatsOverview from "./StatsOverview";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../LoaderComp";

export default function Stats() {
  const { data, error, isFetching } = useQuery(["Stats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      "https://api.coingecko.com/api/v3/coins/filecoin?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    );
    return res.json();
  });

  const { data2} = useQuery(["miners"], async () => {
    const res2 = await fetch(
      `https://api.filrep.io/api/miners`
    );
    // console.log("data res1 ", res2);
    return res2.json();
  });


  // console.log("data2",data2);

  if (isFetching)
    return (
     <LoaderComp />
    );

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
          Error! Failed to Fetch Filecoin Stats API
        </Notification>
      </Center>
    );
  return (
    <>
      <StatsOverview data={data} data2={data2} />
    </>
  );
}
