const firebase = require("firebase");
var xlsx = require('node-xlsx');

const firebaseConfig = {
    apiKey: "AIzaSyCgEUj5wLr9tIwkLfuwEnXrStpk8NTd4Zk",
    authDomain: "securityassessment-becd9.firebaseapp.com",
    projectId: "securityassessment-becd9",
    storageBucket: "securityassessment-becd9.appspot.com",
    messagingSenderId: "628669426050",
    appId: "1:628669426050:web:e8993a3c3af2b26f9d879b",
    measurementId: "G-P2F4RXW0Y3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const technique=[
    {id: 'TA0043', name: 'Reconnaissance'}, 
    {id: 'TA0042', name: 'Resource Development'}, 
    {id: 'TA0001', name: 'Initial Access'}, 
    {id: 'TA0002', name: 'Execution'}, 
    {id: 'TA0003', name: 'Persistence'}, 
    {id: 'TA0004', name: 'Priviledge Escalation'}, 
    {id: 'TA0005', name: 'Defense Evasion'}, 
    {id: 'TA0006', name: 'Credential Access'}, 
    {id: 'TA0007', name: 'Discovery'}, 
    {id: 'TA0008', name: 'Lateral Movement'}, 
    {id: 'TA0009', name: 'Collection'}, 
    {id: 'TA0011', name: 'Command and Control'}, 
    {id: 'TA0010', name: 'Exfiltration'}, 
    {id: 'TA0040', name: 'Impact'}
]

let techniqueMap = {}
    
const uploadTechniques = async ()=>{
    for(let i in technique){
    techniqueMap[technique[i].name] = technique[i].id
    //  await db
    //   .collection("tactics")
    //   .doc(technique[i].id)
    //   .set(technique[i])
    }
}


const uploadData = async () => {
    var obj = xlsx.parse(__dirname + '/techniques.xlsx'); // parses a file
   
    const list = obj[0].data
    var currTactic = ''
    var MainCategory= ''
    for(let i=1;i<list.length;i++){
        var techId = currTactic
        const element = list[i]  
        if(typeof(element[0])=="string"){
            techId = element[0]
            currTactic=element[0]
            MainCategory = element[1]
        }
        else{
            techId = currTactic + "." + element[0].toString().slice(2,element[0].length)
            await db
            .collection("tactics")
            .doc(techniqueMap[element[2]])
            .collection("techniques")
            .doc(techId)
            .set({
                id: techId,
                name:element[1],
                tactic:element[2],
                primeName: MainCategory
            })
        }  
    }

};

const uploadData2 = async () => {
    var obj = xlsx.parse(__dirname + '/techniques.xlsx'); // parses a file
   
    const list = obj[0].data
    var MainCategory= ''
    for(let i=1;i<list.length;i++){
        const element = list[i]  
        if(typeof(list[i+1][0])=="string" && typeof(list[i][0])=="string" ){
            console.log(element)
            await db
            .collection("tactics")
            .doc(techniqueMap[element[2]])
            .collection("techniques")
            .doc(element[0])
            .set({
                id: element[0],
                name:element[1],
                tactic:element[2],
                primeName: element[1]
            })
        } 
    }

};

uploadTechniques().then(async ()=>{ await uploadData2();})

// uploadTechniques().then(async ()=>{ await uploadData();})

