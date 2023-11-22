const cash = require("../model/cash");

exports.register = async (req, res) => {
    const cashDetails = {};
    cashDetails.name = req.body.name;
    cashDetails.date = req.body.date;
    cashDetails.present = req.body.present;
    cashDetails.site_code = req.body.site_code;
    cashDetails.rate = req.body.rate;
    cashDetails.food = req.body.food;
    cashDetails.time = req.body.time;
    cashDetails.remarks = req.body.remarks;
    cashDetails.marked_by = req.admin_id;
    let flag = true;
    let error = "Please Enter All Details";
    if (!cashDetails.name) {
        flag = false;
    }
    if (flag && !cashDetails.date) {
        flag = false;
    }
    if (flag && !cashDetails.present) {
        flag = false;
    }
    if (flag && !cashDetails.site_code) {
        flag = false;
    }
    if (flag && !cashDetails.rate) {
        flag = false;
    }
    if (flag && !cashDetails.food) {
        flag = false;
    }
    if (flag && !cashDetails.time) {
        flag = false;
    }
    if (flag && !cashDetails.remarks) {
        flag = false;
    }
    if (flag) {
        const response = await cash.register(cashDetails);
        if (response) {
            res.status(200).json({ status: true, message: "Cash registered Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.update = async (req, res) => {
    const { sr_no } = req.params;
    const cashDetails = {};
    cashDetails.name = req.body.name;
    cashDetails.date = req.body.date;
    cashDetails.present = req.body.present;
    cashDetails.site_code = req.body.site_code;
    cashDetails.rate = req.body.rate;
    cashDetails.food = req.body.food;
    cashDetails.time = req.body.time;
    cashDetails.remarks = req.body.remarks;
    let flag = true;
    let error = "Please Enter All Details";
    if (!cashDetails.name) {
        flag = false;
    }
    if (flag && !cashDetails.date) {
        flag = false;
    }
    if (flag && !cashDetails.present) {
        flag = false;
    }
    if (flag && !cashDetails.site_code) {
        flag = false;
    }
    if (flag && !cashDetails.rate) {
        flag = false;
    }
    if (flag && !cashDetails.food) {
        flag = false;
    }
    if (flag && !cashDetails.time) {
        flag = false;
    }
    if (flag && !cashDetails.remarks) {
        flag = false;
    }
    if (flag) {
        const check = await cash.cashIdCheck(sr_no);
        if (check) {
            const response = await cash.updateCash(sr_no, cashDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Cash updated Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else {
            res.status(200).json({ status: false, message: "Invalid srno" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.generateReport = async (req, res) => {
    const fromDate = req.body.from;
    const toDate = req.body.to;
    let flag = true;
    let error = "Please Enter Both Dates";
    if (!fromDate) {
        flag = false;
    }
    if (flag && !toDate) {
        flag = false;
    }
    if (flag) {
        const report = await cash.getReport(fromDate, toDate);
        if (report.status) {
            if (report.data === undefined) {
                res.status(200).json({ status: true, message: report.message });
            }
            else {
                res.status(200).json({ status: true, data: report.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: report.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getCashAdmin = async (req, res) => {
    const date = req.body.date;
    let flag = true;
    let error = "Please Enter Date";
    if (!date) {
        flag = false;
    }
    if (flag) {
        const cashes = await cash.readCashAdmin(date);
        if (cashes.status) {
            if (cashes.data === undefined) {
                res.status(200).json({ status: true, message: cashes.message });
            }
            else {
                res.status(200).json({ status: true, data: cashes.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: cashes.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getCashSupervisor = async (req, res) => {
    const fromDate = req.body.from;
    const toDate = req.body.to;
    const marked_by = req.admin_id;
    let flag = true;
    let error = "Please Enter Both Dates";
    if (!fromDate) {
        flag = false;
    }
    if (flag && !toDate) {
        flag = false;
    }
    if (flag) {
        const cashes = await cash.readCashSupervisor(fromDate, toDate, marked_by);
        if (cashes.status) {
            if (cashes.data === undefined) {
                res.status(200).json({ status: true, message: cashes.message });
            }
            else {
                res.status(200).json({ status: true, data: cashes.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: cashes.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}


exports.deleteCash = async (req, res) => {
    const id = req.params.id;
    const response = await cash.deleteCashAttendance(id);
    if (response) {
        res.status(200).json({ status: true, message: "Entry deleted Successfully" })
    }
    else {
        res.status(200).json({ status: false, message: "Something Went Wrong" });
    }
}

// exports.getCashSupervisor = async (req, res) => {
//     const date = req.body.date;
//     const marked_by = req.admin_id;
//     let flag = true;
//     let error = "Please Enter Date";
//     if (!date) {
//         flag = false;
//     }
//     if (flag) {
//         const cashes = await cash.readCashSupervisor(date, marked_by);
//         if (cashes.status) {
//             if (cashes.data === undefined) {
//                 res.status(200).json({ status: true, message: cashes.message });
//             }
//             else {
//                 res.status(200).json({ status: true, data: cashes.data });
//             }
//         }
//         else {
//             res.status(200).json({ status: false, message: cashes.error });
//         }
//     }
//     else {
//         res.status(200).json({ status: false, message: error });
//     } 
// }