import React from "react";
import {
  createStyles,
  Group,
  Paper,
  ThemeIcon,
  Space,
  Text,
  Avatar,
  SimpleGrid,
  Center,
  CopyButton,
  ActionIcon,
  Tooltip,
  Button,
  Notification,
} from "@mantine/core";

import { Box } from "@chakra-ui/react";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconCopy,
  IconCheck,
  IconExternalLink,
} from "@tabler/icons";
import { useQuery } from "react-query";
import LoaderComp from "../../../LoaderComp";
import { IconX } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  Paper: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function StatsOverview({ data, data2 }) {
  // const { data2, error, isFetching } = useQuery(["miners"], async () => {
  //   const res = await fetch(
  //     `https://api.filrep.io/api/miners`
  //   );
  //   console.log("data res1 ", res);
  //   return res.json();
  // });
  const totalMiners = data2?.pagination?.total;
  console.log("data of total miners ", data2);


  
  const { classes } = useStyles();

  const DiffIcon =
    data.market_data.market_cap_change_percentage_24h > 0
      ? IconArrowUpRight
      : IconArrowDownRight;

  const getEllipsisTxt = (str, n = 4) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  var numbro = require("numbro");

  function Copy({ data }) {
    return (
      <CopyButton
        value=""
        timeout={2000}
      >
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? "Copied" : "Copy"}
            withArrow
            position="right"
          >
            <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    );
  }
  

  return (
    <>
      <Center>
        <Paper
          w={1220}
          py={10}
          px={10}
          withBorder
          radius="md"
          mb={25}
          p="md"
          component="a"
          href="#"
          className={classes.Paper}
        >
          <SimpleGrid
            cols={5}
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            <Box>
              <Group spacing="xs">
                <Avatar
                  component="a"
                  radius="xl"
                  src={data.image.small}
                  target="_blank"
                  href="https://filecoin.io/"
                  alt="Filecoin-logo"
                />
                <Text fon fw={700}>
                  {data.name}
                </Text>
                <Text tt="uppercase" fon>
                  ({data.symbol})
                </Text>
              </Group>
              <Group spacing="xs">
                <Space h="4xs" />
                <Text fw={700}>
                  {numbro(data.market_data.current_price.usd).formatCurrency({
                    average: true,
                    mantissa: 4,
                    optionalMantissa: true,
                  })}
                </Text>

                <Group spacing="2xs">
                  <Text>
                    <Text
                      color={
                        numbro(
                          data.market_data
                            .price_change_percentage_24h_in_currency.usd
                        ).format({
                          thousandSeparated: true,
                          mantissa: 2,
                        }) > 0
                          ? "teal"
                          : "red"
                      }
                    >
                      {numbro(
                        data.market_data.price_change_percentage_24h_in_currency
                          .usd
                      ).format({
                        thousandSeparated: true,
                        mantissa: 2,
                      })}
                      %
                    </Text>
                  </Text>

                  <ThemeIcon
                    color="gray"
                    variant="subtle"
                    sx={(theme) => ({
                      color:
                        numbro(
                          data.market_data
                            .price_change_percentage_24h_in_currency.usd
                        ).format({
                          thousandSeparated: true,
                          mantissa: 2,
                        }) > 0
                          ? theme.colors.teal[6]
                          : theme.colors.red[6],
                    })}
                    size={38}
                  >
                    <DiffIcon size={28} stroke={1.5} />
                  </ThemeIcon>
                </Group>
              </Group>
            </Box>
            <Box>
              <Text c="dimmed" fw={500} tt="uppercase">
                Market Cap
              </Text>
              <Space h="md" />
              <Text fw={700}>
                {numbro(data.market_data.market_cap.usd).formatCurrency({
                  average: true,
                  mantissa: 2,
                  optionalMantissa: true,
                })}
              </Text>
            </Box>
            <Box>
              <Text c="dimmed" fw={500} tt="uppercase">
                Trading Volume (24h)
              </Text>
              <Space h="md" />
              <Text fw={700}>
                {numbro(data.market_data.total_volume.usd).formatCurrency({
                  average: true,
                  mantissa: 2,
                  optionalMantissa: true,
                })}
              </Text>
            </Box>
            <Box>
              <Text c="dimmed" fw={500} tt="uppercase">
                Circulating Supply
              </Text>
              <Space h="md" />
              <Text fw={700}>
                {numbro(data.market_data.circulating_supply).formatCurrency({
                  average: true,
                  mantissa: 2,
                  optionalMantissa: true,
                })}
              </Text>
            </Box>
            
            <Box>
              <Button
                radius="lg"
                component="a"
                href="https://filecoin.io/"
                variant="subtle"
                color="violet"
                compact
                rightIcon={<IconExternalLink size={14} />}
              >
                Visit {data.name}
              </Button>
              <Space h="md" />
              <Group spacing="xs">
                {/* <Text> Total miners {numbro(data2?.pagination?.total).formatCurrency({
                  average: true,
                  mantissa: 2,
                  optionalMantissa: true,
                })}</Text> */}
                <Text> Total miners 4823</Text>
                
              </Group>
            </Box>
          </SimpleGrid>
        </Paper>
      </Center>
    </>
  );
}
