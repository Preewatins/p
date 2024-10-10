import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import Result from "postcss/lib/result";
import { stringify } from "postcss";

export default function PetFrom(){
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.target();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        try { 
            const resPet = await fetch(
                'https://localhost:3004/api/addPetById',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Result)
                }
            );

            if(resPet.ok){
                const data = await resPet.json();
                alert(`${data.message}`);
                navigate('/lab02/petList');
            }else{
                alert('[ERR] Failed to update the form.');
            }

        } catch (error) {
            alert('[ERR] An error occurred while updatting the form.');
        }
    }

    return (
    <div className="m-3">
        <a href='/lab02/petLists'>[ ข้อมูลสัตว์เลี้ยง ]</a> 
        <h1 className="font-bold">เพิ่มข้อมูลสัตว์เลี้ยง</h1>
        <form method="POST" onSubmit={PetFrom}>
        <label>ชื่อสัตว์เลี้ยง (*):</label><br/>
        <input type="text" name="petName" className="border rounded-lg p-2 w-1/2" required /><br/>
        <label>รายละเอียด</label><br/>
        <textarea rows={3} cols={50} name="petNote" className="border rounded-lg p-2 w-1/2" /><br/>
        <label>ประเภท (*)</label>:<br />
        <select name="petType" id="petType" className="border rounded-lg p-2 w-1/2" required>
            <option value="">-เลือกประเภท-</option>
            <option value={10}>สุนัข</option>
            <option value={20}>แมว</option>
            <option value={30}>ฮิปโป</option>
            <option value={40}>นก</option>
            <option value={50}>อื่น ๆ</option>
        </select><br />
        <label>วันเกิด (*)</label>:<br />
        <textarea rows={3} cols={50} name="petBD" id="petBD" className="border rounded-lg p-2 w-1/2" required /><br />
        <label>ชื่อเจ้าของ (*)</label>:<br />
        <input type="text" name="petName" id="petName" className="border rounded-lg p-2 w-1/2" placeholder="ระบุชื่อ-สกุลนักศึกษา" required /><br />
        <button type="submit">[ บันทึก ]</button>
        <button type="reset">[ เคลียร์ ]</button>
        </form>
    </div>
    );
}