'use strict';
// shows more errors in the console

let cart = (JSON.parse(localStorage.getItem('cart')) || []);
// if theres an item in the local storage called 'cart' its value is assigned to a cart variable if not an empty array is assigned
const cartDom = document.querySelector('.cart');
// selects cart class
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
// selects all the add to cart buttons

console.log(JSON.parse(localStorage.getItem('cart')));
// JSON.parse turns JSON object in to an array
if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    insertItemToDOM(product)
    countCartTotal()
    // called when inserting to the DOM & when cart is saved to local storage
    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
      const productDOM = addToCartButtonDOM.parentNode;

      if (productDOM.querySelector('.product__name').innerText === product.name) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });
  });
}

// addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
    // takes 2 arguements, first the event and then the callback function
    const productDOM = addToCartButtonDOM.parentNode;
    // accesses the product element
    const product = {
      name: productDOM.querySelector('.product__name').innerText,
      // innerText gets name from HTML
      price: productDOM.querySelector('.product__price').innerText,
      quantity: 1
      // default quantity
    }
    // creates product object
    // console.table(product);

    const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
    // filter creates array of products already in cart
    // if (isInCart === false) {
    if (!isInCart) {
      // only adds products that are not in the cart
      insertItemToDOM(product)
      cart.push(product);
      // pushes products to cart array
      saveCart();
      // stores to local storage. Takes two arguments. cart = key to access the data, saves value JS object as a string -> JSON
      // can be seen in the console -> Application/Local storage
      handleActionButtons(addToCartButtonDOM, product);
    }
  });
});

function insertItemToDOM(product) {
  // need to pass in product object
  cartDom.insertAdjacentHTML('beforeend', `
    <div class="cart__item">
      <h3 class="cart__item__name">${product.name}</h3>
      <h3 class="cart__item__price">${product.price}</h3>
      <button class="btn btn--primary bt--small" data-action="DECREASE_ITEM">&minus;</button>
      <h3 class="cart__item__quantity">${product.quantity}</h3>
      <button class="btn btn--primary bt--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--primary bt--small" data-action="DELETE_ITEM">&times;</button>
      </div>
    `);
  // beforeend adds to the top of the cart
  // backticks create a template string
  // adds products to cart HTML

  addCartFooter();
}

function handleActionButtons(addToCartButtonDOM, product) {
  // need to pass in addToCartButtonDOM & product objects
  addToCartButtonDOM.innerText = 'In Cart';
  // changes add to cart text to in cart
  // console.log(cart);

  const cartItemsDom = cartDom.querySelectorAll(".cart__item");
  cartItemsDom.forEach(cartItemDom => {
    if (cartItemDom.querySelector('.cart__item__name').innerText === product.name) {

      // increasing item quantity
      cartItemDom.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDom));
      // calling increaseItem function as the callback

      // decreasing item quantity
      cartItemDom.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDom, addToCartButtonDOM));
      // calling decreaseItem function as the callback

      // delete item from cart
      cartItemDom.querySelector('[data-action="DELETE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDom, addToCartButtonDOM));
      // calling deleteItem function as the callback
    }
  });
}

function increaseItem(product, cartItemDom) {
  // need to pass in product, cartItemDom objects
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      // cartItem.quantity++;
      cartItemDom.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
      // ++ added to beginning otherwise the value displays first
      countCartTotal()
    }
  });
}

function decreaseItem(product, cartItemDom, addToCartButtonDOM) {
  // need to pass in product, cartItemDom, addToCartButtonDOM objects
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        // cartItem.quantity++;
        cartItemDom.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
        // ++ added to beginning otherwise the value displays first
        saveCart();
      } else {
        removeItem(product, cartItemDom, addToCartButtonDOM);
      }
    }
  });
}

function removeItem(product, cartItemDom, addToCartButtonDOM) {
  // need to pass in product, cartItemDom, addToCartButtonDOM
  cartItemDom.remove();
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  // removes item form the cart. Creates new array
  localStorage.setItem('cart', JSON.stringify(cart));
  // needs to be added whenever the state of the cart is changed
  addToCartButtonDOM.innerText = 'Add To Cart';
  // changes button back to add to cart
  if (cart.length < 1) {
    document.querySelector('.cart-footer').remove();
    // when the cart is empty the checkout buttons are removed
  }
}

function addCartFooter() {
  if (document.querySelector('.cart-footer') === null) {
    // only adds the clear & checkout buttons if there is no cart-footer
    cartDom.insertAdjacentHTML('afterend', `
  <div class="cart-footer">
  <button class="btn btn--primary" data-action="CLEAR_CART">Clear Cart</button>
  <button class="btn btn--primary" data-action="CHECKOUT">Checkout</button>
  </div>
  `)
  document.querySelector('[data-action = "CLEAR_CART"]').addEventListener('click', () => clearCart());
  document.querySelector('[data-action = "CHECKOUT"]').addEventListener('click', () => checkout());
  }
}

function clearCart() {
  cartDom.querySelectorAll('.cart__item').forEach(cartItemDom => {
    cartItemDom.remove();
  });
  cart = [];
  // emptys the cart array
  localStorage.removeItem('cart');
  // emptys items from local storage
  document.querySelector('.cart-footer').remove();
  addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.innerText = 'Add To Cart';
  });
}

function checkout() {

}

function countCartTotal(){
  let cartTotal = 0;
  cart.forEach(cartItem => {
    cartTotal += (cartItem.quantity * cartItem.price);
  });
  // document.querySelector('[data-action="CHECKOUT"]').innerText = 'Checkout $' + cartTotal;
  document.querySelector('[data-action="CHECKOUT"]').innerText = `Checkout $${cartTotal}`;
  // adds total price to checout button
  console.log(cartTotal);
}

function saveCart() {
  // saves the count to the local storage and calculates the total
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal();
};
