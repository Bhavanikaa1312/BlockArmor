// InputForm.js
import React, { useState } from 'react';
import Web3 from 'web3';
import SoldierContract from './contracts/SoldierContract.json';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Use your Ethereum provider URL
const contractAddress = '0x123456...'; // Your contract address
const soldierContract = new web3.eth.Contract(SoldierContract.abi, contractAddress);

function InputForm() {
    const [soldier, setSoldier] = useState({});
    const [operation, setOperation] = useState({});

    const handleSoldierChange = (e) => {
        setSoldier({ ...soldier, [e.target.name]: e.target.value });
    };

    const handleOperationChange = (e) => {
        setOperation({ ...operation, [e.target.name]: e.target.value });
    };

    const handleAddSoldier = async () => {
        await soldierContract.methods.addSoldier(
            soldier.ID,
            soldier.Name,
            soldier.PersonalInformation.DateOfBirth,
            soldier.PersonalInformation.BloodGroup,
            soldier.PersonalInformation.PhoneNumber,
            soldier.PersonalInformation.Address,
            soldier.PersonalInformation.IdentityMarks,
            soldier.Position,
            soldier.Specialization
        ).send({ from: '0xYourAddress' }); // Sender address
    };

    const handleAddOperation = async () => {
        await soldierContract.methods.addOperation(
            operation.ID,
            operation.OperationName,
            operation.Status,
            operation.Result,
            operation.Note
        ).send({ from: '0xYourAddress' }); // Sender address
    };

    return (
        <div className="soldier">
            <h2 className="sol">Add Soldier</h2>
            <input type="text" name="ID" placeholder="ID" onChange={handleSoldierChange} />
            <input type="text" name="Name" placeholder="Name" onChange={handleSoldierChange} />
            <input type="date" name="PersonalInformation.DateOfBirth" placeholder="Date of Birth" onChange={handleSoldierChange} />
            <input type="text" name="PersonalInformation.BloodGroup" placeholder="Blood Group" onChange={handleSoldierChange} />
            <input type="text" name="PersonalInformation.PhoneNumber" placeholder="Phone Number" onChange={handleSoldierChange} />
            <input type="text" name="PersonalInformation.Address" placeholder="Address" onChange={handleSoldierChange} />
            <input type="text" name="PersonalInformation.IdentityMarks" placeholder="Identity Marks" onChange={handleSoldierChange} />
            <input type="text" name="Position" placeholder="Position" onChange={handleSoldierChange} />
            <input type="text" name="Specialization" placeholder="Specialization" onChange={handleSoldierChange} />
            <button onClick={handleAddSoldier}>Add Soldier</button>

            <h2>Add Operation</h2>
            <input type="text" name="ID" placeholder="Soldier ID" onChange={handleOperationChange} />
            <input type="text" name="OperationName" placeholder="Operation Name" onChange={handleOperationChange} />
            <input type="text" name="Status" placeholder="Status" onChange={handleOperationChange} />
            <input type="text" name="Result" placeholder="Result" onChange={handleOperationChange} />
            <input type="text" name="Note" placeholder="Note" onChange={handleOperationChange} />
            <button onClick={handleAddOperation}>Add Operation</button>
        </div>
    );
}

export default InputForm;
