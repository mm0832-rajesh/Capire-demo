sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("frontend.controller.View1", {
      onInit: function () {
        let Company = {
          employee: "Employees",
          department: "Departments",
        };
        var oModel = new JSONModel(Company);
        this.getView().setModel(oModel);
      },
      onNavigate: function (oEvent) {
        let EntityName = oEvent.getSource().getTitle();
        const oItem = oEvent.getSource();
        // console.log(oItem);
        const oRouter = this.getOwnerComponent().getRouter();
        if (EntityName === "Employees") {
          oRouter.navTo("Employees");
        } 
        if(EntityName === "Departments") {
          oRouter.navTo("Departments");
        }
      },
    });
  }
);
