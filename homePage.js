"use strict"
function saveUser(event) {
  var user = event.target.value;
  if(user == null){
    localStorage.setItem("user",player);
  }
  else{
    localStorage.setItem("user", user)
  }  
}
