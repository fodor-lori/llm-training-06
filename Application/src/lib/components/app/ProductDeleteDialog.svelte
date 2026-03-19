<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/';
	import { deleteProduct, getProducts } from '$lib/functions/data.remote';

	type Props = {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		product: Product | null;
	};

	let { open, onOpenChange, product }: Props = $props();

	async function onConfirm() {
		try {
			await deleteProduct(product!.id).updates(getProducts());
			onOpenChange(false);
		} catch (error) {
			console.error('Failed to delete product:', error);
		}
	}
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="sm:max-w-[444px] p-0 rounded-[9px] border border-black/10 shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)]">
		<div class="px-[22px] pt-[21px]">
			<h2 class="font-inter text-[16px] font-semibold leading-[0.98em] text-black">
				Delete Product
			</h2>
		</div>
		<div class="px-[22px] pt-[12px]">
			<p class="font-inter text-[14px] leading-[1.5em] text-[#717182]">
				Are you sure you want to delete <span class="font-medium text-black">{product?.name}</span>? This action cannot be undone.
			</p>
		</div>
		<div class="flex justify-end gap-[7px] px-[22px] pt-[20px] pb-[22px]">
			<button
				onclick={() => onOpenChange(false)}
				class="font-inter h-[32px] rounded-[7px] border border-black/10 bg-white px-[14px] text-[12px] font-medium text-black"
			>
				Cancel
			</button>
			<button
				onclick={onConfirm}
				class="font-inter h-[32px] rounded-[7px] bg-[#D4183D] px-[12px] text-[12px] font-medium text-white"
			>
				Delete Product
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
