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
  
    const body=document.querySelector('body');  
   const main=document.createElement("div");
   main.setAttribute("class","main");
   const logo=document.createElement("img");
   logo.setAttribute("src","./assets/Icon.jpg");
   var h = document.createElement("H3");
   var t = document.createTextNode("Repo-Hub");
    h.appendChild(t);
    const tagline=document.createElement("p");
   tagline.setAttribute("class","tagline");
   tagline.innerText="Where you can find all your repositories.";
   const matter=document.createElement("p");
   matter.setAttribute("class","matter");
   matter.innerText="Enter your Github username to proceed.";
    const form=document.createElement("div");
   form.setAttribute("class","form");
   const username=document.createElement("input");
   username.setAttribute("class","username");
   username.setAttribute("placeholder","enter github username");
   username.setAttribute("required","");
   
   const button=document.createElement("button");
 button.onclick=viewRepos;
   button.setAttribute("class","button");
   button.innerText="View Repositories";
   
   const error_message=document.createElement("p");
   error_message.setAttribute("class","error_message");
   
   
   form.append(username,button);
   main.append(logo,h,tagline,matter,form,error_message);
   document.body.append(main);
   
 }

