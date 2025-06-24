// Mahsulotni ifodalovchi obyektlar
const products = [
	{ id: 1, name: "iPhone 12", price: 999, brand:"Apple", image: './Images/swappie-iphone-12-red-back.avif'},
	{ id: 2, name: "S21", price: 799, brand:"Samsung", image: "./Images/s21.webp"},
	{ id: 3, name: "Pixel 8", price: 699, brand:"Google", image: "./Images/pixel5.png"},
];
// Shopping Cart obyektini yaratish
const ShoppingCart = {
  cart: [],
  
  addProduct: function (productId, quantity = 1) {
	const product = products.find(element => element.id === productId)
	if(!product) return;

	const existingItem = this.cart.find(item => item.id === productId)
	if(existingItem){
		existingItem.quantity += quantity;
	} else{
		this.cart.push({...product, quantity})
	}

  },
  // Savatchadan mahsulotni o'chirish
  removeProduct: function (productId) {
	const item = this.cart.find(i => i.id === productId)
	if(!item) return

	if(item.quantity > 1) {
		item.quantity -=1
	} else{
		this.cart = this.cart.filter(item => item.id !== productId)
	}
  },
  // Savatchadagi barcha mahsulotlarni ko'rish
  viewCart: function () {
	const cartContainer = document.getElementById('cart-items');
	const totalEl = document.getElementById('cart-total');
	const emptyInfo = document.getElementById('empty-info');
	cartContainer.innerHTML = '';

	if(this.cart.length === 0) {
		totalEl.innerText = "0"
		emptyInfo.style.display = 'block'
		return 
	} else{
		emptyInfo.style.display = 'none'
	}

	this.cart.forEach(item =>{
		const div = document.createElement('div')
		div.className = 'd-flex align-items-center gap-3 bg-secondary p-2 mb-2 rounded width-50';

		// Product Image
		const img = document.createElement('img')
		img.src = item.image;
		img.alt = img.name;
		img.width = 50; 

		// Product Info
		const info = document.createElement('div')
		info.className = 'text-white'
		info.innerHTML = `<strong>${item.name}</strong><br>
		Quantity: ${item.quantity}</br> 
		Price: ${item.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</br>
		Total: ${(item.price * item.quantity.toFixed(2)).toLocaleString("en-US", {style:"currency", currency:"USD"})} `

		// Remove Button
		const removeBtn = document.createElement('button')
		removeBtn.className = 'btn btn-sm btn-danger'
		removeBtn.innerText = 'Remove'
		removeBtn.addEventListener('click', ()=>{
			this.removeProduct(item.id)
			this.viewCart()
		})

		div.appendChild(img)
		div.appendChild(info)
		div.appendChild(removeBtn)
		cartContainer.appendChild(div)

	})	
	totalEl.textContent = `$${this.getTotalPrice()}`
  },
  // Savatchaning umumiy summasini hisoblash
  getTotalPrice: function () {
	return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  // Savatchani tozalash
  clearCart: function () {
	this.cart = []
  },
};

function renderProducts() {
	const productList = document.getElementById('product-list');
	productList.textContent = ''


	products.forEach(product =>{
		const listItems = document.createElement('div')
		listItems.className = 'mb-4 col-12 col-md-4'
		
		listItems.innerHTML = `
			<div class='card h-100'>
				<img src="${product.image}" with='80' class='card-img-top' alt='${product.name}'>
				
				<div class='card-body bg-light'>
					<h5 class='card-title text-center'><strong>${product.name}</strong></h5>
					<div class='card-subtitle mb-2 text-muted'>${product.brand}</div>
					<div class='d-flex justify-content-between align-items-baseline'>
						<strong>Price: ${product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong>
						<button class='btn btn-primary add-to-cart' data-id='${product.id}'>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		`
		productList.appendChild(listItems)
	})


	const addToCart = document.querySelectorAll('.add-to-cart')
	addToCart.forEach((button, index) =>{
		button.addEventListener('click', () =>{
			const selectedProduct = products[index]
			ShoppingCart.addProduct(selectedProduct.id, 1)
			ShoppingCart.viewCart()
		})
	})
}
document.getElementById('clear-cart').addEventListener('click', ()=>{
	ShoppingCart.clearCart()
	ShoppingCart.viewCart()
})
renderProducts()











//// Mahsulotlarni savatchaga qo'shish
//ShoppingCart.addProduct(1, 2); // iPhone 12 qo'shiladi
//ShoppingCart.addProduct(2, 1); // Samsung Galaxy S21 qo'shiladi

//// Savatchadagi mahsulotlarni ko'rish
//ShoppingCart.viewCart();

//// Umumiy narxni ko'rish
//ShoppingCart.getTotalPrice();

//// Mahsulotni savatchadan o'chirish
//ShoppingCart.removeProduct(1); // iPhone 12 o'chiriladi

//// Savatchadagi mahsulotlarni ko'rish
//ShoppingCart.viewCart();

//// Savatchani tozalash
//ShoppingCart.clearCart();

//// Savatchadagi mahsulotlarni ko'rish (bo'sh savatcha)
//ShoppingCart.viewCart();

