function dangKy() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra xem cả tài khoản và mật khẩu đã được nhập chưa
    if (!email || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
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
    var isAdmin = (email === "admin" && password === "admin");
    //khi goi ben login accounts[i].isAdmin phai goi truoc dau :   sau dau : là kiểu boolean
    // sau : là tất cả kiểu var
    // truoc : là kiểu gọi khi vd: accounts[i].email// hieu dai khai la khi goi nhu vay no se lay gia tri la email sau dau : de so sanh, giong nhu boolean
    // sau dau : là var và emailDangNhap cx la var nen suy ra var la gia tri,,,...
    var account = { email: email, password: password, isAdmin: isAdmin };

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
        // Check if the current account matches the entered email and password
        if (accounts[i].email === emailDangNhap && accounts[i].password === passwordDangNhap) { 
            // If the account is an admin
            if (accounts[i].isAdmin) {
                alert("Đăng nhập với quyền admin!");
                // Redirect to the admin page
                window.location.href = "https://www.facebook.com/profile.php?id=100021947714995";
            } else {
                // If the account is a regular user
                alert("Đăng nhập thành công!");
                // Redirect to the regular user page
                window.location.href = "web.html";
            }
            
            // Set the logged-in user's name in local storage
            localStorage.setItem('loggedInUserName', accounts[i].email);
            
            // Exit the loop once a matching account is found
            return;
        }
    }
    
    // If no matching account is found, show an error alert
    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
    

    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
}
function updateLoggedInUser() {
    var loggedInUserName = localStorage.getItem('loggedInUserName');
    if (loggedInUserName) {
        // User is logged in, update the HTML
        var userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = loggedInUserName;
        }
    }
}

// Call the function when the page loads
updateLoggedInUser();
