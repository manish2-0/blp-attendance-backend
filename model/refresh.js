const queryExecuter = require('../helper/queryExecuter');

exports.checkRefresh = async (refreshToken) => {
    const query = "SELECT * FROM refresh WHERE refresh_token = ?";
    const response = await queryExecuter(query, [refreshToken]);
    if(response.status && response.data !== undefined){
        return true;
    }
    else{
        return false;
    }
}

exports.saveRefresh = async (admin_id, refreshToken, createdAt, expiryAt) => {
    const query = `INSERT INTO refresh (admin_id, refresh_token, generated_at, expired_at) VALUES ('${admin_id}', '${refreshToken}', '${createdAt}', '${expiryAt}')`;
    const response = await queryExecuter(query);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.deleteRefresh = async (refreshToken) => {
    const query = `DELETE FROM refresh WHERE refresh_token = ?`;
    const response = await queryExecuter(query, [refreshToken]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}