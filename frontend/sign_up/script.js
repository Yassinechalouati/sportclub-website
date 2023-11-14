let file 


const actualBtn = document.getElementById('actual-btn');

   

    const imagePreview = document.getElementById('image-preview');
    
    actualBtn.addEventListener('change', function(){
      file = this.files[0]
      console.log(file.name)
     

      const imageUrl = URL.createObjectURL(file);
      imagePreview.src = imageUrl;
      imagePreview.style.display = 'block'; // or 'inline'
      
    })


async function signup() {

    const tel = document.getElementById('telInput').value;
        const nomAd = document.getElementById('nomInput').value;
        const pernomAd = document.getElementById('prenomInput').value;
        const date = document.getElementById('dateInput').value;
        const sport = document.getElementById('sportInput').value;

        console.log(file.name)

        try { 
    
            const response = await axios.post('http://localhost:3000/signup' , {
              nomAd: nomAd,
              prenomAd: pernomAd,
              date: date, 
              sport: sport,
              image: file.name,
              tel: tel
            });
        
            if (response.data.message === 'fields are empty!') {
              alert("Fill out the whole form!")
            }
         
            if (response.data.message === 'tel already exists!'){
                document.getElementById('telInput').setCustomValidity("this phone number already exists"); 
            }
            else {
                document.getElementById('telInput').setCustomValidity("");
            }
            document.getElementById('telInput').reportValidity();

            if (response.data.message === 'Username already exists!'){
                document.getElementById('prenomInput').setCustomValidity("this Username already exists"); 
            }
            else {
                document.getElementById('prenomInput').setCustomValidity("");
            }
            document.getElementById('prenomInput').reportValidity();
        
        
        
            if (response.data.message === 'User created successfully'){
              await swal("Success!", response.data.message, "success");
              window.location.href = "http://localhost:3000/sign_in/index.html";
              
            }
        
            
          
        } catch (error) {
          if (!file) {
             await swal("Error!", "fill out the whole form", "error");
          }
          
        await swal("Error!", "User not created !", "error");
          console.log(error);
        }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission if inside a form
    signup(); // Call the login function
  }
});


function limitCharacters(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}
