"use scrict";


let Select_Zam = document.getElementById("zam_vyber");
let Select_Procject = document.getElementById("projekt_vyber");
let INP_popis = document.getElementById("popis");
let add_newZam = document.getElementById("add_newZam");
let start = document.getElementById("zacatek");
let End = document.getElementById("konec");

 if (Select_Zam.value && Select_Procject.value && INP_popis.value && start.value && End.value !== 0) {
    alert("problem");
 }
let INP_rozdil = document.getElementById("rozdil");

let zamestnanci_pole = window.localStorage.getItem("Zamestnanci");



let Zamestnanci;

if (zamestnanci_pole === null)
{
    Zamestnanci = [];
}
else
{
    Zamestnanci = JSON.parse(zamestnanci_pole);
    Select_add_Zam ();
}
console.log(Zamestnanci);

let projekty_pole = window.localStorage.getItem("Projekty");
let Projekty;

if (projekty_pole === null)
{
    Projekty = [];
}
else
{
    Projekty = JSON.parse(projekty_pole);
    Select_add_Project();
}
console.log(Projekty);


let Zaznam_pole = window.localStorage.getItem("Zaznam");
let Zaznam;

if (Zaznam_pole === null)
{
    Zaznam = [];
} else
{
    Zaznam = JSON.parse(Zaznam_pole);
}

function Select_add_Zam ()
{
    for (let i in Zamestnanci)
    {
        let item = Zamestnanci[i];
        let option = document.createElement("option");
        option.innerHTML = item.name + " " + item.surname;
        Select_Zam.appendChild(option);
        option.dataset.id = Zamestnanci[i].id;
    }
}

function Select_add_Project ()
{
    for (let i in Projekty)
    {
        let item = Projekty[i];
        let option = document.createElement("option");
        option.innerHTML = item.name_project;
        Select_Procject.appendChild(option);
        option.dataset.id = Projekty[i].id;
    }
}


let date_zacatek;
let date_konec;
let date_rozdil;
let date_minuty;

function CountTime()
{
    date_zacatek = new Date(start.value);
    date_konec = new Date(End.value);
    date_rozdil = date_konec - date_zacatek;
    date_minuty = date_rozdil / 60 / 1000;
    INP_rozdil.value = date_minuty + " Minut";
    
    
};

add_newZam.addEventListener("click", function ()
{
    console.log(start.value);
    if (start.value && End.value && INP_popis.value !== "" ) {
        let minuty = date_minuty;
        for(let i in Projekty) {
            let nameproject = Projekty[Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id].name_project;
            let p = Projekty[i];
            
                console.log(p.min);
    //        console.log(Projekty[Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id].name_project);
            
    //        console.log(Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id);
            
            if (p.name_project === nameproject)
            {
                console.log(p.min);
                p.min = p.min + minuty;
                Ulozit_projekty();
            }
        
        }
    
    
    
        let add_now = new Date();
        let newRecord = {
            id_zamestanace: Select_Zam.childNodes[Select_Zam.selectedIndex].dataset.id,
            id_Project: Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id,
            note : INP_popis.value,
            start: date_zacatek,
            end: date_konec,
            minutes: date_minuty,
            add_time: add_now
        };
        
        
        console.log(add_now);
        console.log(newRecord);
        Zaznam.push(newRecord);
        Save();
        
        INP_popis.value = "";
        start.value = "";
        End.value = "";
        INP_rozdil.valur = "";
        
        Pender_Projects();
    } else {
        alert("Všechny pole musí být vyplněny");
    }

    

});

function Ulozit_projekty()
{
    let projectsStr = JSON.stringify(Projekty);
    window.localStorage.setItem("Projekty", projectsStr);
 
}

function Save()
{
	let Zaznam_pole = JSON.stringify(Zaznam);
	window.localStorage.setItem("Zaznam", Zaznam_pole);
}

let TBody_newZam = document.getElementById("new_zam");




function add_new_zam(pole)
{
//    let name_Zam = Zamestnanci[Select_Zam.childNodes[Select_Zam.selectedIndex].dataset.id].name;
//    let name_Project = Projekty[Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id].name_project;
// 

//    let number_of_zam = Select_Zam.childNodes[Select_Zam.selectedIndex].dataset.id;
//    let name_Zam = Zamestnanci[number_of_zam].name;
//    
//    let number_of_project = Select_Procject.childNodes[Select_Procject.selectedIndex].dataset.id;
//    let name_Project = Projekty[number_of_project].name_project;
    
    
    
    
    let NewTR = TBody_newZam.insertRow();
    let TD_name_project = NewTR.insertCell();
    let TD_Zamestnanec = NewTR.insertCell();
    let TD_popis = NewTR.insertCell();
    let TD_Star_job = NewTR.insertCell();
    let TD_End_job = NewTR.insertCell();
    let TD_minut = NewTR.insertCell();
    
    
    
    TD_name_project.innerHTML = Projekty[pole.id_Project].name_project; 
    TD_Zamestnanec.innerHTML = Zamestnanci[pole.id_zamestanace].name + " " + Zamestnanci[pole.id_zamestanace].surname;
    TD_popis.innerHTML = pole.note;
    TD_Star_job.innerHTML = moment(pole.start).format('MMMM Do YYYY, hh:mm:ss a');
    TD_End_job.innerHTML = moment(pole.end).format('MMMM Do YYYY, hh:mm:ss a');
    TD_minut.innerHTML = pole.minutes;
   
}


function Pender_Projects()
{
    TBody_newZam.innerHTML = "";
    for (var i in Zaznam)
    {
        let p = Zaznam[i];
        add_new_zam(p);
        
    }
}
Pender_Projects();


















