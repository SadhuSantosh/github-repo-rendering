const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log(username);


window.onload=function getInitial(){
    const body=document.querySelector('body');  
    const heading=document.createElement("div");
    heading.setAttribute("class","heading");
    const logo=document.createElement("img");
    logo.setAttribute("src","./assets/Icon.png");
    logo.setAttribute("alt","Icon");
    const head=document.createElement("div");
    head.setAttribute("class","head");
    var h = document.createElement("H3");
    var t = document.createTextNode("Repo-Hub");
    h.appendChild(t);
    const Theme=document.createElement("div");
    Theme.setAttribute("class","Theme");
    const Label=document.createElement("p");
    Label.innerText="Theme";
    const sun=document.createElement("p");
    sun.setAttribute("class","sun far fa-sun sunenable");
    sun.onclick=setSun;
    const moon=document.createElement("p");
    moon.setAttribute("class","moon fas fa-moon");
    moon.onclick=setMoon;


    const rep=document.createElement("div");
    rep.setAttribute("class","rep container-fluid main");
    const row=document.createElement("div");
    row.setAttribute("class","row");
    const profile=document.createElement("div");
    profile.setAttribute("class","profile col-md-3");
    const profilePic=document.createElement("img");
    profilePic.setAttribute("class","profile-pic");
    profilePic.setAttribute("src","./assets/Repo.png");
    profilePic.setAttribute("alt","Profile-pic");
    const profileName = document.createElement("H3");
    profileName.setAttribute("class","profile-name");
    const follow=document.createElement("div");
    follow.setAttribute("class","followers-class");
    const users=document.createElement("p");
    users.setAttribute("class","fas fa-users");
    const follower=document.createElement("p");
    follower.setAttribute("class","follower");
    follower.innerText="followers";
    const following=document.createElement("p");
    following.setAttribute("class","following");
    following.innerText="following";
    
    const repp=document.createElement("div");
    repp.setAttribute("class","rep col-md-9");
    const repoCount=document.createElement("p");
    repoCount.setAttribute("class","repositories-count");
    const repos=document.createElement("div");
    repos.setAttribute("class","repos");
    

    head.append(h);
    Theme.append(Label,sun,moon);
    heading.append(logo,head,Theme);
    
    follow.append(users,follower,following);
    profile.append(profilePic,profileName,follow);

    repp.append(repoCount,repos);
    row.append(profile,repp);
    rep.append(row);
    document.body.append(heading,rep);
    getRepos();

}
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
    const repositories=document.createElement("div");
    repositories.setAttribute("class","repositories");
    const repoIcon=document.createElement("p");
    repoIcon.setAttribute("class","repo-icon fas fa-folder-open");   
    const repoFullName=document.createElement("a");
    repoFullName.setAttribute("class","repo-full-name");
    repoFullName.setAttribute("href",`${element.html_url}`);
    repoFullName.innerHTML=`${element.full_name}`;
    const repoInfo=document.createElement("div");
    repoInfo.setAttribute("class","repo-info");
    const first=document.createElement("div");
    const dot=document.createElement("p");
    dot.setAttribute("class","language-dot"); 
    dot.setAttribute("style",`${background}`);
    const language=document.createElement("p");
    language.setAttribute("class","language");
    language.innerHTML=`${element.language}`;
    const second=document.createElement("div");
    const fork=document.createElement("p");
    fork.setAttribute("class","fork-icon fas fa-code-branch"); 
    const forkCount=document.createElement("p");
    forkCount.setAttribute("class","fork-count");
    forkCount.innerHTML=`${element.forks_count} forks`;
    const third=document.createElement("div");
    const star=document.createElement("p");
    star.setAttribute("class","fork-icon far fa-star"); 
    const starCount=document.createElement("p");
    starCount.setAttribute("class","star-count");
    starCount.innerHTML=`${element.stargazers_count} stars`;



    first.append(dot,language);
    second.append(fork,forkCount);
    third.append(star,starCount);
    repoInfo.append(first,second,third);
    repositories.append(repoIcon,repoFullName,repoInfo);
     outer.append(repositories);
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

