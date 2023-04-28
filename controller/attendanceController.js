const attendance = require("../model/attendance");

exports.register = async (req, res) => {
    const attendanceDetails = {};
    attendanceDetails.date = req.body.date;
    attendanceDetails.er_no = req.body.er_no;
    attendanceDetails.attendance = req.body.attendance;
    attendanceDetails.site_code = req.body.site_code;
    attendanceDetails.time = req.body.time;
    attendanceDetails.advance = req.body.advance;
    attendanceDetails.remarks = req.body.remarks;
    attendanceDetails.food = req.body.food;
    attendanceDetails.travelling = req.body.travelling;
    attendanceDetails.marked_by = req.admin_id;
    let flag = true;
    let error = "Please Enter All Details";
    if (!attendanceDetails.date) {
        flag = false;
    }
    if (flag && !attendanceDetails.er_no) {
        flag = false;
    }
    if (flag && !attendanceDetails.attendance) {
        flag = false;
    }
    if (flag && !attendanceDetails.site_code) {
        flag = false;
    }
    if (flag && !attendanceDetails.time) {
        flag = false;
    }
    if (flag && !attendanceDetails.advance) {
        flag = false;
    }
    if (flag && !attendanceDetails.remarks) {
        flag = false;
    }
    if (flag && !attendanceDetails.food) {
        flag = false;
    }
    if (flag && !attendanceDetails.travelling) {
        flag = false;
    }
    if (flag) {
        const check = await attendance.attendanceCheck(attendanceDetails.er_no, attendanceDetails.date);
        if (check) {
            const response = await attendance.register(attendanceDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Attendance Marked Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else {
            res.status(200).json({ status: false, message: "Attendance Already Marked" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.update = async (req, res) => {
    const attendanceDetails = {};
    attendanceDetails.date = req.body.date;
    attendanceDetails.er_no = req.body.er_no;
    attendanceDetails.attendance = req.body.attendance;
    attendanceDetails.site_code = req.body.site_code;
    attendanceDetails.time = req.body.time;
    attendanceDetails.advance = req.body.advance;
    attendanceDetails.remarks = req.body.remarks;
    attendanceDetails.food = req.body.food;
    attendanceDetails.travelling = req.body.travelling;
    attendanceDetails.marked_by = req.admin_id;
    let flag = true;
    let error = "Please Enter All Details";
    if (!attendanceDetails.date) {
        flag = false;
    }
    if (flag && !attendanceDetails.er_no) {
        flag = false;
    }
    if (flag && !attendanceDetails.attendance) {
        flag = false;
    }
    if (flag && !attendanceDetails.site_code) {
        flag = false;
    }
    if (flag && !attendanceDetails.time) {
        flag = false;
    }
    if (flag && !attendanceDetails.advance) {
        flag = false;
    }
    if (flag && !attendanceDetails.remarks) {
        flag = false;
    }
    if (flag && !attendanceDetails.food) {
        flag = false;
    }
    if (flag && !attendanceDetails.travelling) {
        flag = false;
    }
    if (flag) {
        const check = await attendance.checkAttendanceExist(attendanceDetails.er_no, attendanceDetails.date);
        if (check) {
            const response = await attendance.updateAttendance(attendanceDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Attendance Updated Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else {
            const response = await attendance.register(attendanceDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Attendance Updated Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.get = async (req, res) => {
    const er_no = req.body.er_no;
    const month = req.body.month;
    const year = req.body.year;
    let flag = true;
    let error = "Please Enter All Details";
    if (!er_no) {
        flag = false;
    }
    if (flag && !month) {
        flag = false;
    }
    if (flag && !year) {
        flag = false;
    }
    if (flag) {
        const attendances = await attendance.read(er_no, month, year);
        if (attendances.status) {
            if (attendances.data === undefined) {
                res.status(200).json({ status: true, message: attendances.message });
            }
            else {
                res.status(200).json({ status: true, data: attendances.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: attendances.error });
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
        const report = await attendance.getReport(fromDate, toDate);
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

exports.getAttendanceAdmin = async (req, res) => {
    const date = req.body.date;
    let flag = true;
    let error = "Please Enter Date";
    if (!date) {
        flag = false;
    }
    if (flag) {
        const attendances = await attendance.readAttendanceAdmin(date);
        if (attendances.status) {
            if (attendances.data === undefined) {
                res.status(200).json({ status: true, message: attendances.message });
            }
            else {
                res.status(200).json({ status: true, data: attendances.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: attendances.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getAttendanceSupervisor = async (req, res) => {
    const date = req.body.date;
    const marked_by = req.admin_id;
    let flag = true;
    let error = "Please Enter Date";
    if (!date) {
        flag = false;
    }
    if (flag) {
        const attendances = await attendance.readAttendanceSupervisor(date, marked_by);
        if (attendances.status) {
            if (attendances.data === undefined) {
                res.status(200).json({ status: true, message: attendances.message });
            }
            else {
                res.status(200).json({ status: true, data: attendances.data });
            }
        }
        else {
            res.status(200).json({ status: false, message: attendances.error });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    } 
}