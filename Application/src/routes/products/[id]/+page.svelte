<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getProduct } from '$lib/functions/data.remote';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	let product: Product | null = $state(null);
	let loading = $state(true);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			product = await getProduct(Number(page.params.id));
		} catch (e) {
			error = (e as Error).message;
		} finally {
			loading = false;
		}
	});
</script>

<div class="container mx-auto px-4 py-6">
	<Button variant="outline" href="/">
		<ArrowLeft />
		Back to Products
	</Button>

	{#if loading}
		<p class="mt-6">Loading product...</p>
	{:else if error}
		<p class="mt-6 text-destructive">Error: {error}</p>
	{:else if product}
		<Card.Root class="mt-6 max-w-2xl">
			<Card.Header>
				<Card.Title class="text-2xl">{product.name}</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div>
					<h3 class="text-sm font-medium text-muted-foreground">Description</h3>
					<p class="mt-1 whitespace-pre-line">{product.description || 'No description available.'}</p>
				</div>
				<div class="flex gap-8">
					<div>
						<h3 class="text-sm font-medium text-muted-foreground">Price</h3>
						<p class="mt-1 text-lg font-semibold">${product.price}</p>
					</div>
					<div>
						<h3 class="text-sm font-medium text-muted-foreground">Stock</h3>
						<p class="mt-1 text-lg font-semibold">{product.stock}</p>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
