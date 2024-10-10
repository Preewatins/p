import { fetchData } from "@remix-run/react/dist/data";
import { useState, useEffect } from "react";
import PetFrom from "./lab02.petForm";

export default function HerbLists(){
    const [loadStatus, setLoadStatus] = useState(true);
    const [petsData, setPetsData] = useState(true);

    useEffect(()=>{
        try {
            const handleSubmit = async() => {
                const pets = await fetch(
                    'https://localhost:3004/api/getPets'
                );
                if(pets.ok){
                    const petsJson = await pets.json();
                    setPetsData(petsJson);
                }else{
                    alert('[ERR] Unable to read data.');
                }
            }
            fetchData().catch(console.error);
            setLoadStatus(false);
            console.log('Fetch pets data.');
        } catch (error) {
            alert('[ERR] An error occurs when reading the data.');
        }
    }, [loadStatus]);

    const handleDelete = ([]) => {
        try {
            const fetchData = async() => {
                const petData = await fetch(
                    `http://https://localhost:3004/api/deletPets/${petsData}`,
                    { 
                        method: 'POST'
                    }
                );
                if(petData.ok){
                    const myJson = await petData.json();
                    alert(myJson.message);
                }else{
                    alert('[ERR] An error when deleting data.');
                }
            } 
            fetchData();
            setLoadStatus(true);
        } catch (error) {
            alert('[ERR] An error occurs when deleting the data.');
        }
    }
    
    return (
    <div className="m-3">
        <a href='/lab02/petLists'>[ เพิ่มข้อมูลสัตว์เลี้ยง ]</a>
        <h1 className="font-bold">รายการสัตว์เลี้ยง</h1>
        {
            petsData.map((item, index) => 
            <div key={index}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสัตว์เลี้ยง: {item.petName}<br/>
                    ประเภท: {item.petType}<br/>
                    วันเกิด: {item.petBD}<br/>
                    เจ้าของ: {item.petOwner}<br/>
                </div>
                <div className="p-2 m-2">
                    <a href={`/lab02/petDetail/${item.petNote}`}>[ รายละเอียด ]</a>
                    <a href={`/lab02/EditForm/${item.petId}`}>[ แก้ไข ]</a>
                    <a href="#" onClick={(e) => handleDelete(`${item}`)}>[ ลบ ]</a>
                </div>
            </div>
            )
        }
    </div>
    );
}