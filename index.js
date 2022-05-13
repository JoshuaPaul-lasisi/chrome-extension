let myLeads = []
let inputBtn = document.getElementById("input-btn")
let tabBtn = document.getElementById("tab-btn")
let deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
    
})

function render(leads){
    let listItems =""
for (i=0; i< myLeads.length; i++){
    // listItems +=  "<li><a href='https://" + myLeads[i] + "' target='_blank' rel='noopener noreferrer'>" + myLeads[i] + "</a></li>"
    listItems +=  `
    <li>
        <a href='https://${leads[i]}' target='_blank' rel='noopener noreferrer'>
            ${leads[i]}
        </a>
    </li>`
    console.log(listItems)
    
}
ulEl.innerHTML = listItems
}

inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})
deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
