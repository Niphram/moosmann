
<script lang="ts">
    import { t, locale, localeKeys } from "./store";

    let name = "Moosmann"
</script>

<input bind:value={name}>

<h1>{$t("greeting", name)}</h1>

{#each localeKeys as key}
    <button on:click={() => locale.set(key)}>{key}</button>
{/each}