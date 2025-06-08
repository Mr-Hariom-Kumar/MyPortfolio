
let but=document.querySelector("#btn");
but.addEventListener('click',(evebt)=>{
    let inp=document.querySelector("#message");
    if(inp.value==""){
        alert("Message Cannot be Empty!")
    }
    else{
        setTimeout(()=>alert("Message Sent! Thank you"),1000);
    }
})
let menubtn=document.querySelector(".menubtn");
let sidebar=document.querySelector(".sidebar");
menubtn.addEventListener("click",()=>{
    sidebar.style.transition="margin-left 0.2s ease";
    if(sidebar.style.marginLeft==="-180%"){
        sidebar.style.marginLeft="0";
    }
    else{
        sidebar.style.marginLeft="-180%";
    }
});