import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";

describe("[Integration] 직원 모델을 테스트 한다", () => {

	before((done: Function) => {
		sequelize.sync().then(() => {
			done();
		}).catch((error: Error) => {
			done(error);
		});
	});

	it('직원을 추가한다', (done: Function) => {
		const employee = new Employee({name: 'test'});
		employee.save().then(test => {
			Employee.findAll<Employee>().then(employees => {
				expect(test.name).to.be.eql(employees[0].name);
				done();
			});
		});
	});
});