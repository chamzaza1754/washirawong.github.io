function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    let cartHtml = '';
    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        cartHtml += `
        <div class="grid grid-cols-12 md:grid md:grid-cols-12 gap-8 even:bg__cream odd:bg-yellow-100"">
                            <div class="col-span-4 md:col-span-3 my-auto">
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="col-span-4 md:col-span-6 my-auto">
                                <p class="prompt-light">${item.name}</p>
                                <p class="prompt-light mt-4">จำนวน: ${item.quantity}</p>
                            </div>
                            <div class="col-span-4 md:col-span-3 my-auto">
                                <p class="prompt-light font-medium">฿${item.price}</p>
                            </div>
                        </div>`;
    });

    document.getElementById('cartItems').innerHTML = cartHtml;
    document.getElementById('totalPrice').innerText = `฿${totalPrice}`;


}

function hideInput() {
    const inputcard = document.getElementById('input_card').classList.add('hidden');
}

function showCreditcard() {
    const paypal = document.getElementById('paypal')
    const card = document.getElementById('card')

    const inputcard = document.getElementById('input_card')

    if (card.checked) {
        inputcard.classList.remove('hidden');
    }
    else if (paypal.checked) {
        inputcard.classList.add('hidden');
    }
}

function paymentSuccess() {
    window.location.href = "../success";
}

hideInput()
displayCart();