"use strict";
let INP_project_name = document.getElementById("project_name");
let INP_hidden = document.getElementById("ProjectIndex");

let Tbody_project = document.getElementById("projects");
let btn_project = document.getElementById("project_btn");


let Zaznam_pole = window.localStorage.getItem("records");
let Zaznam;

if (Zaznam_pole === null)
{
    Zaznam = [];
} else
{
    Zaznam = JSON.parse(Zaznam_pole);
}

let max_id = -1; //pokud je pole prázdné -1 jinak 0

let Projects = [];
if (get() === null)
{
    Projects = [];
}
else
{
    Projects = get();
}
 console.log(Projects.length);


function add_new_project (projects)
{
    
    
    let NewTR = Tbody_project.insertRow();
    let Td_name_project = NewTR.insertCell();
    let Td_min_project = NewTR.insertCell();
    let actionsTd = NewTR.insertCell();
    
    let hodiny = projects.min / 60;

    Td_name_project.innerHTML = projects.name_project;
    Td_min_project.innerHTML =  Math.round(hodiny * 10) / 10 + " h";
    

    
    let editBtn = document.createElement("div");
    editBtn.innerHTML = "";
    editBtn.className = "fa fa-pencil";
    editBtn.dataset.id = projects.id;
   
    if (projects.id > max_id)
    {
        max_id = projects.id;
    }

    editBtn.addEventListener('click', function (e)
    {
        EditRow(e.target.dataset.id);
    });
    actionsTd.appendChild(editBtn);
    
    
}


function Pender_Projects()
{
    Tbody_project.innerHTML = "";
    for (var i in Projects)
    {
        let p = Projects[i];
        add_new_project(p, i);

        
    }
}
Pender_Projects();





btn_project.addEventListener("click", function()
{
    
    if(INP_project_name.value !== "") {
        if(Projects.length <= 9){
            let newProject = {
                name_project: INP_project_name.value,
                min: 0
        
            };
           
            if (INP_hidden.value >= 0)
            {
                let existingZam = getZam(INP_hidden.value);
                let index = Projects.indexOf(existingZam);
                newProject.id = INP_hidden.value;
                
                
                Projects[index] = newProject;
                
            } else
            {
                newProject.id = ++max_id;
                Projects.push(newProject);
            }
            
            INP_project_name.value = "";
            INP_hidden.value = "-1";
        
            save();
        
            Pender_Projects();
        }else {
            alert("Naše kapacita projektů je plná");
        }
        
    } else {
        alert("Název projektu nesmí být prázdný");
    }
    
    
    
});


function save()
{
    let Projects_save = JSON.stringify(Projects);
    localStorage.setItem("Projekty", Projects_save);
}
function get()
{
    let ProjectsJSON_get = localStorage.getItem("Projekty");
    return JSON.parse(ProjectsJSON_get);
}

function EditRow(id)
{
    let text = getZam(id);

    INP_project_name.value = text.name_project;

    INP_hidden.value = id;
}

function getZam(id)
{
    for (let i in Projects)
    {
        if (Projects[i].id == id)
        {
            return Projects[i];
        }
    }
    return null;
}





