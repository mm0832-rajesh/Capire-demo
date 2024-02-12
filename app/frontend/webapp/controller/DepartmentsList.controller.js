sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("frontend.controller.DepartmentsList", {
      onInit: function () {},
      onNavBack: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteView1");
      },
      onSelectDepartment: function (oEvent) {
        let Dep_Id = oEvent.getSource().getTitle();
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("DepartmentDetails", {
          DepartmentId: Dep_Id,
        });
      },

      onSearchDepartment: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        var oFilter = new Filter({
          filters: [
            new Filter("Department_Id", FilterOperator.Contains, sQuery),
            new Filter("Department_Name", FilterOperator.Contains, sQuery),
          ],
          and: false,
        });

        var oList = this.byId("departmentsList");
        var oBinding = oList.getBinding("items");
        oBinding.filter(oFilter);
      },
    });
  }
);
