// const cds = require('@sap/cds');
import cds from '@sap/cds'
const { Employee } = cds.entities;
const db = cds.connect.to('db');

// module.exports = cds.service.impl(srv => {
//     srv.before('READ', 'Employee', capitalizename);
// });
export default cds.service.impl(srv => {
    // srv.before('READ', 'Employee', capitalizename);
    srv.on('CREATE', 'Employee', createEmployee);
    srv.before('READ', 'Employee', capitalizename);
});

async function createEmployee(req) {
    console.log(req);
}

async function capitalizename(req) {
    let db_data = "SELECT * " +
        "FROM MY_BOOKSHOP_EMPLOYEE as emp " +
        "WHERE emp.ID = " + 1;
    let content = await cds.run(db_data);
    console.log(content);
    // console.log("Done");

}