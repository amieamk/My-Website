document.getElementById('viewAllBtn').addEventListener('click', function() {
    // Hide the carousel
    document.getElementById('popularCarousel').style.display = 'none';
    
    // Show the "View All Products" section
    document.getElementById('allProducts').style.display = 'flex';
  });

  document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartIcon = document.querySelector(".bi-cart");
    const addToCartButtons = document.querySelectorAll(".btn-primary");
    let cartNotification = document.createElement("span");
    cartNotification.classList.add("cart-notification");
    cartNotification.style.position = "absolute";
    cartNotification.style.top = "10px";
    cartNotification.style.right = "10px";
    cartNotification.style.backgroundColor = "red";
    cartNotification.style.color = "white";
    cartNotification.style.borderRadius = "50%";
    cartNotification.style.padding = "5px 10px";
    cartNotification.style.fontSize = "12px";
    cartNotification.style.display = "none";
    cartIcon.style.position = "relative";
    cartIcon.appendChild(cartNotification);
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let productName = productCard.querySelector("h5").textContent;
            let productImage = productCard.querySelector("img").src;
            let existingProduct = cart.find(p => p.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, image: productImage, quantity: 1 });
            }
            
            updateCartNotification();
        });
    });

    function updateCartNotification() {
        if (cart.length > 0) {
            let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartNotification.textContent = totalItems;
            cartNotification.style.display = "block";
        } else {
            cartNotification.style.display = "none";
        }
    }

    cartIcon.addEventListener("click", function () {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "checkout.html";
    });
});
