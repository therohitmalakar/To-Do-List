const box = document.getElementById("input-box");
const listbox = document.getElementById("list-box");

function addTask(){
    if(box.value === ''){
        alert("Task is NOT ADDED");
    }else{
        let li = document.createElement("li");
        li.innerHTML = box.value;
        listbox.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    box.value = '';
    saveData();
}

listbox.addEventListener("click", function(pressed){
    if(pressed.target.tagName === 'LI'){
        pressed.target.classList.toggle("clicked");
        saveData();
    }
    else if(pressed.target.tagName === "SPAN"){
        pressed.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listbox.innerHTML);
}

function showData(){
    listbox.innerHTML = localStorage.getItem("data");
}
showData();