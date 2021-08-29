const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log(username);
getRepos();
async function getFollowers(){
    const followersData=await fetch(`https://api.github.com/users/${username}/followers`).then(data=>data.json())
    .catch((error)=>{
        console.log("followers count"+error);
    })
    document.querySelector(".follower").innerHTML=`${followersData.length} follower`;

    const followingData=await fetch(`https://api.github.com/users/${username}/following`).then(data=>data.json())
    .catch((error)=>{
        console.log("following count"+error);
    })
    document.querySelector(".following").innerHTML=`${followersData.length} following`;

}

// function createRepo(data){
//     switch(color){
//        case "JavaScript":"rgb(241 224 90)";
//                         break;
//        case "HTML":"rgb(227 76 38)";
//                         break;
//        case "CSS":"rgb(86 61 124)";
//                         break;                 
//        case "Java" :"rgb(176 114 25)";
//                         break;                
//         default: "rgb(137 224 81)";

//     }
//     //  document.querySelector(".repositories").innerHTML=``;
// }

async function getRepos(){
    const repoData=await fetch(`https://api.github.com/users/${username}/repos`).
    then(data=>data.json())
    .catch(error=>{
        console.log("Get Repositories"+error);
    });
    // repoData.forEach(element => createRepo(element));
     // console.log(element.full_name, element.owner.avatar_url,element.html_url,element.stargazers_count,element.forks_count,element.owner.login)
    document.querySelector(".repositories-count").innerHTML=`Total number of Repositories <strong>${repoData.length}</strong>`;
    console.log(repoData.length);
    document.querySelector(".profile-pic").setAttribute("src",`${repoData[0].owner.avatar_url}`);
    document.querySelector(".profile-name").innerHTML=`${repoData[0].owner.login}`;
    getFollowers();
   
            
    
}
