<script lang="ts">
	import Trash from '@lucide/svelte/icons/trash';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Eye from '@lucide/svelte/icons/eye';
	import Plus from '@lucide/svelte/icons/plus';

	type Props = {
		product: Product;
		onViewClick: (product: Product) => void;
		onEditClick: (product: Product) => void;
		onDeleteClick: (product: Product) => void;
		onAddToCart: (product: Product) => void;
	};
	let { product, onViewClick, onEditClick, onDeleteClick, onAddToCart }: Props = $props();
</script>

<div class="flex flex-col rounded-[13px] border border-black/10 bg-white">
	<div class="flex items-center justify-between px-[15px] pt-[15px]">
		<h4 class="font-inter text-[13.2px] leading-none text-[#0A0A0A]">{product.name}</h4>
		<button
			class="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#030213] disabled:opacity-40"
			onclick={() => onAddToCart(product)}
			disabled={product.stock <= 0}
			title="Add to cart"
			aria-label="Add to cart"
		>
			<Plus class="h-[12px] w-[12px] text-white" strokeWidth={3} />
		</button>
	</div>
	<div class="flex flex-1 flex-col gap-[14px] px-[15px] pt-[40px] pb-0">
		{#if product.description}
			<p class="font-inter line-clamp-3 text-[11.3px] leading-[1.55em] text-[#717182]">
				{product.description}
			</p>
		{/if}
		<div class="mt-auto flex items-center justify-between">
			<span class="font-inter text-[12.8px] font-medium leading-[1.64em] text-[#030213]">
				${product.price}
			</span>
			<span class="font-inter text-[11.3px] leading-[1.55em] text-[#717182]">
				Stock: {product.stock}
			</span>
		</div>
	</div>
	<div class="flex items-center gap-[7px] px-[14px] pt-[14px] pb-[14px]">
		<button
			class="font-inter inline-flex h-[28px] items-center gap-1.5 rounded-[7px] border border-black/10 bg-white px-3 text-[11.3px] font-medium leading-[1.55em] text-[#0A0A0A]"
			onclick={() => onViewClick(product)}
		>
			<Eye class="h-[14px] w-[14px]" />
			View
		</button>
		<button
			class="font-inter inline-flex h-[28px] items-center gap-1.5 rounded-[7px] border border-black/10 bg-white px-3 text-[11.3px] font-medium leading-[1.55em] text-[#0A0A0A]"
			onclick={() => onEditClick(product)}
		>
			<Pencil class="h-[14px] w-[14px]" />
			Edit
		</button>
		<button
			class="ml-auto inline-flex h-[28px] w-[31.5px] items-center justify-center rounded-[7px] bg-[#D4183D]"
			onclick={() => onDeleteClick(product)}
		>
			<Trash class="h-[14px] w-[14px] text-white" />
		</button>
	</div>
</div>
