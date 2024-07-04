function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    let cartHtml = '';
    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        cartHtml += `
        <div class="">
            <div class="md:grid grid-cols-1 md:grid-cols-12 prompt-light align-middle justify-items-center">
                <!--Phone View img and delete btn-->
                <div class="flex flex-row justify-between px-4 md:hidden">
                    <img src="${item.image}" alt="${item.name}" width="120">
                    <div class="grid grid-cols-2 justify-end">
                        <div class="col-span-2">
                            <button class="btn_delphone p-1 rounded-full" onclick="removeItem(${index})">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>       
                </div>

                <!--PC View img and delete btn-->
                <div class="hidden md:grid md:col-span-2 my-auto">
                    <button class="btn_del p-3 rounded-full" onclick="removeItem(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>    
                <div class="hidden md:grid md:col-span-2">
                    <img src="${item.image}" alt="${item.name}" width="100">
                </div>

                <!--Phone View product name-->
                <div class="grid grid-cols-2 justify-between px-12 md:hidden my-auto ">
                    <p class="font-semibold">สินค้า: </p>
                    <p class="">${item.name}</p>
                </div>
                
                <!--PC View product name-->
                <div class="hidden md:grid md:col-span-2 my-auto mx-auto">
                    <p class="md:hidden font-semibold">ราคา: </p>
                    <p class="">${item.name}</p>
                </div>

                <!--PC and Phone View product price-->
                <div class="grid grid-cols-2 justify-between px-12 py-4 md:grid md:col-span-2 my-auto mx-auto">
                    <p class="md:hidden font-semibold">ราคา: </p>
                    ฿${item.price}
                </div>

                <!--PC and Phone View add remove button-->
                <div class="grid grid-cols-2 justify-between px-12 py-4 md:grid md:col-span-2 my-auto mx-auto">
                    <p class="md:hidden font-semibold">จำนวน: </p>
                    <div class="flex flex-row ">
                        <button onclick="removeFromCart(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>                              
                        </button>
                        <p class="px-4">${item.quantity}</p>
                        <button onclick="increaseQuantity(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>                                 
                        </button>
                    </div>
                </div>

                <!--PC and Phone View add Total price-->
                <div class="grid grid-cols-2 justify-between px-12 py-4 md:grid md:col-span-2 my-auto mx-auto">
                    <p class="md:hidden font-semibold">ยอดรวม: </p>
                    ฿${itemTotalPrice}
                </div>
            </div>
        </div>`;
    });

    document.getElementById('cartItems').innerHTML = cartHtml;
    document.getElementById('totalPrice').innerText = `฿${totalPrice}`;

    
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (index > -1) {
        cart[index].quantity -= 1; // ลบจำนวนสินค้าออก 1 ชิ้น

        if (cart[index].quantity === 0) { // ถ้าสินค้าเหลือ 0 ชิ้นให้เท่ากับ 1
            cart[index].quantity = 1; 
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // อัปเดตการแสดงผลของตะกร้า
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (index > -1) {
        cart[index].quantity += 1; // เพิ่มจำนวนสินค้า 1 ชิ้น
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // อัปเดตการแสดงผลของตะกร้า
}

// ฟังก์ชันลบรายการสินค้าออกจากตะกร้า
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)
    if (index > -1) {
        cart.splice(index, 1); // ลบสินค้าทั้งรายการจากตะกร้า
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // อัปเดตการแสดงผลของตะกร้า
}

function removeAllFromCart() {
    localStorage.removeItem('cart'); // ลบข้อมูลตะกร้าทั้งหมดใน Local Storage
    displayCart(); // อัปเดตการแสดงผลของตะกร้า
}

function sendToCheckout(name, price, image){
    // ลบข้อมูลสินค้าเก่าออกจาก Local Storage
    localStorage.removeItem('checkout');
    // ดึงข้อมูลตะกร้าสินค้าจาก Local Storage หรือสร้างอาร์เรย์ใหม่ถ้าไม่มี
    let checkout = JSON.parse(localStorage.getItem('checkout')) || [];

    // ค้นหาสินค้าที่มีอยู่ในตะกร้า
    const existingItemIndex = checkout.findIndex(item => item.name === name);

    // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว ให้เพิ่มจำนวน
    if (existingItemIndex !== -1) {
        checkout[existingItemIndex].quantity += 1;
    } else {
        // ถ้าไม่มี ให้เพิ่มสินค้าชิ้นใหม่
        checkout.push({ name: name, price: price, image: image, quantity: quantity,  totalPrice: totalPrice});
    }

    // เก็บข้อมูลตะกร้าใน Local Storage
    localStorage.setItem('checkout', JSON.stringify(checkout));
}
function changepage(){
    window.location.href = "../checkout";
}
displayCart();