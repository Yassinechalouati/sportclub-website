



async function forgot() {

    const mp = document.getElementById('tel')
    if (mp.value == "") {
        await swal("Error!", "Failed to send password.", "error");
    }
    else {
        try { 
    
            const response = await axios.post('http://localhost:3000/forgot-password' , {
              phoneNumber: mp.value,
            });
    
    
            if (response.data.message == 'Password sent successfully'){
                
                await swal("Success!", "Password Reset", "success");
                window.location.href = "http://localhost:3000/sign_in/index.html";
              
            }
        
            
          
        } catch (error) {
            await swal("Error!", "Failed to send .", "error");
          
          console.log(error);
        }
    }
    
}


function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
  }

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      forgot(); // Call the login function
    }
  });
  
  function limitCharacters(input, maxLength) {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }