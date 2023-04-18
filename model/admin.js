const queryExecuter = require('../helper/queryExecuter');
const bcrypt = require('bcrypt');

exports.register = async (admin_id, password) => {
    const qry = "SELECT * FROM admin_details WHERE BINARY admin_id = ?";
    const resp = await queryExecuter(qry, [admin_id]);
    if(resp.status){
        if(resp.data === undefined){
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = `INSERT INTO admin_details (admin_id, password) VALUES ('${admin_id}', '${hashedPassword}')`;
            const response = await queryExecuter(query);
            response.message = "Admin Successfully Registered";
            return response;
        }
        else{
            resp.message = "Admin Already Registered";
            return resp
        }
    }
    else{
        return resp;
    }
}

exports.login = async (admin_id, password) => {
    const qry = "SELECT * FROM admin_details WHERE BINARY admin_id = ?";
    const resp = await queryExecuter(qry, [admin_id]);
    if(resp.status){
        if(resp.data === undefined){
            resp.message = "No Such Admin Exists";
            return resp;
        }
        else{
            const hashedPassword = resp.data[0].password;
            const check = bcrypt.compareSync(password, hashedPassword);
            if(check){
                resp.check = check;
                resp.message = "Admin Logged In Successfully";
                return resp;
            }
            else if(!check){
                resp.message = "Wrong Password Please Check Again";
                return resp;
            }
        }
    }
    else{
        return resp;
    }
}

exports.checkAdmin = async (admin_id) => {
    const qry = "SELECT role FROM admin_details WHERE BINARY admin_id = ?";
    const resp = await queryExecuter(qry, [admin_id]);
    if(resp.status){
        if(resp.data === undefined){
            resp.status = false;
            return resp;
        }
        else{
            return resp;
        }
    }
    else{
        return resp;
    }
}