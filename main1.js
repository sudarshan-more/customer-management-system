import { saveCustomers ,getCustomers, deleteCustomers} from "./lib1.js";

document.body.onload = async function(){
 let allData
 allData= await getCustomers();
if (allData.length === 0) {
  document.getElementById("customerTable").style.display = "none";

  document.getElementById("para").innerHTML = "No Data to display";
} else {
  var table = document.getElementById("customerTable");

  for (let i = 0; i < allData.length; i++) {

      let tr = document.createElement("tr");
      let ID = document.createElement("td");
      ID.textContent = allData[i].id;
      tr.appendChild(ID);

      let First = document.createElement("td");
      First.textContent = allData[i].firstName;
      tr.appendChild(First);

      let Last = document.createElement("td");
      Last.textContent = allData[i].lastName;
      tr.appendChild(Last);

      let Email = document.createElement("td");
      Email.textContent = allData[i].email;
      tr.appendChild(Email);

      let Mobile = document.createElement("td");
      Mobile.textContent = allData[i].mobile;
      tr.appendChild(Mobile);

      let tdButton = document.createElement("input");
      tdButton.setAttribute("type", "button");
      tdButton.setAttribute("value", "Delete")
      tdButton.setAttribute("id", allData[i].id);
      tdButton.setAttribute("class", "btn btn-info");
      tdButton.onclick = deleteCurrentClick.bind(null, allData[i].id);
      
      tr.appendChild(tdButton);

      table.appendChild(tr);
  }
  async function deleteCurrentClick(id){
    let {res} = await deleteCustomers(id);
    //let { id1 } = res;
   // let message = `confirm deletion of customer with id ${id1}`;
   // alert(message); 
}
}
  

document.forms[0].addEventListener("submit", async function submitForm(e) { 
  console.log(e)
  e.preventDefault();
    let firstName = document.querySelector("#firstName").value;
            if (document.getElementById('firstName').value === ""||null) {
                document.getElementById('firstname_errors').innerHTML="first name is required";
                return false;
             } else {
                  document.getElementById('firstname_errors').innerHTML = null;   
                   }
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
        if((document.getElementById("email").value)===""||(!re.test(document.getElementById("email").value))){
          document.getElementById("email_errors").innerHTML="invalid email"
          return false;
          }
          else {
          document.getElementById('email_errors').innerHTML = null;   
        }
    let mobile = document.querySelector("#mobile").value;
           if ((document.getElementById('mobile').value).length!==10||null) {
           document.getElementById('mobile_errors').innerHTML="valid mobile number is required";
           return false;
           } else {
           document.getElementById('mobile_errors').innerHTML = null;   
           }
    let body = { firstName, lastName, email, mobile };
    let createdPost = await saveCustomers(body);
    let { id } = createdPost;
    let message = `customer successfully with id ${id}`;
    alert(message);    
  });
};