import {sequelize} from "../models/index";

export default class DbUtils {

	static syncRun(): void {
		//todo : 이거 옵션에서 설정되는데 왜 안되는지 확인해보기
		sequelize.sync({force: true})
			.then(function (err) {
				console.log('DB LOAD');
			}, function (err) {
				console.log('An error occurred while creating the table:', err);
			});
	}
}