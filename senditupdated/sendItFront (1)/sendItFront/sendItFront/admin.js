const parcelOrders = document.querySelector('.parcel-orders');
const adminName = document.querySelector('#admin-name');
const url = "https://send-it-back-app.herokuapp.com";
const logout = document.querySelector('.logout');
const tbody = document.querySelector('.tbody');
const table = document.querySelector('.table')
//const token = localStorage.getItem("token");
const adminFirst = localStorage.getItem("firstName");
adminName.innerHTML = `Admin ${adminFirst}`;

//display orders
const displayOrders = function(){
    fetch(`${url}/order`, {
        method: "GET",
        headers: {
            Authorization : token
        },
    })
    .then((res) => res.json())
    .then((result) => {
        console.log("result", result);
        if(result.orders){
        const orders = result.orders;
        orders.forEach(order => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td class="orderId">${order._id}</td>
                          <td>${order.userId}</td>
                          <td>${order.pickup}</td>
                          <td>${order.destination}</td>
                          <td>${order.recName}</td>
                          <td>${order.recPhoneNo}</td>
                          <td class="status">${order.status}</td>
                          <td class="presentLoc">${order.presentLoc}</td>
                          <td><i class="fas fa-edit editBtn"></i></td>
                          <td><i class="fas fa-trash trashBtn"></i></td>`
                    tbody.appendChild(tr);
                    table.appendChild(tbody);
        });
      }
    }) 
    .catch((err) => {
        console.log(err)
    })
  }
  
displayOrders();

//edit btn
$(document).on("click", ".editBtn", function(e){
   const row = $(e.target).closest('tr');
   const orderId = row.find('.orderId')[0].innerHTML;
   const rowStatus = row.find('.status')[0].innerHTML;
  // console.log(orderId, rowStatus);
   if(rowStatus === "ready to pick"){
   const orderStatus = prompt("do you want to change the status of the parcel order to 'on transit' or 'delivered'");
   switch(orderStatus) {
   case "delivered":
      fetch(`${url}/order/${orderId}`, {
          method: "PATCH",
          headers: {
             "Content-Type": "application/json",
              Authorization: token
          },
          body: JSON.stringify({
             status: "delivered"
          })
      })
      .then((res) => res.json())
      .then((res) => {
          if(res.message === "data patched"){
              console.log("done");
              location.reload();
          }
          
      })
      .catch((err) => {
          console.log(err);
      })
      break;
   case "on transit":
    fetch(`${url}/order/${orderId}`, {
        method: "PATCH",
        headers: {
           "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
           status: "on transit"
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.message === "data patched"){
            console.log("done");
            location.reload();
        }
    })
    .catch((err) => {
        console.log(err);
    })
    break;
}
   }
   else if(rowStatus === "on transit"){
   const orderStatus = confirm("do you want to change the status of the parcel order to 'delivered'?");
      if(orderStatus){
        fetch(`${url}/order/${orderId}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
               status: "delivered"
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.message === "data patched"){
                console.log("done");
                location.reload();
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
      }
   }
});
//delete order
$(document).on("click", ".trashBtn", function(e) {
    const row = $(e.target).closest('tr');
    const orderId = row.find('.orderId')[0].innerHTML;
    const rowStatus = row.find('.status')[0].innerHTML;

 if(rowStatus === 'cancelled' || rowStatus === 'delivered' ){
    const deletePrompt = confirm("Are you sure you want to delete this order?");
    if(deletePrompt){
        fetch(`${url}/order/${orderId}/delete`,{
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: token
          },
          })
          .then((res) => res.json())
          .then((res) => {
              if(res.message === "order deleted"){
                  alert("order deleted");
                  location.reload();
              }
          })
          .catch((err) => {
              console.log(err);
          })
    }
 }
});
$(document).on("click", ".presentLoc", function(e){
    const row = $(e.target).closest('tr');
    const orderId = row.find('.orderId')[0].innerHTML;
    const rowStatus = row.find('.status')[0].innerHTML;
    
   const presentLocation = prompt("enter the present location of the parcel delivey order");
   if(rowStatus !== 'cancelled' || rowStatus !== 'delivered'){
    if(presentLocation){
        console.log("yay")
        fetch(`${url}/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                presentLoc: presentLocation
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.message === "data patched"){
                console.log("yes");
                location.reload();
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
});

logout.onclick = function(){
    localStorage.clear();
    window.location.href = "./index.html";
}
if(!token){
    window.location.href = "./login.html"
}
