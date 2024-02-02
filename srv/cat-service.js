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
  srv.before("CREATE", "Employee", insertDat);
  srv.after("READ", "Employee", capitalizename);
});

// async function createEmployee(req) {
//     console.log(req);
// }

async function insertDat(req) {
  let res = "insert into MY_BOOKSHOP_EMPLOYEE (id,enam) values (20,'Ram');";
  await cds.run(res);
}

async function capitalizename(req) {
  let db_data = "select * from MY_BOOKSHOP_EMPLOYEE;";
  let content = await cds.run(db_data);
  console.log(content);
  // console.log("Done");
}
