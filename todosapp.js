const taskinp=document.querySelector(".input");
const addbtn=document.querySelector(".addbtn");
const tasklist=document.querySelector(".tasks");

document.addEventListener("DOMContentLoaded",gettasks);
addbtn.addEventListener("click",addtask);
tasklist.addEventListener("click",removetask);


function addtask(event){
    event.preventDefault();
    const taskdiv=document.createElement("div");
    taskdiv.classList.add("task");
    const newtask=document.createElement("li");
    newtask.innerText=taskinp.value;
    newtask.classList.add("taskitem");
    taskdiv.appendChild(newtask);
    saveLocalTasks(taskinp.value);

    const donebtn=document.createElement("button");
    donebtn.innerHTML="Mark as done";
    donebtn.classList.add("done");
    taskdiv.appendChild(donebtn);

    const removebtn=document.createElement("button");
    removebtn.innerHTML="Remove";
    removebtn.classList.add("removebton");
    taskdiv.appendChild(removebtn);  
    tasklist.appendChild(taskdiv);
    taskinp.value= "";
}
function removetask(e){
    const item=e.target;
    if(item.classList[0]==="removebton"){
        const task=item.parentElement;
        task.classList.add("slide");
        removeLocaltasks(task);
        task.addEventListener("transitioned",function(){
            task.remove();
        });
    }
    if(item.classList[0]==="done"){
        const task=item.parentElement;
        task.classList.add("donemarked");
    }
}
function saveLocalTasks(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function gettasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }       
    tasks.forEach(function(task){
        const taskdiv=document.createElement("div");
        taskdiv.classList.add("task");
        const newtask=document.createElement("li");
        newtask.innerText=task;
        newtask.classList.add("taskitem");
        taskdiv.appendChild(newtask);

        const donebtn=document.createElement("button");
        donebtn.innerHTML='Mark as Done';
        donebtn.classList.add("done");
        taskdiv.appendChild(donebtn);

        const removebtn=document.createElement("button");
        removebtn.innerHTML='Remove';
        removebtn.classList.add("removebton");
        taskdiv.appendChild(removebtn);
        tasklist.appendChild(taskdiv);

    });
}
function removeLocaltasks(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    const taskindex=task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskindex),1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    

}

