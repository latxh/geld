<script lang="ts">
  import {
    AppBar,
    Button,
    Icon,
    Menu,
    ListItem,
    MaterialApp,
    List,
    ListItemGroup,
    NavigationDrawer,
    Snackbar,
  } from "svelte-materialify";
  import {
    mdiFolder,
    mdiAccountMultiple,
    mdiViewDashboard,
    mdiBrightness7,
    mdiBrightness4,
    mdiReceipt,
  } from "@mdi/js";
  import {
    darkTheme,
    infoMessages,
    showInfoMessage,
    transactions,
  } from "./stores";
  import type { Transaction } from "./types";
  import Logo from "./RecordbookLogo.svg";
  import Upload from "./Upload.svelte";
  import Router from "svelte-spa-router";
  import Dashboard from "./Dashboard.svelte";
  import Merchants from "./Merchants.svelte";
  import Categories from "./Categories.svelte";
  import Transactions from "./Transactions.svelte";
  import { push, pop, replace, location } from "svelte-spa-router";
  import Papa from "papaparse";

  let uploadElm: HTMLInputElement;

  const routes = {
    "/": Dashboard,
    "/merchants": Merchants,
    "/categories": Categories,
    "/transactions": Transactions,
    "*": Dashboard,
  };

  const uploadFile = (file: File) => {
    Papa.parse(file, {
      complete: function (results) {
        console.log(results);
        // if (
        //   results.data[0] !==
        //   [
        //     "Transaction Date",
        //     "Posted Date",
        //     "Card No.",
        //     "Description",
        //     "Category",
        //     "Debit",
        //     "Credit",
        //   ]
        // )
        //   return;
        let cleaned: Transaction[] = [];
        for (let i = 1; i < results.data.length; i++) {
          const row = results.data[i];

          if (row.length != 7) continue;

          cleaned.push({
            date: new Date(row[0]),
            postedDate: new Date(row[1]),
            cardNumber: row[2],
            description: row[3],
            category: row[4],
            amount: (row[5] ? +row[5] : 0) - (row[6] ? +row[6] : 0),
          });
        }

        $transactions.push(...cleaned);
        $transactions = $transactions;

        showInfoMessage(`Loaded ${file.name}`);
      },
    });
  };

  let infoTimeout = 0;

  const loadNextMessage = () => {
    if ($infoMessages.length > 0 && infoTimeout === 0) {
      infoTimeout = setTimeout(() => {
        infoTimeout = 0;
        $infoMessages.splice(0, 1);
        $infoMessages = $infoMessages;
      }, 3000) as any;
    }
  };

  $: {
    $infoMessages;
    loadNextMessage();
  }
</script>

<MaterialApp theme={$darkTheme ? "dark" : "light"}>
  <input
    bind:this={uploadElm}
    on:change={(evt) => {
      if (uploadElm.files.length > 0) {
        uploadFile(uploadElm.files[0]);
        uploadElm.value = null;
      }
    }}
    type="file"
    accept=".csv"
    style="display:none"
  />
  <div class="container">
    <header>
      <AppBar flat dense>
        <Logo class={$darkTheme ? "dark" : "light"} />
        <div style="flex-grow:1" />
        <div class="top-nav-bar">
          <Button
            text
            class="button"
            on:click={() => {
              uploadElm.click();
            }}>Upload</Button
          >
          <!-- <Button
            icon
            on:click={() => {
              $darkTheme = !$darkTheme;
            }}
          >
            <Icon path={$darkTheme ? mdiBrightness7 : mdiBrightness4} />
          </Button> -->
        </div>
      </AppBar>
    </header>

    <nav>
      <NavigationDrawer width="100%">
        <List nav dense>
          <ListItemGroup value={$location}>
            <ListItem value="/" on:click={() => push("/")}>
              <span slot="prepend">
                <Icon path={mdiViewDashboard} />
              </span>
              Dashboard
            </ListItem>
            <ListItem value="/merchants" on:click={() => push("/merchants")}>
              <span slot="prepend">
                <Icon path={mdiAccountMultiple} />
              </span>
              Merchants
            </ListItem>
            <ListItem
              value="/transactions"
              on:click={() => push("/transactions")}
            >
              <span slot="prepend">
                <Icon path={mdiReceipt} />
              </span>
              Transactions
            </ListItem>
            <ListItem value="/categories" on:click={() => push("/categories")}>
              <span slot="prepend">
                <Icon path={mdiFolder} />
              </span>
              Categories
            </ListItem>
          </ListItemGroup>
        </List>
      </NavigationDrawer>
    </nav>

    <main>
      <Router {routes} />
    </main>

    <aside />

    <footer />
  </div>
  <Snackbar
    class="justify-space-between"
    active={$infoMessages.length > 0}
    center
    bottom
  >
    {$infoMessages[0]}
    <Button
      text
      on:click={() => {
        clearTimeout(infoTimeout);
        $infoMessages.splice(0, 1);
        $infoMessages = $infoMessages;
      }}
    >
      Dismiss
    </Button>
  </Snackbar>
</MaterialApp>

<style>
  :global(svg.light .a) {
    stroke: #000000de;
  }

  :global(svg.light) {
    color: #000000de;
  }

  :global(svg.dark .a) {
    stroke: #fff;
  }

  .top-nav-bar {
    padding: 0 10px;
  }

  .container {
    display: grid;

    grid-template-areas:
      "header header header"
      "nav content side"
      "footer footer footer";

    grid-template-columns: 200px 1fr 0;
    grid-template-rows: auto 1fr auto;

    height: 100vh;
  }

  header {
    grid-area: header;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: content;
    overflow-y: auto;
    padding: 10px;
  }

  aside {
    grid-area: side;
  }

  footer {
    grid-area: footer;
  }

  @media (max-width: 768px) {
    .container {
      grid-template-areas:
        "header"
        "nav"
        "content"
        "side"
        "footer";

      grid-template-columns: 1fr;
      grid-template-rows:
        auto /* Header */
        minmax(75px, auto) /* Nav */
        1fr /* Content */
        minmax(75px, auto) /* Sidebar */
        auto; /* Footer */
    }

    nav,
    aside {
      margin: 0;
      width: 100%;
    }
  }
</style>
