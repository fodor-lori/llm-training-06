<script lang="ts">
	import Cart from '$lib/components/app/Cart.svelte';
	import ProductCard from '$lib/components/app/ProductCard.svelte';
	import ProductDeleteDialog from '$lib/components/app/ProductDeleteDialog.svelte';
	import ProductDetailsDialog from '$lib/components/app/ProductDetailsDialog.svelte';
	import ProductFormDialog from '$lib/components/app/ProductFormDialog.svelte';
	import { addToCart, getCart, getProducts, removeFromCart } from '$lib/functions/data.remote';
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';

	const query = getProducts();
	const cartQuery = getCart();

	let isProductDialogOpen: boolean = $state(false);
	let isDeleteDialogOpen: boolean = $state(false);
	let isDetailsDialogOpen: boolean = $state(false);
	let selectedProduct: Product | null = $state(null);
	let searchQuery: string = $state('');

	let filteredProducts = $derived(
		(query.current ?? []).filter((product: Product) => {
			if (!searchQuery.trim()) return true;
			const q = searchQuery.toLowerCase();
			return (
				product.name.toLowerCase().includes(q) ||
				(product.description && product.description.toLowerCase().includes(q))
			);
		})
	);

	function openProductDialog(product: Product | null = null) {
		selectedProduct = product;
		isProductDialogOpen = true;
	}

	function openDeleteDialog(product: Product) {
		selectedProduct = product;
		isDeleteDialogOpen = true;
	}

	function openDetailsDialog(product: Product) {
		selectedProduct = product;
		isDetailsDialogOpen = true;
	}

	async function handleAddToCart(product: Product) {
		await addToCart(product.id);
	}

	async function handleRemoveFromCart(productId: number) {
		await removeFromCart(productId);
	}
</script>

{#if query.error}
	<p>Error loading products: {query.error.message}</p>
{:else if query.loading}
	<p>Loading products...</p>
{:else}
	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-[160px] py-[21px]">
		<h1 class="font-inter text-[13.2px] leading-[1.59em] text-[#0A0A0A]">Product Management</h1>
		<div class="mt-[28px] mb-[21px] flex items-center gap-4">
			<div class="relative">
				<Search class="absolute left-[12px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#717182]" />
				<input
					type="text"
					placeholder="Search products..."
					class="font-inter h-[31.5px] w-[392px] rounded-[7px] bg-[#F3F3F5] pl-[35px] pr-3 text-[10.7px] leading-[1.37em] text-[#0A0A0A] placeholder:text-[#0A0A0A] focus:outline-none"
					bind:value={searchQuery}
				/>
			</div>
			<button
				class="font-inter ml-auto inline-flex h-[31.5px] items-center gap-2 rounded-[7px] bg-[#030213] px-4 text-[11.3px] font-medium leading-[1.55em] text-white"
				onclick={() => openProductDialog()}
			>
				<Plus class="h-[8px] w-[8px]" strokeWidth={3} />
				Add Product
			</button>
		</div>
		<div class="grid grid-cols-1 gap-[21px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredProducts as product (product.id)}
				<ProductCard
					{product}
					onViewClick={() => openDetailsDialog(product)}
					onEditClick={() => openProductDialog(product)}
					onDeleteClick={() => openDeleteDialog(product)}
					onAddToCart={() => handleAddToCart(product)}
				/>
			{/each}
		</div>
		<div class="sticky bottom-4 z-50 mt-auto w-fit pt-[21px]">
			<Cart items={cartQuery.current ?? []} onRemove={handleRemoveFromCart} />
		</div>
	</div>
{/if}

<ProductFormDialog
	open={isProductDialogOpen}
	onOpenChange={(open: boolean) => (isProductDialogOpen = open)}
	product={selectedProduct}
/>

<ProductDeleteDialog
	open={isDeleteDialogOpen}
	onOpenChange={(open: boolean) => (isDeleteDialogOpen = open)}
	product={selectedProduct}
/>

<ProductDetailsDialog
	open={isDetailsDialogOpen}
	onOpenChange={(open: boolean) => (isDetailsDialogOpen = open)}
	product={selectedProduct}
/>
