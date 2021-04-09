<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
  } from "svelte-materialify";

  import { transactions } from "./stores";
  import TransactionsTable from "./TransactionsTable.svelte";

  let categories:string[] = [];

  $: {
    let categoriesSet = new Set<string>();
    for (const transaction of $transactions) {
      categoriesSet.add(transaction.category);
    }
    categories = Array.from(categoriesSet);
  }
</script>

<div class="container">
  <h4>Categories ({categories.length})</h4>
  <ExpansionPanels>
    {#each Array.from(categories) as category}
      <ExpansionPanel>
        <span slot="header">{category}</span>
        <TransactionsTable
          transactions={$transactions.filter(
            (item) => item.category === category
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
