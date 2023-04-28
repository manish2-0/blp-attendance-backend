const queryExecuter = require('../helper/queryExecuter');
const date = require('date-and-time');

exports.register = async (cashDetails) => {
    const qry = `INSERT INTO cash_labour (name, date, present, site_code, rate, food, time, remarks, marked_by) VALUES ('${cashDetails.name}','${cashDetails.date}','${cashDetails.present}','${cashDetails.site_code}','${cashDetails.rate}','${cashDetails.food}','${cashDetails.time}','${cashDetails.remarks}','${cashDetails.marked_by}')`;
    const resp = await queryExecuter(qry);
    if(resp.status){
        return true;
    }
    else{
        return false;
    }
}

exports.updateCash = async (sr_no, cashDetails) => {
    const query = "UPDATE cash_labour SET name = ?, date = ?, present = ?, site_code = ?, rate = ?, food = ?, time = ?, remarks = ? WHERE sr_no = ?";
    const response = await queryExecuter(query, [cashDetails.name, cashDetails.date, cashDetails.present, cashDetails.site_code, cashDetails.rate, cashDetails.food, cashDetails.time, cashDetails.remarks, sr_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.getReport = async (fromDate, toDate) => {
    const query = `SELECT * FROM cash_labour WHERE date BETWEEN ? AND ? ORDER BY date ASC`;
    const response = await queryExecuter(query, [fromDate, toDate]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Data Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.readCashAdmin = async (date) => {
    const query = `SELECT * FROM cash_labour WHERE date = ? ORDER BY date ASC`;
    const response = await queryExecuter(query, [date]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Data Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.readCashSupervisor = async (date, marked_by) => {
    const query = `SELECT * FROM cash_labour WHERE date = ? AND marked_by = ? ORDER BY date ASC`;
    const response = await queryExecuter(query, [date, marked_by]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Data Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.cashIdCheck = async (sr_no) => {
    const query = "SELECT sr_no FROM cash_labour WHERE sr_no = ?";
    const response = await queryExecuter(query, [sr_no]);
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

