
let file 
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

    const pfp = document.querySelector('.pfp');
    pfp.style.backgroundImage = `url('../pfa_assets/images/${image}')`;






  } else {
    nav_content.innerHTML += `<li> <a href ="/profile"><input  class="login" type="button" value="Login"></a></li>`
  }
  

  
  function redirect() {
    localStorage.clear();
    window.location.href = "http://localhost:3000/sign_in/index.html";
  }


  const actualBtn = document.getElementById('actual-btn');
const pfp = document.querySelector('.pfp');

actualBtn.addEventListener('change', function() {
   file = this.files[0];
 console.log(file.name)

    pfp.style.backgroundImage = `url('../pfa_assets/images/${file.name}')`;

});


  async function Modify() {

    const pfp = document.querySelector('.pfp');
    

console.log(file.name);

const firstNameInput = document.getElementById('firstNameInput').value;
const lastNameInput = document.getElementById('lastNameInput').value;
const phoneNumberInput = document.getElementById('phoneNumberInput').value;
const birthDateInput = document.getElementById('birthDateInput').value;
const sportSelect = document.getElementById('sportSelect').value;



        try { 
    
            const response = await axios.post('http://localhost:3000/modify' , {
              nomAd: lastNameInput,
              prenomAd: firstNameInput,
              date: birthDateInput, 
              sport: sportSelect,
              image: file.name,
              tel: phoneNumberInput,
              Numb:tel
            });

            console.log("here")
        
            if (response.data.message == "tel Exists") {
                document.getElementById('phoneNumberInput').setCustomValidity("This number Already Exists!")
            }
            else {
                document.getElementById('phoneNumberInput').setCustomValidity("")

            }
            document.getElementById('phoneNumberInput').reportValidity()
        
            

            if (response.data.message === 'prenom exists'){
                document.getElementById('firstNameInput').setCustomValidity("this Username already exists"); 
            }
            else {
                document.getElementById('firstNameInput').setCustomValidity("");
            }
            document.getElementById('firstNameInput').reportValidity();
        
        
        
            if (response.data.message == 'Succes'){
                console.log("herer")
                localStorage.clear();
                localStorage.setItem('redirected', 'true');
            localStorage.setItem('url', file.name);
            localStorage.setItem('name', firstNameInput);
            localStorage.setItem('nom', lastNameInput)
            localStorage.setItem('date', birthDateInput)
            localStorage.setItem('sport', sportSelect)
            localStorage.setItem('image', file.name)
            localStorage.setItem('tel', phoneNumberInput)
            await swal("Success!", "Data reset Successfully !", "success");
              window.location.href = "http://localhost:3000/profile/index.html";
              
            }
        
            
          
        } catch (error) {
          
          await swal("Error!", "Operation Failed !", "error");
          
          console.log(error);
        }
}


  function limitCharacters(input, maxLength) {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
