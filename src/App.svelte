<script lang="ts">
  import {
    AppBar,
    Button,
    Icon,
    Menu,
    ListItem,
    MaterialApp,
  } from "svelte-materialify";
  import { darkTheme } from "./stores";
  import Logo from "./RecordbookLogo.svg";
  import Upload from "./Upload.svelte";
  import Index from "./mainpage.svelte";
</script>

<MaterialApp theme={$darkTheme ? "dark" : "light"}>
  <AppBar>
    <Logo class="logo" />
    <div style="flex-grow:1" />
    <div class="top-nav-bar">
      <Button>Upload</Button>
      <Button>Categories</Button>
      <Button>Visual</Button>
    </div>
  </AppBar>
  {#if 5 > 4}<!--change this to display either component-->
    <Index />
  {:else}
    <Upload />
  {/if}
</MaterialApp>
