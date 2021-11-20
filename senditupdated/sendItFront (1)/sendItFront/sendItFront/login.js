const email = document.querySelector('.email');
const password = document.querySelector('.password');
const loginBtn = document.querySelector('.loginBtn');
const form = document.querySelector("#loginField");
//const adminMsg = document.querySelector('.adminMessage');
const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//const cors_api_url = "https://cors-anywhere.herokuapp.com";
const url = "https://send-it-back-app.herokuapp.com";
//const token = localStorage.getItem('token');

//log user
const logUser = function(e) {
    e.preventDefault();
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   
   if(
        email.value === "kiekie@gmail.com" && password.value === "kiekiexo"){
        //console.log(email.value, password.value);
          logAdmin();       
 }
   else if(
     email.value.match(pattern) && password.value != ""){
       loginBasicUser();
}

   else if(!email.value.match(pattern) && password != ""){
       alert("invalid email/password");
   }
   else if(email.value === "" || password.value === ""){
        alert("pls enter your field completely");
        }
}
//logUser
function loginBasicUser(){
       fetch(`${url}/user/login`, 
       {
           method: "POST",
           headers: {
             Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
           },
           body: JSON.stringify({
               email: email.value,
               password: password.value
           })
       })
       .then((res) => res.json())
       .then((res) => {
           if(res.message === "user not found" && password.value != ""){
               alert('user not registered');
               return false;
           }
           if(res.message === "invalid email/password"){
               alert('invalid email/password');
           }
           else if(res.token){
             const { _id } = res.user;
             localStorage.setItem("token", res.token)
             fetch(`${url}/user/login/${_id}`, {
                 method: "GET",
                 headers: {
                     Authorization: res.token,
                 }
             })
             .then((res) => res.json())
             .then((res) => {
                 if(res.success){
                     localStorage.setItem("firstName", res.data.firstName);
                     localStorage.setItem("userId", res.data._id);
                     email.value = "";
                     window.location.href = "./profile.html";
                 }
                 else if(res.error){
                    console.log(res.error)
                 }
             })
         }
     })
     .catch((err) => {
         console.log(err);
     });
 } 

//log admin
function logAdmin(){
        fetch(`${url}/user/login`, 
        {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res.token){
                const { _id } = res.user;
                localStorage.setItem("token", res.token)
                fetch(`${url}/user/login/${_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: res.token,
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    if(res.success){
                        localStorage.setItem("firstName", res.data.firstName);
                        localStorage.setItem("userId", res.data._id);
                        localStorage.setItem("email", res.data.email);
                        email.value = "";
                        window.location.href = "./admin.html";
                    }
                    else if(res.error){
                    console.log(res.error)
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
        }  

     

form.addEventListener("submit", logUser);



