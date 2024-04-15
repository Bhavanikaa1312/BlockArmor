// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract SoldierContract {
    struct Soldier {
        string ID;
        string Name;
        PersonalInformation personalInformation;
        string Position;
        string Specialization;
    }

    struct PersonalInformation {
        string DateOfBirth;
        string BloodGroup;
        string PhoneNumber;
        string Address;
        string IdentityMarks;
    }

    struct Operation {
        string Solid;
        string OperationName;
        string Status;
        string Result;
        string Note;
    }

    mapping(string => Soldier) soldiers;
    mapping(string => Operation) operations;

    function addSoldier(
        string memory _id,
        string memory _name,
        string memory _dob,
        string memory _bloodGroup,
        string memory _phoneNumber,
        string memory _address,
        string memory _identityMarks,
        string memory _position,
        string memory _specialization
    ) external {
        soldiers[_id] = Soldier(_id, _name, PersonalInformation(_dob, _bloodGroup, _phoneNumber, _address, _identityMarks), _position, _specialization);
    }

    function addOperation(
        string memory _soldierId,
        string memory _operationName,
        string memory _status,
        string memory _result,
        string memory _note
    ) external {
        operations[_soldierId] = Operation(_operationName, _result, _soldierId, _status, _note);
    }

    function getSoldier(string memory _id) external view returns (
        string memory,
        string[6] memory,
        string[4] memory
    ) {
        Soldier memory soldier = soldiers[_id];
        Operation memory operation = operations[_id];

        string[6] memory personalInformationData = [
            soldier.personalInformation.DateOfBirth,
            soldier.personalInformation.BloodGroup,
            soldier.personalInformation.PhoneNumber,
            soldier.personalInformation.Address,
            soldier.personalInformation.IdentityMarks,
            soldier.ID
        ];

        string[4] memory operationData = [
            operation.OperationName,
            operation.Status,
            operation.Result,
            operation.Note
        ];

        return (
            soldier.Name,
            personalInformationData,
            operationData
        );
    }
}