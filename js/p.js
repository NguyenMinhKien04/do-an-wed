function dangKy() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value; 
    var fullNameUser = document.getElementById('fullname').value;


    if (!email || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
        return;
    }

    if (fullNameUser.length <3 ) {
        alert("Vui lòng nhập họ và tên lớn hơn 3 kí tự.");
        return;
    }

    if (password.length <6 ) {
        alert("Vui lòng nhập mật khẩu lớn hơn 6 kí tự.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }


  
    var accountStorage = JSON.parse(localStorage.getItem('registeredAccount')) || [];
  
    // Kiểm tra xem tài khoản đã tồn tại chưa
     for (var i = 0; i < accountStorage.length; i++) {
        if (accountStorage[i].email === email) {
            alert("Tài khoản đã tồn tại.");
            return;
        }
    }

    // Kiểm tra xem tài khoản có phải là admin không
    // isAdmin la kiểu boolean
    var isAdmin = (fullNameUser === "Nhật Phương" && email === "nhatphuong@gmail.com" && password === "123456");
    //khi goi ben login accounts[i].isAdmin phai goi truoc dau :   sau dau : là kiểu boolean
    // sau : là tất cả kiểu var
    // truoc : là kiểu gọi khi vd: accounts[i].email// hieu dai khai la khi goi nhu vay no se lay gia tri la email sau dau : de so sanh, giong nhu boolean
    // sau dau : là var và emailDangNhap cx la var nen suy ra var la gia tri,,,...
    var account = { fullNameUser: fullNameUser, email: email, password: password, isAdmin: isAdmin };

    accountStorage.push(account);

    localStorage.setItem('registeredAccount', JSON.stringify(accountStorage));

    window.location.href = "dangnhap.html";
}

// hien thi mat khau
function togglePassword(inputId) {
    var passwordField = document.getElementById(inputId);
    var showPasswordIcon = document.querySelector('#' + inputId + ' + .show-password i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showPasswordIcon.className = 'bx bx-hide';
    } else {
        passwordField.type = 'password';
        showPasswordIcon.className = 'bx bx-show';
    }
}

function dangNhap() {
    var emailDangNhap = document.getElementById('emailDangNhap').value;
    var passwordDangNhap = document.getElementById('passwordDangNhap').value;

    var accountString = localStorage.getItem('registeredAccount');

    // Kiểm tra xem cả tài khoản và mật khẩu đã được nhập chưa
    if (!emailDangNhap || !passwordDangNhap) {
        alert("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
        return;
    }

    if (!accountString) {
        alert("Chưa có tài khoản đăng ký.");
        return;
    }

    var accounts = JSON.parse(accountString);

    for (var i = 0; i < accounts.length; i++) {
          // truoc : là kiểu gọi khi vd: accounts[i].email// hieu dai khai la khi goi nhu vay no se lay gia tri la email sau dau : de so sanh, giong nhu boolean
          // sau dau : là var và emailDangNhap cx la var nen suy ra var la gia tri,,,...
        if (accounts[i].email === emailDangNhap && accounts[i].password === passwordDangNhap) { 

            localStorage.setItem('loggedInUser', JSON.stringify({
                fullName: accounts[i].fullNameUser,
                isAdmin: accounts[i].isAdmin
            }));

            //khi goi ben login accounts[i].isAdmin phai goi truoc dau : de kiem tra, sau dau : la kiểu boolean
            if (accounts[i].isAdmin) {
                alert("Đăng nhập với quyền admin!");
                window.location.href = "web.html";
            } else {
                alert("Đăng nhập thành công!");
                window.location.href = "web.html";
            }
            return;
        }
    }

    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
}

//so sanh admin va nguoi dung
document.addEventListener('DOMContentLoaded', function () {
    var loggedInUserString = localStorage.getItem('loggedInUser');

    if (loggedInUserString) {
        var loggedInUser = JSON.parse(loggedInUserString);
        var nameloginElement = document.getElementById('namelogin');
        var dropdownContentElement = document.querySelector('.dropdown-content');

        if (nameloginElement && dropdownContentElement) {
            nameloginElement.innerHTML =loggedInUser.fullName + '<i class="fa fa-caret-down"></i>';

            if (loggedInUser.isAdmin) {
                // Nếu là tài khoản admin, thêm chức năng quản lý cửa hàng
                dropdownContentElement.innerHTML = `
                    <a href="quanlycuahang.html" class="dropdown-item"><i class="np fa fa-cogs"></i>Quản lý cửa hàng</a>
                    <a href="donhang.html" class="dropdown-item"><i class="np fa fa-shopping-bag"></i>Đơn hàng đã mua</a>
                    <a href="#" onclick="dangXuat();" class="dropdown-item"><i class="np fa fa-sign-out"></i>Đăng xuất</a>
                `;
            } else {
                // Nếu không phải là tài khoản admin, chỉ thêm chức năng xem đơn hàng đã mua
                dropdownContentElement.innerHTML = `
                    <a href="donhang.html" class="dropdown-item"><i class="np fa fa-shopping-bag"></i>Đơn hàng đã mua</a>
                    <a href="#" onclick="dangXuat();" class="dropdown-item"><i class="np fa fa-sign-out"></i>Đăng xuất</a>
                `;
            }
        }
    }
});

// Hàm đăng xuất
function dangXuat() {
    // Xóa thông tin đăng nhập từ Local Storage
    localStorage.removeItem('loggedInUser');
    // Chuyển hướng về trang đăng nhập
    window.location.href = "web.html";
}


// ngan chan chua dang nhap
document.addEventListener('DOMContentLoaded', function () {
    var gioHangLink = document.getElementById('gioHangLink');

    if (gioHangLink) {
        gioHangLink.addEventListener('click', function (event) {
            // Ngăn chặn hành động mặc định của liên kết
            event.preventDefault();

            // Kiểm tra trạng thái đăng nhập khi nhấn vào giỏ hàng
            var loggedInUserString = localStorage.getItem('loggedInUser');

            if (loggedInUserString) {
                // Nếu đã đăng nhập, chuyển hướng đến trang giỏ hàng
                window.location.href = "/cart.html";
            } else {
                // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
                alert("Bạn chưa đăng nhập, vui lòng đăng nhập trước để thực hiện chức năng này!");
                window.location.href = "dangnhap.html";
            }
        });
    }
});