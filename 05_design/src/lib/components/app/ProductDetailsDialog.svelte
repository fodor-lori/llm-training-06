<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/';

	type Props = {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		product: Product | null;
	};

	let { open, onOpenChange, product }: Props = $props();
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="sm:max-w-[444px] p-0 rounded-[9px] border border-black/10 shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)]">
		{#if product}
			<div class="px-[22px] pt-[21px]">
				<h2 class="font-inter text-[16px] font-semibold leading-[0.98em] text-black">
					Product Details
				</h2>
			</div>
			<div class="px-[22px] pt-[15px]">
				<h3 class="font-inter text-[16px] font-medium leading-[1.48em] text-black">
					{product.name}
				</h3>
			</div>
			<div class="px-[22px] pt-[9px]">
				<p class="font-inter text-[16px] leading-[1.5em] text-[#717182]">
					{product.description || 'No description available.'}
				</p>
			</div>
			<div class="mx-[22px] mt-[12px]">
				<div class="h-px bg-black/10"></div>
			</div>
			<div class="flex gap-[156px] px-[22px] pt-[14px]">
				<div>
					<p class="font-inter text-[12px] leading-[1.46em] text-[#717182]">Price:</p>
					<p class="font-inter text-[12px] font-medium leading-[1.46em] text-[#030213]">$ {product.price}</p>
				</div>
				<div>
					<p class="font-inter text-[12px] leading-[1.46em] text-[#717182]">Stock:</p>
					<p class="font-inter text-[12px] leading-[1.46em] text-black">{product.stock} units</p>
				</div>
			</div>
			<div class="px-[22px] pt-[14px] pb-[22px]">
				<p class="font-inter text-[12px] leading-[1.46em] text-[#717182]">Product ID:</p>
				<p class="font-inter text-[11px] leading-[1.27em] text-black">{product.id}</p>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
