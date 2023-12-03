 var autoId = 100;
        var soHangTrongGio = 0;
        var tongTien = 0;  

        window.onload = function () {
            var storedCart = JSON.parse(localStorage.getItem('cart'));
            if (storedCart && storedCart.length > 0) {
                for (var i = 0; i < storedCart.length; i++) {
                    addItemToCart(storedCart[i]);
                }
            }
        };

        function addItemToCart(item) {
            document.getElementById("empty").style.display = "none";
            soHangTrongGio++;
            tongTien += item.price;
            capNhatGia();

            var tableGioHang = document.getElementById("giohang");
            var newRow = tableGioHang.insertRow(tableGioHang.rows.length);
            newRow.id = autoId;

            var nameCell = newRow.insertCell(0);
            nameCell.innerHTML = item.name;

            var priceCell = newRow.insertCell(1);
            priceCell.innerHTML = '$' + item.price.toFixed(2);

            var actionCell = newRow.insertCell(2);
            actionCell.innerHTML =
                '<input type="button" onclick="removeItem(' +
                autoId +
                "); doiMau(" +
                (soHangTrongGio - 1) +
                ',false);" value="Xóa" />';
            autoId++;
        }

        function addItem(rowIndex) {
            var selectedRow = document.getElementById("mathang").rows[rowIndex];
            var itemName = selectedRow.cells[0].innerHTML;
            var itemPrice = Number(selectedRow.cells[1].innerHTML.substring(1));

            var cartItem = { name: itemName, price: itemPrice };
            addItemToCart(cartItem);

            var currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            currentCart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(currentCart));   
        }
        
        function doiMau(rowIndex, check) {
            if (check == true) {
                document.getElementById("mathang").rows[rowIndex].style.color =
                    "blue";
            } else {
                document.getElementById("mathang").rows[rowIndex].style.color =
                    "black";
            }
        }

        function capNhatGia() {
            document.getElementById("tien").innerHTML =
                "Tổng số tiền: $" + tongTien.toFixed(2);
        }

        function removeItem(id) {
            var rowIndex = document.getElementById(id).rowIndex;
            var donGia = document.getElementById(id).cells[1].innerHTML;
            donGia = Number(donGia.substring(1));
            tongTien = tongTien - donGia;
            capNhatGia();
            var selectedRow = document.getElementById("giohang").deleteRow(rowIndex);
            soHangTrongGio--;
            if (soHangTrongGio == 0) {
                document.getElementById("empty").style.display = "inline";
            }

            // Cập nhật local storage sau khi xóa một mục
            var currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            currentCart.splice(rowIndex - 1, 1);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }