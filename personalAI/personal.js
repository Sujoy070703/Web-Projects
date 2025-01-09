let prompt= document.querySelector("#prompt");
let container= document.querySelector(".container");
let btn= document.querySelector("#btn");
let charContainer= document.querySelector(".chat-container");
let userMessage= null;
let api_url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAgZSfww_5OMs0rswS-NQWbAFajRk613ZA"


function createChatBox(html,className){
    let div= document.createElement("div");
    div.classList.add(className)
    div.innerHTML= html
    return div
}

async function getApiResponse(aiChatBox){

    let textElement= aiChatBox.querySelector(".text")

    try{
        let reponse=await fetch(api_url,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                contents: [
                    {"role": "user",
                        "parts":[{text: userMessage}]}
                ]
            })
        })

        let data= await reponse.json();
        let apiResponse= data?.candidates[0].content.parts[0].text;
        textElement.innerText= apiResponse;
    }

    catch(error){
      console.log(error)
    }

    finally{
        aiChatBox.querySelector(".loading").style.display="none"
    }
}

function showLoading(){
    let html =` <div class="img">
                <img src="ai.png" width="50px"  alt="">   
            </div>
 
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="" height="50px"> `
            let aiChatBox= createChatBox(html, "ai-chat-box"); 
            charContainer.appendChild(aiChatBox)
            getApiResponse(aiChatBox)
}

btn.addEventListener("click", ()=>{
    userMessage= prompt.value;
     if(userMessage==""){
        container.style.display= "flex";
     }{
        container.style.display= "none ";
     }
    if(!userMessage) return;
    let html= `<div class="img">
                <img src="user.png" width="50px" alt="">   
               </div>

               <p class="text"></p>`; 

    let userChatBox= createChatBox(html, "user-chat-box");           
    userChatBox.querySelector(".text").innerText= userMessage
    charContainer.appendChild(userChatBox)
    prompt.value=""

    setTimeout(showLoading, 500)
})

prompt.addEventListener("keypress", (e)=>{
    if(e.key=="Enter") btn.click();
})