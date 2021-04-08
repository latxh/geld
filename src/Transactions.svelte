<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    Icon,
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
  } from "svelte-materialify";
  import { mdiArrowUp } from "@mdi/js";

  import { transactions } from "./stores";
  import TransactionsTable from "./TransactionsTable.svelte";
</script>

<h4>All Transactions ({$transactions.length})</h4>
<TransactionsTable transactions={$transactions} />

<style>
  h4 {
    margin-bottom: 15px;
  }
</style>
