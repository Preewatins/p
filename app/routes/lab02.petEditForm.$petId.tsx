import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import PetFrom from "./lab02.petForm";

export default function PetEditForm(){
    const navigate = useNavigate();
    const myParams = useParams();
    const petId = myParams.petId;
    const [petData, setPetData] = useState({
        PetFrom
    });
    const [typeOption, setTypeOption] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData({
          ...petData,
          [name]: value
        });
    };

    useEffect(() => {
        try {
            const fetchPetData = async () => {
                const petData = await fetch(`https://localhost:3004/api/getPet/api/pets/${petId}`);
                if (petData.ok) {
                    const petJson = await petData.json();
                    setPetData(petJson.petId);
                    setPetData(petJson.petType);
                    console.log(petJson);
                } else {
                    alert('[ERR] Failed to loaded data.');
                }
            }

            fetchPetData().catch(console.error);
        } catch (error) {
            alert('[ERR] An error occurred while loading the data.');
        }
    }, []);

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(confirm('Confirm the information update?')){
        const form = e.target;
        const formData = new FormData(form);  
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        
        try {
            const resPet = await fetch('https://localhost:3004/api/updatePets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
    
            if(resPet.ok){
                const myJson = await resPet.json();
                alert(`${myJson.message}`);
                navigate('/lab02/petList');
            }else{
                alert('[ERR] Failed to update the form.');
            }
        } catch (error) {
            alert('[ERR] An error occurred while updatting the form.');
        }
        return true;
      }
    }

    return (
        <div className="m-3">
            <a href='/lab02/petLists'>[ ข้อมูลสัตว์เลี้ยง ]</a>
            <h1 className="font-bold">อัปเดตข้อมูลสัตว์เลี้ยง</h1>
            <form method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="petId" value={petId} />
            <label>ชื่อสัตว์เลี้ยง (*)</label>:<br />
            <input type="text" name="petName" id="petName" className="border rounded-lg p-2 w-1/2"
            onChange={handleChange} value={petId} required /><br />
            <label>รายละเอียด</label>:<br />
            <textarea rows={3} cols={50} name="petNote" id="petNote" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={petId}
            /><br />
            <label>ประเภท (*)</label>:<br />
            <select name="petType" id="peyType" className="border rounded-lg p-2 w-1/2"
            value={petId} onChange={handleChange} required>
                <option value="">-เลือกประเภท-</option>
                <option value={10}>สุนัข</option>
                <option value={20}>แมว</option>
                <option value={30}>ฮิปโป</option>
                <option value={40}>นก</option>
                <option value={50}>อื่น ๆ</option>
            </select><br />
            <label>วันเกิด (*)</label>:<br />
            <textarea rows={3} cols={50} name="petBD" id="petBD" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={petId} required
            /><br />
            <label>เจ้าของ</label>:<br />
            <input type="text" name="petOwner" id="petOwner" className="border rounded-lg p-2 w-1/2"
            onChange={handleChange} value={petId} /><br />
            <div className="p-3">
                <button type="submit">[ Submit ]</button>
                <button type="reset">[ Reset ]</button>
            </div>
            </form>
        </div>
    );
}