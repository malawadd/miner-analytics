import React, { useState } from "react";
import {
  createStyles,
  Table,
  Group,
  Text,
  ThemeIcon,
  Center,
  Paper,
  ScrollArea,
  TextInput,
   Notification
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons";
import { useQuery } from "react-query";
import LoaderComp from "../../../LoaderComp";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  th: {
    padding: "0 !important",
    extalign: "right",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    width: 1220,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

// export default function MinersTable({ data }) {

export default function MinersTable({data}) {
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles();

  // const { data, error, isFetching } = useQuery(["rawPower" , {limit: 5}], async () => {
  //   const res = await fetch(
  //     `https://api.filrep.io/api/v1/miners?sortBy=score&&limit=15&&order=desc`,{
  //       Parameter: {
  //         sortBy: "rawPower" ,
  //         order: "desc",
  //         limit: 60,
  //         "Content-Type": "application/json"
  //       }
  //     } 
  //   );
  //   console.log("what is res 1", res)
  //   return res.json();
  // });
  // const Total = data?.pagination?.total;
  // const items = data?.miners;
  console.log("lol is is  is ", data);
  // console.log("what did i pass ", items);

  const DiffIcon =
    data.dataStored > 0 ? IconArrowUpRight : IconArrowDownRight;

  var numbro = require("numbro");

  const rows = data.map((index) => (
    <tr key={index.status}>
      <td>
        <Group>
          {index.address}-
          {index.isoCode}
        </Group>
      </td>

      <td>
        {numbro(index.maxPieceSize).format({
                  mantissa: 2,
                  average: true,
                  output: "byte",
                  base: "binary",
                  spaceSeparated: true,
                })}
      </td>
      <td>
        {numbro(index.rank).format({
              mantissa: 2,
            })}
        
      </td>
      <td>
        {(index.reachability)}
      </td>
      <td>
        {numbro(index.storageDeals.total).format({
              mantissa: 2,
            })}
      </td>
      <td>
        <Group spacing="2xs">
          <Text>
            <Text
              color={
                numbro(index.storageDeals.dataStored).format({
                  mantissa: 2,
                  average: true,
                  output: "byte",
                  base: "binary",
                  spaceSeparated: true,
                }) > 0
                  ? "teal"
                  : "green"
              }
            >
              {numbro(index.storageDeals.dataStored).format({
                  mantissa: 2,
                  average: true,
                  output: "byte",
                  base: "binary",
                  spaceSeparated: true,
              })}
            </Text>
          </Text>

          <ThemeIcon
            color="gray"
            variant="subtle"
            sx={(theme) => ({
              color:
                numbro(index.dataStored).format({
                  mantissa: 2,
                  average: true,
                  output: "byte",
                  base: "binary",
                  spaceSeparated: true,
                }) > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={30}
            radius="full"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
      </td>
    </tr>
  ));

  console.log("what is rows ", rows);
  console.log("what is row worng ", <tbody>{rows}</tbody>);

  return (
    <>
      <Center>
        <Paper width="600" withBorder className={classes.card}>
          <ScrollArea
            sx={{ height: 400 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <TextInput placeholder="Search by Ticker name" mb="md" />
            <Table
              highlightOnHover
              horizontalSpacing="xl"
              verticalSpacing="xs"
              sx={{ tableLayout: "fixed", minWidth: 700 }}
            >
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr c="dimmed" fw={700} tt="uppercase">
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Address
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                    maxPieceSize
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Rank
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                    reachability
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      storage deals total
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Data Stored
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody> {rows}
              </tbody>
                {/* <tbody> 
                <tr>
                <td>f01662887</td>
                <td> {numbro(34359738368).format({
              mantissa: 2,
              average: true,
              output: "byte",
              base: "binary",
              spaceSeparated: true,
            })} </td>
            <td>{numbro(1).format({
              mantissa: 2,
            })}</td>
            </tr> */}

              
              {/* <td> f01662887 </td>
              <td> {numbro(34359738368).format({
              mantissa: 2,
              average: true,
              output: "byte",
              base: "binary",
              spaceSeparated: true,
            })} </td>
            <td>{numbro(1)}</td>
            <td>reachable</td>
            <td>1251</td>
            <td>500000000</td> */}

          
            {/*  */}

          

            
            </Table>
          </ScrollArea>
        </Paper>
      </Center>
    </>
  );
}
