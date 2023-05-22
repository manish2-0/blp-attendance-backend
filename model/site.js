const queryExecuter = require('../helper/queryExecuter');
const date = require('date-and-time');

async function generateSiteCode(){
    let num = 227;
    const response = await queryExecuter("SELECT COUNT(site_code) as count FROM site");
    const count = response.data[0].count;
    num = num + count;
    return num;
}

exports.register = async (siteName) => {
    let now = new Date();
    const created_at= date.format(now, 'YYYY-MM-DD');
    const siteCode = await generateSiteCode();
    const qry = `INSERT INTO site (site_name, site_code, status, date) VALUES ('${siteName}','${siteCode}','Ongoing','${created_at}')`;
    const resp = await queryExecuter(qry);
    if(resp.status){
        return true;
    }
    else{
        return false;
    }
}

exports.updateSite = async (siteName, status, site_code) => {
    const query = "UPDATE site SET site_name = ?, status = ? WHERE site_code = ?";
    const response = await queryExecuter(query, [siteName, status, site_code]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.siteCodeCheck = async (site_code) => {
    const query = "SELECT site_code FROM site WHERE site_code = ?";
    const response = await queryExecuter(query, [site_code]);
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
    const query = "SELECT * FROM site";
    const response = await queryExecuter(query);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Site Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.readAllPending = async () => {
    const query = "SELECT * FROM site WHERE status = 'Ongoing'";
    const response = await queryExecuter(query);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Site Found";
        }
        return response;
    }
    else{
        return response;
    }
}