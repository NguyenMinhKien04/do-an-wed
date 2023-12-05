
document.addEventListener('DOMContentLoaded', function() {
    // Get query parameters from the URL
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    // Retrieve product details from query parameters
    var cartProduct = {
        imageUrl: urlParams.get('image') || '',
        title: urlParams.get('title') || '',
        quantity: urlParams.get('quantity') || ''
    };

    // Display the product details on the cart page
    document.getElementById('cartProductImage').src = cartProduct.imageUrl;
    document.getElementById('cartProductTitle').textContent = cartProduct.title;
    document.getElementById('cartProductQuantity').textContent = cartProduct.quantity;
});




var cart = {};

function updateQuantity(productId, action) {
var inputElement = document.getElementById('quantity-' + productId);
var currentValue = parseInt(inputElement.value);

if (action === 'increment') {
    currentValue += 1;
} else if (action === 'decrement' && currentValue > 1) {
    currentValue -= 1;
}

inputElement.value = currentValue;
saveCartToLocalStorage();
}

function confirmDelete(productId) {
var result = confirm("Bạn có chắc muốn xóa sản phẩm?");
if (result) {
    // Nếu người dùng chọn OK, thực hiện hành động xóa ở đây
    deleteProduct(productId);
} else {
    // Nếu người dùng chọn Cancel hoặc đóng hộp thoại, không làm gì cả
    console.log("Không xóa sản phẩm");
}
}

function deleteProduct(productId) {
var productElement = document.getElementById(productId);
productElement.remove();
console.log("Đã xóa sản phẩm có ID: " + productId);

// Cập nhật giỏ hàng và lưu vào localStorage sau khi xóa sản phẩm
delete cart[productId];
displayCart();
saveCartToLocalStorage();
}

// Hàm để lưu giỏ hàng vào localStorage
function saveCartToLocalStorage() {
localStorage.setItem('cart', JSON.stringify(cart));
}

// Hàm để đọc giỏ hàng từ localStorage khi trang tải lên
function loadCartFromLocalStorage() {
var storedCart = localStorage.getItem('cart');
if (storedCart) {
    cart = JSON.parse(storedCart);
    // Hiển thị giỏ hàng sau khi nạp từ localStorage (cần tùy chỉnh tùy vào cách bạn xử lý giỏ hàng)
    displayCart();
}
}

// Gọi hàm nạp giỏ hàng từ localStorage khi trang tải lên
loadCartFromLocalStorage();


// ... (các hàm và biến khác)

function calculateTotalPrice() {
var totalPrice = 0;

// Duyệt qua từng sản phẩm trong giỏ hàng
for (var productId in cart) {
    if (cart.hasOwnProperty(productId)) {
        // Giả sử mỗi sản phẩm có giá là 1000 đồng để tính tổng cộng giá
        var productPrice = 1000; // Đổi giá thành giá thực tế của sản phẩm
        totalPrice += cart[productId] * productPrice;
    }
}

// Tính giá thuế 10%
var tax = 0.1 * totalPrice;

// Tổng giá tiền kèm thuế
var totalWithTax = totalPrice + tax;

return { totalPrice: totalPrice, tax: tax, totalWithTax: totalWithTax };
}

function displayCart() {
console.log("Giỏ hàng: ", cart);

// Tính tổng giá tiền kèm thuế
var totalInfo = calculateTotalPrice();

// Hiển thị tổng giá tiền, thuế và tổng giá tiền kèm thuế
var totalElement = document.getElementById('total-price');
totalElement.textContent = `${totalInfo.totalPrice} đ`;

var taxElement = document.getElementById('tax');
taxElement.textContent = `${totalInfo.tax} đ`;

var totalWithTaxElement = document.getElementById('total-with-tax');
totalWithTaxElement.textContent = `${totalInfo.totalWithTax} đ`;
}
