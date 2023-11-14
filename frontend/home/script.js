
document.querySelector('.Learn_more').addEventListener('click', function() {
    const targetSection = document.getElementById('more');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });


  

  const redirected = localStorage.getItem('redirected');
  const url = localStorage.getItem('url');
  const namee = localStorage.getItem('name');
  

  const nav_content = document.getElementById("nav-content")


  if (redirected) {
    nav_content.innerHTML += `<li>
    <div class="avatar-dropdown">
    <img src="../pfa_assets/images/${url}" alt="Avatar" class="avatar" id="avatarr">
    <a href="#" class="user-name">${namee}</a>
    <img src="../pfa_assets/icons/down.png" class="down-arrow">
    <div class="dropdown-menu">
      <div class="dropdown-item">
      <img class="icon" src="../pfa_assets/icons/account.png">
      <a href="/profile">Account</a>
      </div>
      <div class="dropdown-item">
      <img class="icon" src="../pfa_assets/icons/settings.png">
      <a href="#">Settings</a>
      </div>
      <hr class="line_break">
      <div class="dropdown-item">
      <img class="icon" src="../pfa_assets/icons/logout.png">
      <a href="#" onclick="redirect()">Log out</a>
      </div>
    </div>
  </div>
  </li>
  `
   
    const avatarDropdown = document.querySelector('.avatar-dropdown');
    const dropdownMenu = avatarDropdown.querySelector('.dropdown-menu');

    avatarDropdown.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
});

    document.addEventListener('click', function(event) {
    if (!avatarDropdown.contains(event.target)) {
    dropdownMenu.classList.remove('show');
    }
    });

  } else {
    nav_content.innerHTML += `<li> <a href ="/profile"><input  class="login" type="button" value="Login"></a></li>`
  }

  function redirect() {
    localStorage.clear();
    window.location.href = "http://localhost:3000/sign_in/index.html";
  }

  

