export const reduce = (cart, fidel) => {
    let total = 0;
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].selectedQuantity;
    }
    total *= 0.9;
    return total.toFixed(2);
};