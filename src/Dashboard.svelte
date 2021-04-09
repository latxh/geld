<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
    Icon,
  } from "svelte-materialify";

  import { darkTheme } from "./stores";
</script>

<div class="container">
  <h4>Dashboard</h4>
  <ExpansionPanels>
    <ExpansionPanel>
      <span slot="header">Item</span>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
      obcaecati molestiae quas mollitia error modi atque aliquam esse.
    </ExpansionPanel>
    <ExpansionPanel>
      <span slot="header">Item</span>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
      obcaecati molestiae quas mollitia error modi atque aliquam esse.
    </ExpansionPanel>
    <ExpansionPanel disabled>
      <span slot="header">Disabled</span>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
      obcaecati molestiae quas mollitia error modi atque aliquam esse.
    </ExpansionPanel>
  </ExpansionPanels>
</div>

<style>
  h4 {
    margin-bottom: 15px;
  }
</style>
