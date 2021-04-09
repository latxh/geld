<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
  } from "svelte-materialify";

  import { transactions } from "./stores";
  import TransactionsTable from "./TransactionsTable.svelte";

  let merchants = [];

  $: {
    let merchantsSet = new Set<string>();
    for (const transaction of $transactions) {
      merchantsSet.add(transaction.merchant);
    }
    merchants = Array.from(merchantsSet);
  }
</script>

<div class="container">
  <h4>Merchants ({merchants.length})</h4>
  <ExpansionPanels>
    {#each Array.from(merchants) as merchant}
      <ExpansionPanel>
        <span slot="header">{merchant}</span>
        <TransactionsTable
          transactions={$transactions.filter(
            (item) => item.merchant === merchant
          )}
        />
      </ExpansionPanel>
    {/each}
  </ExpansionPanels>
</div>

<style>
  h4 {
    margin-bottom: 15px;
  }
</style>
