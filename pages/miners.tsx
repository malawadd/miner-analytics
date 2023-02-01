import Head from "next/head";
import { AppShell } from "@mantine/core";
import {
    HeaderNavbar,
  } from "../components";


export default function MinersPage() {
  return (
    <>
      <Head>
        <title>Storage Providers Analytics - MinerAnalytics</title>
        <meta name="description" content="Storage providers Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        header={<HeaderNavbar />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
      </AppShell>
    </>
  );
}
