"use strict";

//ZAMESTNANCI
let INP_name_zam = document.getElementById("name_zam");
let INP_surname_zam = document.getElementById("surname_zam");
let INP_kc_zam = document.getElementById("kc_zam");
let INP_hidden = document.getElementById("zamestnanecIndex");

let Tbody_zam = document.querySelector("tbody#workers");

let btn_pridat = document.getElementById("workers_");

let max_id = -1;

let Zamestnanci = [];
if (get() === null) {
    Zamestnanci = [];
} else
{
    Zamestnanci = get();
}

btn_pridat.addEventListener("click", function ()
{
    if(INP_name_zam.value && INP_surname_zam.value && INP_kc_zam.value !== ""){
        if(Zamestnanci.length <= 9) {
            let newZam = {
                name: INP_name_zam.value,
                surname: INP_surname_zam.value,
                kc: INP_kc_zam.value
            };
            
            if (INP_hidden.value >= 0)
            {
                let existingZam = getZam(INP_hidden.value);
                let index = Zamestnanci.indexOf(existingZam);
                newZam.id = INP_hidden.value;
                
                Zamestnanci[index] = newZam;
                
            } else
            {
                newZam.id = ++max_id;
                Zamestnanci.push(newZam);
            }
            
            
        
            INP_name_zam.value = "";
            INP_surname_zam.value = "";
            INP_kc_zam.value = "";
            INP_hidden.value = "-1";
        
            save();
        
            RenderZam();
        } else {
            alert("Naše kapacita zaměstnanců je plná");
        }
        
    } else {
        alert("Všechny pole nejsou správně vyplněny");
    }

});

function RenderZam()
{
    Tbody_zam.innerHTML = "";
    for (var i in Zamestnanci)
    {
        let p = Zamestnanci[i];
        add_new_zam(p);
    }
}


function add_new_zam(Zamestnanci)
{


    let newTr = Tbody_zam.insertRow();
    let Tdname = newTr.insertCell();
    let TdSurname = newTr.insertCell();
    let Tdkc = newTr.insertCell();
    let actionsTd = newTr.insertCell();

    Tdname.innerHTML = Zamestnanci.name;
    TdSurname.innerHTML = Zamestnanci.surname;
    Tdkc.innerHTML = Zamestnanci.kc;

    let editBtn = document.createElement("div");
    editBtn.innerHTML = "";
    editBtn.className += "fa fa-pencil";
//    editBtn.classList.remove("table");
    editBtn.dataset.id = Zamestnanci.id;
    
    if (Zamestnanci.id > max_id) {
        max_id = Zamestnanci.id;
    }

    editBtn.addEventListener('click', function (e)
    {
        EditRow(e.target.dataset.id);
    });
    actionsTd.appendChild(editBtn);



}
RenderZam();


function save()
{
    let Save_Zam = JSON.stringify(Zamestnanci);
    localStorage.setItem("Zamestnanci", Save_Zam);
}
function get()
{
    let Get_Zam = localStorage.getItem("Zamestnanci");
    return JSON.parse(Get_Zam);
}

function EditRow(id)
{
    let text = getZam(id);

    INP_name_zam.value = text.name;
    INP_surname_zam.value = text.surname;
    INP_kc_zam.value = text.kc;
    
    INP_hidden.value = id;
}

function getZam(id)
{
    for (let i in Zamestnanci)
    {
        if (Zamestnanci[i].id == id)
        {
            return Zamestnanci[i];
        }
    }
    return null;
}













