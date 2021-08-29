async function isPresent(name){
    try{
        const data=await fetch(`https://api.github.com/users/${name}/repos`)
        .then((response)=>{
           if( response.status >= 400 && response.status < 600)
           {
               throw new Error("Username not found, Enter a valid username");
           }
           else{
            window.location.href = `https://repo-hub.netlify.app/Repo.html?username=${name}`;
           }
        })
        .catch((error)=>{
            console.log(error); 
            document.querySelector(".error_message").innerHTML=`${error}`;
            return false;
        })
    }
    catch(e){
        console.log(e);
    }
    }

function viewRepos(){
  
  const username=document.querySelector(".username").value;
  if(username===""){
      document.querySelector(".error_message").innerHTML="*Username shouldn't be empty"
  }
 else {
     isPresent(username);
    }
  console.log(username);
}


window.onload =function initialHTML(){
      document.body.innerHTML=`<div class="main">
               <img src="./assets/Icon.jpg" alt="">
               <h3>Repo-Hub</h3>
                 <p class="tagline">Where you can find all your repositories.</p>
                  <p class="matter">Enter your Github username to proceed</p>
                <div class="form">
                    <input class="username" type="text" class="username" placeholder="enter github username" required>
                    <button onclick="viewRepos()" class="button">View Repositories</button>
                </div>
                <p class="error_message"></p>
              </a>
             </div>
                `;

}


