function route ( ) {
    window.location.href = "../sign_up/index.html"
}

async function login() {

    const tel = document.getElementById("tel")

    const mp = document.getElementById("pword")


    try { 
    
        const response = await axios.post('http://localhost:3000/login' , {
          mp: mp.value,
          tel: tel.value
        });
    
        if (response.data.message === 'Invalid number') {
            tel.setCustomValidity("Invalid Number")
        }
        else {
            tel.setCustomValidity("");
        }
    
        
        tel.reportValidity();

        if (response.data.message === 'Invalid password'){
            mp.setCustomValidity("Invalid password"); 
        }
        else {
           mp.setCustomValidity("");
        }
        mp.reportValidity();
    
    
    
        if (response.data.message === 'in'){
            localStorage.setItem('redirected', 'true');
            localStorage.setItem('url', response.data.result.image);
            localStorage.setItem('name', response.data.result.prenomAd);
            localStorage.setItem('nom', response.data.result.nomAd)
            localStorage.setItem('date', response.data.result.dateN)
            localStorage.setItem('sport', response.data.result.sportPrinciplae)
            localStorage.setItem('image', response.data.result.image)
            localStorage.setItem('tel', response.data.result.num)
            await swal("Success!", "Welcome!", "success");
            window.location.href = "http://localhost:3000/home/index.html";
          
        }
    
        
      
    } catch (error) {
        await swal("Error!", "Try again!", "error");
      console.log(error);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      login(); // Call the login function
    }
  });


  function limitCharacters(input, maxLength) {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
  