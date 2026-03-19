<script lang="ts">
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';
	import X from '@lucide/svelte/icons/x';

	type Props = {
		items: CartItem[];
		onRemove: (productId: number) => void;
	};
	let { items, onRemove }: Props = $props();

	let isOpen: boolean = $state(true);

	let totalItems = $derived(items.reduce((sum, item) => sum + item.quantity, 0));
	let totalPrice = $derived(
		items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
	);
</script>

<div>
	{#if !isOpen}
		<button
			class="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-[#030213] px-4 text-white shadow-lg"
			onclick={() => (isOpen = true)}
		>
			<ShoppingCart class="h-[16px] w-[16px]" />
			<span class="font-inter text-[12px] font-medium">{totalItems}</span>
		</button>
	{:else}
		<div
			class="w-[300px] rounded-[10px] border border-black/10 bg-white shadow-lg"
		>
			<div class="flex items-center justify-between px-[14px] pt-[14px] pb-[10px]">
				<div class="flex items-center gap-2">
					<ShoppingCart class="h-[14px] w-[14px] text-[#0A0A0A]" />
					<h3 class="font-inter text-[13.2px] font-medium text-[#0A0A0A]">
						Cart ({totalItems})
					</h3>
				</div>
				<button
					class="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full hover:bg-[#F3F3F5]"
					onclick={() => (isOpen = false)}
					aria-label="Close cart"
				>
					<X class="h-[12px] w-[12px] text-[#717182]" />
				</button>
			</div>

			{#if items.length === 0}
				<div class="px-[14px] pb-[14px]">
					<p class="font-inter text-[11.3px] text-[#717182]">Your cart is empty.</p>
				</div>
			{:else}
				<div class="max-h-[240px] overflow-y-auto">
					{#each items as item (item.id)}
						<div class="flex items-center justify-between border-t border-black/5 px-[14px] py-[10px]">
							<div class="flex-1 min-w-0">
								<p class="font-inter truncate text-[11.3px] font-medium text-[#0A0A0A]">
									{item.product.name}
								</p>
								<p class="font-inter text-[10.7px] text-[#717182]">
									{item.quantity} x ${item.product.price}
								</p>
							</div>
							<button
								class="ml-2 inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full hover:bg-red-50"
								onclick={() => onRemove(item.product_id)}
								title="Remove from cart"
							>
								<X class="h-[10px] w-[10px] text-[#D4183D]" />
							</button>
						</div>
					{/each}
				</div>
				<div class="border-t border-black/10 px-[14px] py-[10px]">
					<div class="flex items-center justify-between">
						<span class="font-inter text-[11.3px] font-medium text-[#0A0A0A]">Total:</span>
						<span class="font-inter text-[12.8px] font-medium text-[#030213]">
							${totalPrice.toFixed(2)}
						</span>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
