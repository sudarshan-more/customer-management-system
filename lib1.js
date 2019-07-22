import config from "./config1.js"

export function getCustomers() {
  const p = new Promise(function(resolve, reject) {
    fetch(`${config.endpoint}/customers`)
      .then(res => res.json())
      .then(data => resolve(data));
  });
  return p;
}
  export function saveCustomers(customers) {
    return fetch(`${config.endpoint}/customers`, {
      method: "POST",
      body: JSON.stringify(customers),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  }

  export function deleteCustomers(id) {
    let message = `confirm deletion of customer with id ${id}`;
    alert(message); 
    console.log("Delete : " + id);
    return fetch(`${config.endpoint}/customers/${id}`, {
    method: "DELETE",
    }).then(res => res.json());
   }
  

  

