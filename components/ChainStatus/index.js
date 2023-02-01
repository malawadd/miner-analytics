import React from "react";
import { Box } from "@chakra-ui/react";
import { Loader, Center, Notification, Text, Group } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import moment from "moment";

// Covalent API Key
const APIKey = process.env.NEXT_PUBLIC_API_KEY;

export default function ChainStatus() {
  // used React-Query to fetch zondax API
  const { data, error, isFetching } = useQuery(["chainStatus"], async () => {
    const res = await fetch(
      `https://api.zondax.ch/fil/data/v1/hyperspace/tipset/latest` ,{
        method: "get",
        headers: {
          Authorization: "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE2NzYxMTYyODMsImp0aSI6Ik1vaGFtbWVkIEFsYXdhZCxtYWxhd2FkQG91dGxvb2suY29tIn0.IFZMDcjxX1BvPSzzZZXOMYhiQIv3Th-Tr2i4qRSiV59l3fLsJhTcaZZ0XezyELgVlBdptV7xC17bU2kTZOKO0g" ,
          "Content-Type": "application/json"
        }
      } 
    );
    console.log(res)
    return res.json();
  });

  console.log("data is ",data)
  

  const chainStatus = data?.height;
  console.log("chainstatus",chainStatus)

  const blockedSignedAt = data?.timestamp;
  console.log("time",blockedSignedAt)

  if (isFetching) return (<Center><Loader size="xs" color="green" variant="oval" /></Center>);

  if (error)
    return (
      <Center
        style={{
          position: "fixed",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Fetch Chain Status API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Group spacing={5}>
        <Text c="dimmed" fz="xs">
          Synced Tipset Height
        </Text>
        <Text fw={500} color="teal">
          {chainStatus}
        </Text>
        <Text c="dimmed" fz="xs">
          {moment(blockedSignedAt).fromNow()}
        </Text>
      </Group>
    </Box>
  );
}
