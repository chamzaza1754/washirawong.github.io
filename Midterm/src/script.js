/*Script Carousel Best Sell*/
let slideIndex = 0; // ตัวแปรเก็บตำแหน่งของสไลด์ปัจจุบัน
const slides = document.querySelectorAll('.carousel-item'); // เลือกทุก .carousel-item และเก็บในตัวแปร slides
//console.log(slides)
const totalSlides = slides.length; // จำนวนทั้งหมดของ .carousel-item
//console.log(totalSlides)
const visibleSlides = 5; // จำนวนสินค้าที่ต้องการแสดงในแถวเดียว
const container = document.querySelector('.carousel-inner'); // เลือก .carousel-inner และเก็บในตัวแปร container
//console.log(container)
const itemWidth = container.clientWidth / visibleSlides; // คำนวณความกว้างของแต่ละรายการสินค้าใน carousel
//console.log(itemWidth)
// ฟังก์ชันสำหรับเลื่อนสไลด์
function moveSlide(n) {
    slideIndex += n; // ปรับค่า slideIndex ตามทิศทางที่ต้องการเลื่อน
    if (slideIndex > totalSlides - visibleSlides) { // ถ้า slideIndex เกินจำนวนสไลด์ที่เหลือให้แสดง
        slideIndex = 0; // รีเซ็ต slideIndex กลับไปที่ 0
    } else if (slideIndex < 0) { // ถ้า slideIndex น้อยกว่า 0
        slideIndex = totalSlides - visibleSlides; // ตั้งค่า slideIndex เป็นจำนวนสไลด์ทั้งหมดลบด้วยจำนวนที่ต้องการแสดง
    }
    updateCarousel(); // เรียกฟังก์ชัน updateCarousel เพื่ออัปเดตการแสดงผลของ carousel
}

// ฟังก์ชันสำหรับอัปเดตการแสดงผลของ carousel
function updateCarousel() {
    container.style.transform = 'translateX(' + (-slideIndex * itemWidth) + 'px)'; // เลื่อน carousel ตาม slideIndex
}

// อัปเดตขนาดของ carousel เมื่อมีการปรับขนาดหน้าต่าง
window.addEventListener('resize', () => {
    updateCarousel(); // เรียกฟังก์ชัน updateCarousel เมื่อหน้าต่างถูกปรับขนาด
});

updateCarousel(); // เรียกฟังก์ชัน updateCarousel เพื่อแสดง carousel ครั้งแรก

///////////////////////////////////////////////////////////////////////////
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
    window.location.href = "product/";
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
