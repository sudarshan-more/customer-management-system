import { saveCustomers, getCustomers, deleteInfo} from "./lib1.js";


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
           document.getElementById('mobile_errors').innerHTML="mobile name is required";
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
  let allData;
  async function getalldata(){
        allData = await getCustomers();
       //console.log(allData);
       let tableData ='';
        allData.map(data => {
        tableData += `<tr>
        <td>${data.id}</td>
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.mobile}</td>
        <td><button id="delete-value" class="delete-value" data-id=${data.id}  >Delete</button></td>
        </tr>`
        });
       let table = `<table>
        ${tableData}
        </table>`
         document.getElementById("Customerdatatable").innerHTML = table;

         document.getElementById("delete-value").addEventListener("click", function(e) {
          console.log(e);
          deleteInfo(e.target.getAttribute('data-id'));
           });



         
  }

getalldata()
