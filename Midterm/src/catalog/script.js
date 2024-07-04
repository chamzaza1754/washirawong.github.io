/*Search Function*/

// กำหนด event listener สำหรับ input field เพื่อจับ event keyup
document.getElementById('search-input').addEventListener('keyup', handleSearch);

// ฟังก์ชันสำหรับจัดการ event การค้นหา
function handleSearch() {
    // เก็บค่าที่พิมพ์ใน input field และแปลงเป็นตัวอักษรตัวใหญ่ทั้งหมด
    const filter = this.value.toUpperCase();

    // เลือกทุก elements ที่มี class "product"
    const products = document.querySelectorAll('.product');
    console.log(products)
    // วนลูปผ่านแต่ละ element ที่มี class "product"
    products.forEach(product => filterProduct(product, filter));
}

// ฟังก์ชันสำหรับกรองสินค้า
function filterProduct(product, filter) {
    // เข้าถึงค่า attribute "data-name" และแปลงเป็นตัวอักษรตัวใหญ่ทั้งหมด
    const name = product.getAttribute('data-name').toUpperCase();
    // ตรวจสอบว่าค่าที่พิมพ์ใน input field ตรงกับค่าของ "data-name" หรือไม่
    if (name.includes(filter)) {
        // ถ้าตรง, แสดง element โดยตั้งค่า display เป็นค่าว่าง
        // ซึ่งหมายความว่าจะใช้ค่า display ตามค่าเริ่มต้นใน CSS
        product.style.display = '';
    } else {
        // ถ้าไม่ตรง, ซ่อน element โดยตั้งค่า display เป็น "none"
        product.style.display = 'none';
    }
}

function addToCart(name, price, image) {
    // ดึงข้อมูลตะกร้าสินค้าจาก Local Storage หรือสร้างอาร์เรย์ใหม่ถ้าไม่มี
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ค้นหาสินค้าที่มีอยู่ในตะกร้า
    const existingItemIndex = cart.findIndex(item => item.name === name);

    // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว ให้เพิ่มจำนวน
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        // ถ้าไม่มี ให้เพิ่มสินค้าชิ้นใหม่
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }

    // เก็บข้อมูลตะกร้าใน Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function sendToProduct(name, price, image) {
    // ลบข้อมูลสินค้าเก่าออกจาก Local Storage
    localStorage.removeItem('product');
    // ดึงข้อมูลตะกร้าสินค้าจาก Local Storage หรือสร้างอาร์เรย์ใหม่ถ้าไม่มี
    let product = JSON.parse(localStorage.getItem('product')) || [];

    // ค้นหาสินค้าที่มีอยู่ในตะกร้า
    const existingItemIndex = product.findIndex(item => item.name === name);

    // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว ให้เพิ่มจำนวน
    if (existingItemIndex !== -1) {
        product.pop({ name: name, price: price, image: image, quantity: 1 });
        product[existingItemIndex].quantity += 1;
    } else {
        // ถ้าไม่มี ให้เพิ่มสินค้าชิ้นใหม่
        product.push({ name: name, price: price, image: image, quantity: 1 });
    }

    // เก็บข้อมูลตะกร้าใน Local Storage
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = "../product";
}
