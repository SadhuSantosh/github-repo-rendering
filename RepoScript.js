const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log(username);
getRepos();
async function getFollowers(){
    const followersData=await fetch(`https://api.github.com/users/${username}/followers`).then(data=>data.json())
    .catch((error)=>{
        console.log("followers count"+error);
    })
    document.querySelector(".follower").innerHTML=`${followersData.length} followers`;

    const followingData=await fetch(`https://api.github.com/users/${username}/following`).then(data=>data.json())
    .catch((error)=>{
        console.log("following count"+error);
    })
    document.querySelector(".following").innerHTML=`${followersData.length} following`;

}

function createRepo(element){
    var background;
    // console.log(element.full_name, element.owner.avatar_url,element.html_url,element.stargazers_count,element.forks_count,element.owner.login,element.language)
    switch(element.language)
    {
       case "JavaScript":background="background-color:#f1e05a";
                        break;
       case "HTML":background="background-color:#e34c26";
                        break;
       case "CSS":background="background-color:#563d7c";
                        break;                 
       case "Java" :background="background-color:#009688";
                        break;                
        default:background= "background-color:#00BCD4";

    }
    console.log(element.language,background);

    const repos=document.querySelector(".repos");
    const outer=document.createElement("div");
    outer.innerHTML=`
    <div class="repositories">
                  <p class="repo-icon fas fa-folder-open"></p>
                  <a href=${element.html_url} class="repo-full-name">${element.full_name}</a>
                  <div class="repo-info">
                      <div>
                        <p class="language-dot" style=${background}></p>
                        <p class="language">${element.language}</p> 
                      </div>
                       <div>
                        <p class="fork-icon fas fa-code-branch"></p>
                        <p class="fork-count">${element.forks_count} forks</p>
                       </div>
                       <div>
                        <p class="fork-icon far fa-star"></p>
                        <p class="star-count">${element.stargazers_count} stars</p>
                       </div>
                    
                  </div>
            </div>
            `;

            repos.append(outer);
}

async function getRepos(){
    const repoData=await fetch(`https://api.github.com/users/${username}/repos`).
    then(data=>data.json())
    .catch(error=>{
        console.log("Get Repositories"+error);
    });
    repoData.forEach(element => createRepo(element));
    document.querySelector(".repositories-count").innerHTML=`Total number of Repositories <strong>${repoData.length}</strong>`;
    console.log(repoData.length);
    document.querySelector(".profile-pic").setAttribute("src",`${repoData[0].owner.avatar_url}`);
    document.querySelector(".profile-name").innerHTML=`${repoData[0].owner.login}`;
    getFollowers();
}
function setSun(){
     const sun=document.querySelector(".sun");
     const moon=document.querySelector(".moon");
     moon.setAttribute("class","moon fas fa-moon");
     sun.setAttribute("class","sun far fa-sun sunenable");
     document.querySelector(".main").setAttribute("class","rep container-fluid main setSun");
     document.querySelector(".heading").setAttribute("class","heading setSun");
     
     

}
function setMoon(){
    const sun=document.querySelector(".sun");
    const moon=document.querySelector(".moon");
    moon.setAttribute("class","moon fas fa-moon moonenable");
    sun.setAttribute("class","sun far fa-sun");
    document.querySelector(".main").setAttribute("class","rep container-fluid main setMoon");
    document.querySelector(".heading").setAttribute("class","heading setMoon");
  
    
}

