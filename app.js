let myLeads = [];

let inputBtn = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// function render(leads) {
//   let listItems = "";

//   for (let i = 0; i < leads.length; i++) {
//     listItems += `
//         <li>
//         <a target='_blank' href="${leads[i]}">
//         ${leads[i]}
//         </a>
//         </li> 
//     `;
// }
//   ulEl.innerHTML = listItems;

// }

function render(leads) {

  while (ulEl.firstChild) {
    ulEl.removeChild(ulEl.firstChild);
  }

  for (let i = 0; i < leads.length; i++) {
    
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.target = "_blank"
    a.href = leads[i]
    a.textContent = leads[i]
    li.appendChild(a);
    ulEl.appendChild(li);
  }
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});