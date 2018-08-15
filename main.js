'use strict';
// shows more errors in the console
let cart = [];
// cart array to store products
const cartDom = document.querySelector('.cart');
// selects cart class
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
// selects all the add to cart buttons

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
      cart.push(product);
      // pushes products to cart array
      addToCartButtonDOM.innerText = 'In Cart';
      // changes add to cart text to in cart
      // console.log(cart);

      // increasing item quantity
      const cartItemsDom = cartDom.querySelectorAll(".cart__item");
      cartItemsDom.forEach(cartItemDom => {
        if (cartItemDom.querySelector('.cart__item__name').innerText === product.name) {
          cartItemDom.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                // cartItem.quantity++;
                cartItemDom.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
                // ++ added to beginning otherwise the value displays first
              }
            });
          });

          // decreasing item quantity
          cartItemDom.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                  // cartItem.quantity++;
                  cartItemDom.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                  // ++ added to beginning otherwise the value displays first
                } else {
                  cartItemDom.remove();
                  cart = cart.filter(cartItem => cartItem.name !== product.name);
                  // removes item form the cart. Creates new array
                  addToCartButtonDOM.innerText = 'Add To Cart';
                  // changes button back to add to cart
                }
              }
            });
          });

          // delete item from cart
          cartItemDom.querySelector('[data-action="DELETE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                cartItemDom.remove();
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                // removes item form the cart. Creates new array
                addToCartButtonDOM.innerText = 'Add To Cart';
                // changes button back to add to cart
              }
            });
          });

        }
      });
    }
  });
});
