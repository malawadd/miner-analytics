import React from "react";
import { Box } from "@chakra-ui/react";
import { Center, Notification, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import LoaderComp from "../../LoaderComp";


export default function MinersPool() {
  
  const { data, error, isFetching } = useQuery(["Pool"], async () => {
    const res = await fetch(
      `https://api.filrep.io/api/miners`
    );
    return res.json();
  });
  const items = data?.pagination?.total;
  console.log("data is ", data);
  console.log("total is ", items);

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
  
      </Box>
    </Box>
  );
}
