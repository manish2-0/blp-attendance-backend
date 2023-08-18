const queryExecuter = require('../helper/queryExecuter');
const date = require('date-and-time');

exports.register = async (attendanceDetails) => {
    const qry = `INSERT INTO emp_attendance (date, er_no, attendance, site_code, time, advance, remarks, food, travelling, marked_by) VALUES ('${attendanceDetails.date}','${attendanceDetails.er_no}','${attendanceDetails.attendance}','${attendanceDetails.site_code}','${attendanceDetails.time}','${attendanceDetails.advance}','${attendanceDetails.remarks}','${attendanceDetails.food}','${attendanceDetails.travelling}','${attendanceDetails.marked_by}')`;
    const resp = await queryExecuter(qry);
    if (resp.status) {
        return true;
    }
    else {
        return false;
    }
}

exports.attendanceCheck = async (er_no, date) => {
    const query = "SELECT sr_no FROM emp_attendance WHERE er_no = ? AND date = ?";
    const response = await queryExecuter(query, [er_no, date]);
    if (response.status) {
        if (response.data === undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

exports.checkAttendanceExist = async (er_no, date) => {
    const query = "SELECT sr_no FROM emp_attendance WHERE er_no = ? AND date = ?";
    const response = await queryExecuter(query, [er_no, date]);
    if (response.status) {
        if (response.data !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

exports.updateAttendance = async (attendanceDetails) => {
    const query = "UPDATE emp_attendance SET attendance = ?, site_code = ?, time = ?, advance = ?, remarks = ?, food = ?, travelling = ?, marked_by = ? WHERE er_no = ? AND date = ?";
    const response = await queryExecuter(query, [attendanceDetails.attendance, attendanceDetails.site_code, attendanceDetails.time, attendanceDetails.advance, attendanceDetails.remarks, attendanceDetails.food, attendanceDetails.travelling, attendanceDetails.marked_by, attendanceDetails.er_no, attendanceDetails.date]);
    if (response.status) {
        return true;
    }
    else {
        return false;
    }
}

exports.read = async (er_no, month, year) => {
    const query = "SELECT * FROM emp_attendance WHERE er_no = ? AND monthname(date) = ? AND year(date) = ? ORDER BY date ASC";
    const response = await queryExecuter(query, [er_no, month, year]);
    if (response.status) {
        if (response.data === undefined) {
            response.message = "No Attendance Found";
        }
        return response;
    }
    else {
        return response;
    }
}

exports.deleteAttendance = async (id) => {
    const query = `DELETE FROM emp_attendance WHERE sr_no = ?`;
    const response = await queryExecuter(query, [id]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.getReport = async (fromDate, toDate) => {
    const query = `
    SELECT 
    EA.er_no, ED.name, ED.rate, EA.date, EA.attendance, EA.site_code, EA.time, EA.advance, EA.remarks, EA.food, EA.travelling, ED.pf, ED.esic, ED.pt
    FROM 
    emp_attendance AS EA JOIN emp_details AS ED 
    ON EA.er_no = ED.er_no 
    WHERE EA.date BETWEEN ? AND ?
    ORDER BY EA.er_no ASC, EA.date ASC`;
    const response = await queryExecuter(query, [fromDate, toDate]);
    if (response.status) {
        if (response.data === undefined) {
            response.message = "No Data Found";
        }
        return response;
    }
    else {
        return response;
    }
}

exports.readAttendanceAdmin = async (date) => {
    const query = `
    SELECT 
    EA.er_no, ED.name, ED.rate, EA.date, EA.attendance, EA.site_code, EA.time, EA.advance, EA.remarks, EA.food, EA.travelling, EA.marked_by
    FROM 
    emp_attendance AS EA JOIN emp_details AS ED 
    ON EA.er_no = ED.er_no 
    WHERE EA.date = ?
    ORDER BY EA.er_no ASC, EA.date ASC`;
    const response = await queryExecuter(query, [date]);
    if (response.status) {
        if (response.data === undefined) {
            response.message = "No Data Found";
        }
        return response;
    }
    else {
        return response;
    }
}

exports.readAttendanceSupervisor = async (date, marked_by) => {
    const query = `
    SELECT 
    EA.er_no, ED.name, ED.rate,ED.designation, EA.date, EA.attendance, EA.site_code, EA.time, EA.advance, EA.remarks, EA.food, EA.travelling, EA.marked_by
    FROM 
    emp_attendance AS EA JOIN emp_details AS ED 
    ON EA.er_no = ED.er_no 
    WHERE EA.date = ? AND EA.marked_by = ?
    ORDER BY EA.er_no ASC, EA.date ASC`;
    const response = await queryExecuter(query, [date, marked_by]);
    if (response.status) {
        if (response.data === undefined) {
            response.message = "No Data Found";
        }
        return response;
    }
    else {
        return response;
    }
}

