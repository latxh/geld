<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
    Icon,
  } from "svelte-materialify";

  import { darkTheme } from "./stores";
  import Chart from "./chart.svelte";
</script>

<div class="container">
  <h4>Dashboard</h4>
  <Chart />
</div>

<style>
  h4 {
    margin-bottom: 15px;
  }
</style>
