<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
  } from "svelte-materialify";

  import { darkTheme } from "./stores";
</script>

<div class="container">
  <h3>Categories</h3>
  <ExpansionPanels accordion flat>
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
    <ExpansionPanel>
      <span slot="header">Item</span>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
      obcaecati molestiae quas mollitia error modi atque aliquam esse.
    </ExpansionPanel>
  </ExpansionPanels>
</div>
