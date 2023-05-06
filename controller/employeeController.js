const employee = require("../model/employee");

exports.register = async (req, res) => {
    const employeeDetails = {};
    employeeDetails.name = req.body.name;
    employeeDetails.rate = req.body.rate;
    employeeDetails.aadhar = req.body.aadhar;
    employeeDetails.pan = req.body.pan;
    employeeDetails.designation = req.body.designation;
    employeeDetails.address = req.body.address;
    employeeDetails.contact = req.body.contact;
    employeeDetails.bank_name = req.body.bank_name;
    employeeDetails.acc_no = req.body.acc_no;
    employeeDetails.ifsc = req.body.ifsc;
    employeeDetails.bank_branch = req.body.bank_branch;
    employeeDetails.third_person = req.body.third_person;
    employeeDetails.supervisor = req.body.supervisor;
    employeeDetails.doj = req.body.doj;
    employeeDetails.dob = req.body.dob;
    employeeDetails.pf = req.body.pf;
    employeeDetails.esic = req.body.esic;
    employeeDetails.pt = req.body.pt;
    let flag = true;
    let error = "Please Enter All Details";
    if (!employeeDetails.name) {
        flag = false;
    }
    if (flag && !employeeDetails.rate) {
        flag = false;
    }
    if (flag && !employeeDetails.aadhar) {
        flag = false;
    }
    if (flag) {
        const check = await employee.aadharCheck(employeeDetails.aadhar);
        if (check) {
            const response = await employee.register(employeeDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Employee Registered Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else {
            res.status(200).json({ status: false, message: "Aadhar Already Exist" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.update = async (req, res) => {
    const { er_no } = req.params;
    const employeeDetails = {};
    employeeDetails.name = req.body.name;
    employeeDetails.rate = req.body.rate;
    employeeDetails.aadhar = req.body.aadhar;
    employeeDetails.pan = req.body.pan;
    employeeDetails.designation = req.body.designation;
    employeeDetails.address = req.body.address;
    employeeDetails.contact = req.body.contact;
    employeeDetails.bank_name = req.body.bank_name;
    employeeDetails.acc_no = req.body.acc_no;
    employeeDetails.ifsc = req.body.ifsc;
    employeeDetails.bank_branch = req.body.bank_branch;
    employeeDetails.third_person = req.body.third_person;
    employeeDetails.supervisor = req.body.supervisor;
    employeeDetails.doj = req.body.doj;
    employeeDetails.dob = req.body.dob;
    employeeDetails.pf = req.body.pf;
    employeeDetails.esic = req.body.esic;
    employeeDetails.pt = req.body.pt;

    const check = await employee.ernoCheck(er_no);
    if (check) {
        const response = await employee.updateEmployee(er_no, employeeDetails);
        if (response) {
            res.status(200).json({ status: true, message: "Employee Updated Successfully" });
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: "Invalid ER No" });
    }
}

exports.getAll = async (req, res) => {
    const employees = await employee.readAll();
    if (employees.status) {
        if (employees.data === undefined) {
            res.status(200).json({ status: true, message: employees.message });
        }
        else {
            res.status(200).json({ status: true, data: employees.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: employees.error });
    }
}

exports.getOne = async (req, res) => {
    const { er_no } = req.params;
    const check = await employee.ernoCheck(er_no);
    if (check) {
        const employees = await employee.readOne(er_no);
        if (employees.status) {
            if (employees.data === undefined) {
                res.status(200).json({ status: true, message: employees.message });
            }
            else {
                res.status(200).json({ status: true, data: employees.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: employees.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: "Invalid ER No" });
    }
}