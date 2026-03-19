<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/';
	import { createProduct, updateProduct } from '$lib/functions/data.remote';

	type Props = {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		product: Product | null;
	};

	let { open, onOpenChange, product }: Props = $props();
	let formError: string | null = $state(null);

	function handleSubmit(event: SubmitEvent) {
		const form = event.currentTarget as HTMLFormElement;
		formError = null;

		if (!form.checkValidity()) {
			event.preventDefault();
			form.reportValidity();
			return;
		}

		const formData = new FormData(form);
		const price = parseFloat(formData.get('price') as string);
		if (isNaN(price)) {
			event.preventDefault();
			formError = 'Price must be a valid number.';
			return;
		}

		const stock = parseInt(formData.get('stock') as string, 10);
		if (isNaN(stock)) {
			event.preventDefault();
			formError = 'Stock must be a valid number.';
			return;
		}

		onOpenChange(false);
	}
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="sm:max-w-[388px] p-0 rounded-[9px] border border-black/10 shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)]">
		<form {...product ? updateProduct : createProduct} onsubmit={handleSubmit}>
			<div class="px-[22px] pt-[21px]">
				<h2 class="font-inter text-[16px] font-semibold leading-[0.98em] text-black">
					{product ? 'Edit Product' : 'Add New Product'}
				</h2>
			</div>
			<div class="px-[22px] pt-[16px] flex flex-col gap-[20px]">
				<div class="flex flex-col gap-[5px]">
					<label for="name" class="font-inter text-[12px] font-medium leading-[1.02em] text-black">
						Product Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						value={product?.name ?? ''}
						placeholder="Enter product name"
						required
						class="font-inter h-[32px] rounded-[7px] bg-[#F3F3F5] px-[11px] text-[12px] leading-[1.21em] text-black placeholder:text-[#999999] focus:outline-none"
					/>
				</div>
				<div class="flex flex-col gap-[5px]">
					<label for="description" class="font-inter text-[12px] font-medium leading-[1.02em] text-black">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						placeholder="Enter product description"
						class="font-inter h-[56px] resize-none rounded-[7px] bg-[#F3F3F5] px-[11px] py-[9px] text-[12px] leading-[1.21em] text-black placeholder:text-[#999999] focus:outline-none"
					>{product?.description ?? ''}</textarea>
				</div>
				<div class="flex gap-[14px]">
					<div class="flex flex-1 flex-col gap-[5px]">
						<label for="price" class="font-inter text-[12px] font-medium leading-[1.02em] text-black">
							Price ($)
						</label>
						<input
							id="price"
							name="price"
							type="number"
							step="0.01"
							value={product?.price ?? ''}
							placeholder="0.00"
							required
							class="font-inter h-[32px] rounded-[7px] bg-[#F3F3F5] px-[11px] text-[12px] leading-[1.21em] text-black placeholder:text-[#999999] focus:outline-none"
						/>
					</div>
					<div class="flex flex-1 flex-col gap-[5px]">
						<label for="stock" class="font-inter text-[12px] font-medium leading-[1.02em] text-black">
							Stock
						</label>
						<input
							id="stock"
							name="stock"
							type="number"
							value={product?.stock ?? 0}
							placeholder="0"
							required
							class="font-inter h-[32px] rounded-[7px] bg-[#F3F3F5] px-[11px] text-[12px] leading-[1.21em] text-black placeholder:text-[#999999] focus:outline-none"
						/>
					</div>
				</div>
				{#if formError}
					<p class="font-inter text-[12px] text-red-600">{formError}</p>
				{/if}
			</div>
			<input name="id" type="hidden" value={product?.id} />
			<div class="flex justify-end gap-[7px] px-[22px] pt-[20px] pb-[22px]">
				<button
					type="button"
					onclick={() => onOpenChange(false)}
					class="font-inter h-[32px] rounded-[7px] border border-black/10 bg-white px-[14px] text-[12px] font-medium text-black"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="font-inter h-[32px] rounded-[7px] bg-[#030213] px-[12px] text-[12px] font-medium text-white"
				>
					{product ? 'Update Product' : 'Add Product'}
				</button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
