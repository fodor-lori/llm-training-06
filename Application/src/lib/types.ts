type Product = {
	id: number;
	name: string;
	price: number;
	description: string | null;
	stock: number;
};

type CartItem = {
	id: number;
	product_id: number;
	quantity: number;
	product: Product;
};
