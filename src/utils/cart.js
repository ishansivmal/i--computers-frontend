import toast from "react-hot-toast";


export function getCartItems() {
  const cartString = localStorage.getItem("cart");

  if (cartString === null) {
    localStorage.setItem("cart", "[]");
    return [];
  }

  return JSON.parse(cartString);
}










export function addItemToCart(product, quantity) {
     // Clear the cart for testing
  const cart = getCartItems();

  // check if product already exists
  const index = cart.findIndex(
    (item) => item.productID === product.productID
  );

  if (index === -1) {
    // product not in cart → add new
    cart.push({
      productID: product.productID,
      name: product.pName,
      price: product.price,
      lebalPrice: product.lebalPrice,
    
      quantity: quantity,
      image: product.images[0],
    });
    toast.success(`${product.productID} Item added to cart`);    

  } else {
    // product already exists → increase quantity
    const newQuantity = cart[index].quantity + quantity;

    if (newQuantity <= 0) {
      // remove item if quantity is zero or less
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQuantity;
      toast.success(`${product.productID} quantity updated to ${newQuantity}`);    
    }
  }

  
  const cartString = JSON.stringify(cart);
  
  localStorage.setItem("cart", cartString);

}






export function emptyCart() {
  localStorage.setItem("cart", "[]");
}

export function getTotalCartItems() {
    let totalItems = 0;

  const cart = getCartItems();

  cart
    .forEach((item) => {
        totalItems += item.quantity * item.price;
    });

    return totalItems;
  
}
