

let ConnUtils = require('./tools/ConnUtils');


getUserName(userID)=Function getUserName(userID){
		
			let mysql_conn = ConnUtils.get_mysql_client();

			let query_str =
				"SELECT name " +
				"FROM hy_users " +
				"WHERE (userID = ?) " +
				"LIMIT 1 ";

			let query_var = ['121'];

			var query = mysql_conn.query(query_str, query_var, function (err, rows, fields) {
				//if (err) throw err;
				if (err) {
					//throw err;
					console.log(err);
					logger.info(err);
					reject(err);
				}
				else {
					resolve(rows);
					console.log(rows);
					return results[0].name;
				}
			}

}



module.exports = {
    users: getUserName(userID),
};