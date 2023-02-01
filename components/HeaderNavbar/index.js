import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Image,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    Avatar,
  } from "@mantine/core";
  import { MantineLogo } from "@mantine/ds";
  import { useDisclosure } from "@mantine/hooks";
  import { IconChevronDown } from "@tabler/icons";
  import Link from "next/link";
  import Logo from "../Logo";
  import ChainStatus from "../ChainStatus";

  const useStyles = createStyles((theme) => ({
    link: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan("sm")]: {
        height: 42,
        display: "flex",
        alignItems: "center",
        width: "100%",
      },
  
      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      }),
    },
  
    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      }),
  
      "&:active": theme.activeStyles,
    },
  
    dropdownFooter: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
  }));

  export default function HeaderNavbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
    const { classes, theme } = useStyles();
    return (
        <>
        <Box pb={0.5}>
        <Header height={75} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
            <Group
              sx={{ height: "100%" }}
              spacing={5}
              className={classes.hiddenMobile}
            >
              <Link
                href="/miners"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="subtle" color="white" radius="md" h={50}>
                  <Avatar
                    variant="outline"
                    radius="xl"
                    mx={3}
                    color="white"
                    alt="diffusion"
                    src="https://assets.coingecko.com/coins/images/12817/small/filecoin.png?1602753933"
                  />
                  miners
                </Button>
              </Link>
              
            </Group>
            <Logo />
            <Group className={classes.hiddenMobile}>
              <ChainStatus />
              <Logo />
            </Group>
            

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
            </Header>
        </Box>
        </>
    )

  }

