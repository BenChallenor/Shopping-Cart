'use strict';
// shows more errors in the console

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
      price: productDOM.querySelector('.product__price').innerText
    }
    // creates product object
    console.table(product);
  });
});
