<script lang="ts">
    import { AppBar, Button, Icon, Menu, ListItem, MaterialApp } from "svelte-materialify";
    import { mdiMenu, mdiDotsVertical } from "@mdi/js";
    import { darkTheme } from "./stores";
    import Logo from "./RecordbookLogo.svg";
</script>

<MaterialApp theme={$darkTheme ? "dark" : "light"}>
    <AppBar>
        <div slot="icon">
            <Button fab depressed> 
                <Icon path={mdiMenu} />
            </Button>
        </div>
        <!-- <span slot="title"><img src="RecordbookLogo.svg" alt="" /></span> -->
        <Logo class="test" />
        <div style="flex-grow:1" />
        <Button outlined>Item</Button>
        <Menu right>
            <div slot="activator">
                <Button fab>
                    <Icon path={mdiDotsVertical} />
                </Button>
            </div>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
        </Menu>
    </AppBar>
    <Button
        on:click={() => {
            $darkTheme = !$darkTheme;
        }}
    >
        testt
    </Button>
</MaterialApp>

<style>
    :global(.test, path.a) {
        /* color: red; */
        /* border-color: blue; */
        /* stroke: green; */
    }
</style>
