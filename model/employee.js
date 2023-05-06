const queryExecuter = require('../helper/queryExecuter');

async function generateERNO(){
    let num = 0001;
    const response = await queryExecuter("SELECT COUNT(er_no) as count FROM emp_details");
    const count = response.data[0].count;
    num = num + count;
    num = num.toString().padStart(4, '0');
    let id = "ER" + num;
    return id;
}

exports.register = async (employeeDetails) => {
    const er_no = await generateERNO();
    const qry = `INSERT INTO emp_details (er_no, name, rate, aadhar, pan, designation, address, contact, bank_name, acc_no, ifsc, bank_branch, third_person, supervisor, doj, dob, pf, esic, pt) VALUES ('${er_no}','${employeeDetails.name}','${employeeDetails.rate}','${employeeDetails.aadhar}','${employeeDetails.pan}','${employeeDetails.designation}','${employeeDetails.address}','${employeeDetails.contact}','${employeeDetails.bank_name}','${employeeDetails.acc_no}','${employeeDetails.ifsc}','${employeeDetails.bank_branch}','${employeeDetails.third_person}','${employeeDetails.supervisor}','${employeeDetails.doj}','${employeeDetails.dob}','${employeeDetails.pf}','${employeeDetails.esic}','${employeeDetails.pt}')`;
    const resp = await queryExecuter(qry);
    if(resp.status){
        return true;
    }
    else{
        return false;
    }
}

exports.updateEmployee = async (er_no, employeeDetails) => {
    const query = "UPDATE emp_details SET name = ?, rate = ?, pan = ?, designation = ?, address = ?, contact = ?, bank_name = ?, acc_no = ?, ifsc = ?, bank_branch = ?, third_person = ?, supervisor = ?, doj = ?, dob = ?, pf = ?, esic = ?, pt = ? WHERE er_no = ?";
    const response = await queryExecuter(query, [employeeDetails.name, employeeDetails.rate, employeeDetails.pan, employeeDetails.designation, employeeDetails.address, employeeDetails.contact, employeeDetails.bank_name, employeeDetails.acc_no, employeeDetails.ifsc, employeeDetails.bank_branch, employeeDetails.third_person, employeeDetails.supervisor, employeeDetails.doj, employeeDetails.dob, employeeDetails.pf, employeeDetails.esic, employeeDetails.pt, er_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.aadharCheck = async (aadhar) => {
    const query = "SELECT aadhar FROM emp_details WHERE aadhar = ?";
    const response = await queryExecuter(query, [aadhar]);
    if(response.status){
        if(response.data === undefined){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

exports.ernoCheck = async (er_no) => {
    const query = "SELECT er_no FROM emp_details WHERE BINARY er_no = ?";
    const response = await queryExecuter(query, [er_no]);
    if(response.status){
        if(response.data === undefined){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}

exports.readAll = async () => {
    const query = "SELECT * FROM emp_details";
    const response = await queryExecuter(query);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Employee Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.readOne = async (er_no) => {
    const query = "SELECT * FROM emp_details WHERE er_no = ?";
    const response = await queryExecuter(query, [er_no]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Employee Found";
        }
        return response;
    }
    else{
        return response;
    }
}