function displayProduct() {
    const product = JSON.parse(localStorage.getItem('product')) || [];
    let totalPrice = 0;

    let cartHtml = '';
    product.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        cartHtml += `
        <div class="container bg-white rounded-xl">
        <div class="grid grid-cols-1 lg:grid lg:grid-cols-2 mt-4">
            <div class="">
                <div class="flex flex-row justify-center">
                    <img src="${item.image}" alt="" class="md:w-72 w-48">
                </div>
            </div>
            <div class="mt-8 prompt-light px-4">
                <p class="text-2xl lg:text-3xl lg:font-semibold">${item.name}</p>
                <p class="text-2xl lg:text-3xl pt-6 px-4">ราคา: ฿${itemTotalPrice}</p>
                <div class="flex flex-row pt-8">
                    <button onclick="removeFromCart(${index})" class="px-4">  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                        </svg>                              
                    </button>
                    <input type="text" class="px-4 rounded-xl text-center w-24 border-2 border__orange" value="${item.quantity}">
                    <button onclick="increaseQuantity(${index})" class="px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>                                 
                    </button>
                </div>
                <div class="flex flex-row mt-8">
                    <button onclick="addToCart('${item.name}', '${itemTotalPrice}', '${item.image}', '${item.quantity}')" class="bg__oranage w-full p-4 text-xl font-medium rounded-md hover:bg-amber-500">หยิบใส่ตะกล้า</button>
                </div>
            </div>
        </div>
    </div>`;
    });

    document.getElementById('productItems').innerHTML = cartHtml;
}

function addToCart(name, price, image,quantity) {
    // ดึงข้อมูลตะกร้าสินค้าจาก Local Storage หรือสร้างอาร์เรย์ใหม่ถ้าไม่มี
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ค้นหาสินค้าที่มีอยู่ในตะกร้า
    const existingItemIndex = cart.findIndex(item => item.name === name);

    // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว ให้เพิ่มจำนวน
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        // ถ้าไม่มี ให้เพิ่มสินค้าชิ้นใหม่
        cart.push({ name: name, price: price, image: image, quantity: quantity });
    }

    // เก็บข้อมูลตะกร้าใน Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function increaseQuantity(index) {
    let product = JSON.parse(localStorage.getItem('product')) || [];

    if (index > -1) {
        product[index].quantity += 1; // เพิ่มจำนวนสินค้า 1 ชิ้น
    }

    localStorage.setItem('product', JSON.stringify(product));
    displayProduct(); // อัปเดตการแสดงผลของตะกร้า
}

function removeFromCart(index) {
    let product = JSON.parse(localStorage.getItem('product')) || [];

    if (index > -1) {
        product[index].quantity -= 1; // ลบจำนวนสินค้าออก 1 ชิ้น

        if (product[index].quantity === 0) { // ถ้าสินค้าเหลือ 0 ชิ้นให้เท่ากับ 1
            product[index].quantity = 1; 
        }
    }

    localStorage.setItem('product', JSON.stringify(product));
    displayProduct(); // อัปเดตการแสดงผลของตะกร้า
}


displayProduct()