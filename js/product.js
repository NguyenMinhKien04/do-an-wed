
    document.addEventListener('DOMContentLoaded', function() {
        // Get all elements with the class "buyNowButton"
        var buyNowButtons = document.getElementsByClassName('buyNowButton');

        // Attach a click event listener to each button
        Array.from(buyNowButtons).forEach(function(button) {
            button.addEventListener('click', function() {
                // Get product details from data attributes
                var productDetails = {
                    imageUrl: this.getAttribute('data-image'),
                    title: this.getAttribute('data-title'),
                    quantity: this.getAttribute('data-quantity')
                };

                // Create a query string from product details
                var queryString = '?image=' + encodeURIComponent(productDetails.imageUrl) +
                                  '&title=' + encodeURIComponent(productDetails.title) +
                                  '&quantity=' + encodeURIComponent(productDetails.quantity);

                // Redirect to cart.html with the query string
                window.location.href = 'cart.html' + queryString;
            });
        });
    });

