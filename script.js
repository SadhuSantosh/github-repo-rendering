async function isPresent(name){
    try{
        const data=await fetch(`https://api.github.com/users/${name}/repos`)
        .then((response)=>{
           if( response.status >= 400 && response.status < 600)
           {
               throw new Error("Username not found, Enter a valid username");
           }
           else{
            window.location.href = `http://localhost:5500/Repo.html?username=${name}`;
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

