document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    // Dữ liệu mẫu cho các sản phẩm động
                                                                /*1. Văn học trong nước
                                                                2. Văn học nước ngoài
                                                                3. Truyện tranh
                                                                4. Sách giáo khoa*/
    const products = [
        { imgSrc: "/IMG/product1.jpg",name: "Những người hàng xóm", price: "169000", category: "1" },
        { imgSrc: "/IMG/product2.jpg", name: "Product 2", price: "120000", category: "2" },
        { imgSrc: "/IMG/product3.jpg", name: "Product 3", price: "500000", category: "3" },
        { imgSrc: "/IMG/product1.jpg", name: "Những người hàng xóm", price: "50000", category: "4" },
        { imgSrc: "/IMG/product1.jpg",name: "Những người hàng xóm", price: "700000", category: "1" },
        { imgSrc: "/IMG/product2.jpg", name: "Product 2", price: "120000", category: "2" },
        { imgSrc: "/IMG/product3.jpg", name: "Product 3", price: "15000", category: "3" },
        { imgSrc: "/IMG/product1.jpg", name: "Những người hàng xóm", price: "250000", category: "4" },
        { imgSrc: "/IMG/product3.jpg", name: "Product 3", price: "150000", category: "3" },
        { imgSrc: "/IMG/product1.jpg", name: "Những người hàng xóm", price: "430000", category: "1" },
        
        // Thêm "category" cho các sản phẩm
    ];

    // Hàm định dạng giá tiền
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(parseInt(price.replace(',', '')));
    }

    function createProductItem(product) {
        const productItem = document.createElement("div");
        productItem.classList.add("slider-product-one-content-item", "dynamic-product");
    
        const productLink = document.createElement("a");
    
        // Set the href attribute based on the product's category
        switch (product.category) {
            case "1":
                productLink.href = "product.html";
                break;
            case "2":
                productLink.href = "product2.html";
                break;
            case "3":
                productLink.href = "product3.html";
                break;
            case "4":
                productLink.href = "product4.html";
                break;
            default:
                // Set a default page if category is not specified
                productLink.href = "default_product.html";
                break;
        }
    
        // Add a click event listener to the product link
        productLink.addEventListener("click", function () {
            // Navigate to the specified page when the product is clicked
            window.location.href = productLink.href;
        });
    
        const productImage = document.createElement("img");
        productImage.src = product.imgSrc;
        productImage.alt = product.name;
        productLink.appendChild(productImage);
    
        const productText = document.createElement("div");
        productText.classList.add("slider-product-one-content-item-text");
    
        const text1 = document.createElement("div");
        text1.classList.add("slider-text1");
        const text1Link = document.createElement("a");
        text1Link.href = "#";
        text1Link.innerHTML = `<p>${product.name}</p>`;
        text1.appendChild(text1Link);
    
        const priceElement = document.createElement("li");
        priceElement.innerHTML = `${formatPrice(product.price)}<sup><u>đ</u></sup>`;
    
        productText.appendChild(text1);
        productText.appendChild(priceElement);
    
        productLink.appendChild(productText);
        productItem.appendChild(productLink);
    
        return productItem;
    }
    


    function filterProducts(categoryFilter, priceFilter) {
        const filteredProducts = products.filter(product => {
            const categoryMatch = categoryFilter === "0" || product.category === categoryFilter;
            let priceMatch = true;
    
            switch (priceFilter) {
                case "1":
                    priceMatch = parseInt(product.price.replace(',', '')) <= 150000;
                    break;
                case "2":
                    priceMatch = parseInt(product.price.replace(',', '')) > 150000 && parseInt(product.price.replace(',', '')) <= 300000;
                    break;
                case "3":
                    priceMatch = parseInt(product.price.replace(',', '')) > 300000 && parseInt(product.price.replace(',', '')) <= 500000;
                    break;
                case "4":
                    priceMatch = parseInt(product.price.replace(',', '')) > 500000;
                    break;
            }
    
            return categoryMatch && priceMatch;
        });
    

    
        // Kiểm tra nếu không có sản phẩm phù hợp
        if (filteredProducts.length === 0) {
            // Hiển thị thông báo "Không có sản phẩm cần tìm"
            displayNoResultsMessage();
        } else {
            // Hiển thị lại sản phẩm sau khi lọc và sắp xếp
            displayProducts(filteredProducts);
        }
    }
    
    function displayNoResultsMessage() {
        const productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = '<p class="no-results-message">Không có sản phẩm cần tìm.</p>';
    }
    
    // CSS để tùy chỉnh thông báo "Không có sản phẩm cần tìm"
    const styles = `
      .no-results-message {
        text-align: center;
        font-size: larger;
        font-weight: bold;
        color: brown;
        heght: 10px
        line-height: 10px
      }
    `;
    
    // Tạo một phần tử style để chèn CSS vào trang
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    

    
    function handleSortOption(sortOption) {
        switch (sortOption) {
            case "1":
                // Sắp xếp giá thấp đến cao
                products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "2":
                // Sắp xếp giá cao đến thấp
                products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
           
            default:
                break;
        }
    
        // Hiển thị lại sản phẩm sau khi sắp xếp
        displayProducts(products);
    }
    
    

    function displayProducts(products) {
        const productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = ""; // Xóa sản phẩm hiện tại

        products.forEach(product => {
            const productItem = createProductItem(product);
            productContainer.appendChild(productItem);
        });
    }

    const categoryFilterSelect = document.getElementById("categorySelect1");
    const priceFilterSelect = document.getElementById("priceFilter");

    categoryFilterSelect.addEventListener("change", function () {
        console.log("Category filter changed");
        const selectedCategory = categoryFilterSelect.value;
        const selectedPrice = priceFilterSelect.value;
        filterProducts(selectedCategory, selectedPrice);
    });

    priceFilterSelect.addEventListener("change", function () {
        console.log("Price filter changed");
        const selectedCategory = categoryFilterSelect.value;
        const selectedPrice = priceFilterSelect.value;
        filterProducts(selectedCategory, selectedPrice);
    });

    const sortOptionSelect = document.getElementById("sortOption");

sortOptionSelect.addEventListener("change", function () {
    const selectedSortOption = sortOptionSelect.value;
    handleSortOption(selectedSortOption);
});


    // Hiển thị tất cả sản phẩm khi trang web được tải lần đầu
    displayProducts(products);

   
});
