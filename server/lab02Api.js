import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import admin from "firebase-admin";

import serviceAccount from "serviceAccountKey.json" assert { type: "json" };
// import serviceAccount from "serviceAccountKey.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(cors());
app.listen(port, ()=>{
    console.log(`Web application listening on port ${port}.`);
});

async function addPet(tmpObj){
    const petRef = db.collection('Pets').doc();
    const docRef = db.collection('Pets').doc(petRef.id);
    let tmpObj = { ...tmpPetData, petId: petRef.id };
    await docRef.set(tmpObj);
    console.log('Pet added.');
}

app.post('/api/addPet', (req, res) => {
    const { petName, petNote, petType, petBD, petOwner } = req.body;
    const tmpData = { petName, petNote, petType, petBD, petOwner };
    addPet(tmpData);
    res.status(200).json({ message: '[INFO] Add new pet successfully.' });
})

async function delectPet(petId){
    const docRef = db.collection("Pets").doc(petId);
    await docRef.delete();
    console.log('Pet deleted.');
}

app.delete('api/delectPet', (req, res) => {
    const { petId } = req.params;
    deletePet(petId);
    res.status(200).json({ message: '[INFO] Deleted pet successfully.' });
});

async function fetchPets(){
    const result = [];
    const petsRef = db.collection('Pets');
    const docRef = await petsRef.get();
    docRef.forEach(doc => {
       result.push({
        id: doc.id,
        ...doc.data()
       });
    });
    return JSON.stringify(result);
}

app.get('/api/getPets', (req, res) => {
    res.set('Content-type', 'application/json');
    fetchPets().then((jsonData) => {
        res.send(jsonData);
    }).catch((error) => {
        res.send(error);
    });
});

async function fetchPetById(petId){
    const result = [];
    const petRef = db.collection('Pets')
                     .where('petId', '==', petId);
    const docRef = await petRef.get();
    docRef.forEach(doc => {
       result.push({
        id: doc.id,
        ...doc.data()
       });
    });
    return result;
}

app.get('/api/getPetById', (req, res) => {
    const { petId } = req.params;
    res.set('Content-type', 'application/json');
    fetchPetById(petId).then((jsonData) => {
        res.send(jsonData[0]);
    }).catch((error) => {
        res.send(error);
    });
});

async function update(petId, petData){
    const docRef = db.collection('Pets').doc(petId);
    await docRef.update(petData);
    console.log('Pet updated!');
}

app.post('/api/petUpdate', (req, res) => {
    const { petId, petName, petNote, petType, petBD , petOwner } = req.body;
    updatePet(petId, { petName, petNote, petType, petBD, petOwner });
    res.status(200).json({ message: '[INFO] Pet updated successfully.'});
});
