import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {
  AppShell,
  createStyles,
  Container,
  Text,
  Button,
  Group,
  Image,
  Center,
  Notification,
  Box,
} from "@mantine/core";
import Link from "next/link";



const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <>
      <Head>
      <title>MinerAnalytics - Fvm storage providers Dashboard</title>
          <meta name="description" content="Fvm storage providers Dashboard" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container h="100hv" className={classes.inner}>
      <Center>
        <Box my={20}>
          <Link href="">
            <Image
              pb={2}
              src="/favicon.ico"
              alt="gigiblock-logo"
              width="100%"
              height="100%"
            />
          </Link>
        </Box>
      </Center>

      <h1 className={classes.title}>
        A{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "#cc518f", to: "#4122ff" }}
          inherit
        >
          Miners Visual Analytics
        </Text>{" "}
        <Center>dashboard site</Center>
      </h1>

      <Text className={classes.description} color="dimmed">
        Providing a visual analytics front-end with detailed data about the storage 
        providers on the Filecoin network.
      </Text>

      <Center>
        <Group className={classes.controls}>
          <Link
            href="/miners"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button radius="md" size="md" variant="default">
              Click to Continue
            </Button>
          </Link>
        </Group>
      </Center>
    </Container>
      
    </>
  )
}
