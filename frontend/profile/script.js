
const redirected = localStorage.getItem('redirected');
  const url = localStorage.getItem('url');
  const namee = localStorage.getItem('name');
  const nom = localStorage.getItem('nom')
  const dateStr = localStorage.getItem('date')
  const date = new Date(dateStr);
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
  const sport = localStorage.getItem('sport')
  const image = localStorage.getItem('image')
  const tel = localStorage.getItem('tel')

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
 
    const Fname= document.getElementById("Fname")
    const Number = document.getElementById("Number")
    const date =  document.getElementById("date")
    const sportt = document.getElementById("sport")
    const pdpElement = document.querySelector('.pdp');
    const color = document.querySelector('.sport')
    const icon = document .querySelector('.iconb')

    const basket = "#FFA500"
    const tennis = "#A4D37E"
    const foot = "#008000"
    const volley = "#FFD700"

    const formattedPhoneNumber = tel.substring(0, 2) + " " + tel.substring(2, 5) + " " + tel.substring(5);
    Fname.textContent = namee+" "+nom
    Number.textContent = formattedPhoneNumber
    date.textContent = formattedDate
    sportt.textContent = sport

    pdpElement.style.backgroundImage = `url('../pfa_assets/images/${image}')`
    
    if (sport == "BasketBall" ) {
      color.style.backgroundColor = basket;
      icon.style.backgroundImage = `url('../pfa_assets/icons/basketball-ball.png')`

    }else if (sport =="Tennis") {
      color.style.backgroundColor = tennis;
      icon.style.backgroundImage = `url('../pfa_assets/icons/tennis.png')`
    }
    else if( sport == "VolleyBall")  {
      color.style.backgroundColor = volley;
      icon.style.backgroundImage = `url('../pfa_assets/icons/volleyball.png')`
    }
    else if (sport == "FootBall") {
      color.style.backgroundColor = foot;
      icon.style.backgroundImage = `url('../pfa_assets/icons/football.png')`
    }




  } else {
    nav_content.innerHTML += `<li> <a href ="/profile"><input  class="login" type="button" value="Login"></a></li>`
  }

  function showConfirmationMessage() {
    var overlay = document.getElementById('overlay');
    var confirmationMessage = document.getElementById('confirmationMessage');
    overlay.style.display = 'block';
    confirmationMessage.style.display = 'block';
  }
  
  function hideConfirmationMessage() {
    var overlay = document.getElementById('overlay');
    var confirmationMessage = document.getElementById('confirmationMessage');
    overlay.style.display = 'none';
    confirmationMessage.style.display = 'none';
  }
  
  async function deleteAccount() {
    // Perform the account deletion logic here
    try { 
    
      const response = await axios.post('http://localhost:3000/delete' , {
        Numb:tel
      });


      if (response.data.message == 'Deleted'){
        await swal("Success!", "Account Deleted Successfully!", "success");
          redirect()
        
      }
  
      
    
  } catch (error) {
    await swal("Error!", "Failed to delete account", "error");
    console.log(error);
  }
    // Close the confirmation message
    hideConfirmationMessage();
  }
  

  
  function redirect() {
    localStorage.clear();
    window.location.href = "http://localhost:3000/sign_in/index.html";
  }