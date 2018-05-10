
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBoDTZLGcI0rwAqsIR9woPGOn_PNhHyEnU",
    authDomain: "testproject-5c562.firebaseapp.com",
    databaseURL: "https://testproject-5c562.firebaseio.com",
    projectId: "testproject-5c562",
    storageBucket: "testproject-5c562.appspot.com",
    messagingSenderId: "304544410481"
};
firebase.initializeApp(config);
//ref msg collection (db name)
let db = firebase.database();
let dbRef = db.ref('entities');

document.getElementById("getData").addEventListener("click",get);
document.getElementById("postData").addEventListener("click",post);
document.getElementById("putData").addEventListener("click",put);
document.getElementById("deleteData").addEventListener("click",deleteData)
document.getElementById("clearData").addEventListener("click",clearValue);

//dummy object to test
let entity = {
	id :"",
	name : "",
	company : "",
	email : ""
};

//To save data in Firebase
function post(){
	entity.name = getValue("name");
	entity.company = getValue("company");
	entity.email = getValue("email");
	
	clearValue();
	
	
	if(entity.name != "" && entity.company != "" && entity.email != ""){
		let data = dbRef.push();
		data.set({
			name : entity.name,
			company : entity.company,
			email : entity.email
		});
		document.getElementById("dispData").innerHTML = "Data saved successfully..!"
		//showDetails(entity);
	}else
		alert("Fill all fields...!");
}


//To fetch data from Firebase
function get(){
	let name_field = getValue("name");
	if(name_field != "")
		dbRef.on('value', gotData, errData);
	else
		alert("Please provide 'Name' !")
}

//Retrived Data
const gotData = (data) =>{

	let details = data.val();
	let keys = Object.keys(details);
	let name_field = getValue("name");
	let flag = false;

	for(let i=0 ; i < keys.length; i++){
		let key = keys[i];
		if( name_field === details[key].name ){
			entity.id = key;
			entity.name = details[key].name;
			entity.company = details[key].company;
			entity.email = details[key].email;
			
			flag=true;
			break;
		}
	}
	//data not found
	if(!flag){
		document.getElementById("dispData").innerHTML = "No Data Found...!";
	}else{
		showDetails(entity)
		setValue("name",entity.name);
		setValue("company",entity.company);
		setValue("email",entity.email);
	}
	
}

//update data
function put() {
	entity.name=getValue("name");
	entity.company=getValue("company");
	entity.email=getValue("email");
	if(entity.id != ""){
		db.ref("entities/"+entity.id).update({
			name:entity.name,
			company:entity.company,
			email:entity.email
		});
	}else
		alert("Please provide 'Name' !");
}

const showDetails = (entity) =>{
	document.getElementById("dispData").innerHTML = "<b>Name	:</b>"+entity.name+"<hr style='width: 10px; display:inline-table;'>"+
													"<b>Company	:</b>"+entity.company+"<hr style='width: 10px; display:inline-table;'>"+
													"<b>Email	:</b>"+entity.email;	
}

const getValue = (id) => {
	return document.getElementById(id).value;
}

const setValue = (id,_val) => {
	return document.getElementById(id).value=_val;
}

const errData = (err) =>{
	console.log("Error : " + err)
}

function clearValue(){
	setValue("name","");
	setValue("company","");
	setValue("email","");
	setValue("dispData","");
	entity.id="";
}

function deleteData(){
	if(entity.id != "" && getValue("name")!= ""){
		if (confirm("Are you sure !")) {
			db.ref("entities/"+entity.id).remove();
			clearValue();
		} 		
	}
	else{
		alert("Please Display Data n Confirm !");
	}
}






