// const cds = require('@sap/cds');
import cds from "@sap/cds";
const { Employee } = cds.entities;
const db = cds.connect.to("db");

// module.exports = cds.service.impl(srv => {
//     srv.before('READ', 'Employee', capitalizename);
// });
export default cds.service.impl((srv) => {
  // srv.before('READ', 'Employee', capitalizename);
  // srv.on('CREATE', 'Employee', createEmployee);
//   srv.before("READ", "Employee", insertDat);
//   srv.before("READ", "Employee", updateData);
  srv.before("READ", "Employee", deleteData);
  srv.after("READ", "Employee", capitalizename);
});

// async function createEmployee(req) {
//     console.log(req);
// }

async function insertDat(req) {
  let res = "insert into MY_BOOKSHOP_EMPLOYEE (id,enam) values (34,'Ram');";
  await cds.run(res);
}

async function updateData(req) {
  let res = "update MY_BOOKSHOP_EMPLOYEE set job='nope' where id=1;";
  await cds.run(res);
}

async function deleteData(req) {
  let res = "delete from MY_BOOKSHOP_EMPLOYEE where id=534;";
  await cds.run(res);
}

async function capitalizename(req) {
  let db_data = "select * from MY_BOOKSHOP_EMPLOYEE;";
  let content = await cds.run(db_data);
  console.log(content);
  console.log(req);
  // console.log("Done");
}
