function BacktoHome(){
    // ลบข้อมูลสินค้าเก่าออกจาก Local Storage
    localStorage.removeItem('product');
    localStorage.removeItem('cart');
    window.location.href = "../";
}