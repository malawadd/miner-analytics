import React from "react";
import { Box } from "@chakra-ui/react";
import { Center, Notification, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import LoaderComp from "../../LoaderComp";
import MinersTable from "./MinersTable";


export default function MinersPool() {
  
  const { data, error, isFetching } = useQuery(["rawPower" , {limit: 5}], async () => {
    // const res = await fetch(
    //   `https://api.filrep.io/api/v1/miners?sortBy=score&&limit=15&&order=desc`,{
    //     Parameter: {
    //       sortBy: "rawPower" ,
    //       order: "desc",
    //       limit: 60,
    //       "Content-Type": "application/json"
    //     }
    //   } 
    // );

    // const res = await fetch(
    //   `https://api.covalenthq.com/v1/9001/xy=k/cronus/pools/?key=ckey_862f024fa4544498b05c7f76104`
    // );

    const res = await fetch(
      `https://api.filrep.io/api/v1/miners?sortBy=score&&limit=15&&order=desc`
    );

    console.log("what is res ", res)
    return res.json();
  });
  const Total = data?.pagination?.total;
  const items = data?.miners;
  // const items = data?.data?.items;
  console.log("data is ", data);
  console.log("items is ", items);

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
          Error! Failed to Fetch Cronus Pool API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Box minWidth="1220" maxW="600" justifyItems="center" mx="auto" mb="20">
        <Text fw={500}>Top Miners</Text>
        <MinersTable data = {items} />
        {/* <MinersTable  /> */}
  
      </Box>
    </Box>
  );
}
