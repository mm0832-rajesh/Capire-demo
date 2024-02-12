sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, JSONModel, ODataModel) {
    "use strict";

    return Controller.extend("frontend.controller.DepartmentDetails", {
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("DepartmentDetails").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var sDepartmentId = oEvent.getParameter("arguments").DepartmentId;
            this.getView().bindElement({
                path: "/Departments('" + sDepartmentId + "')",
                model: "bookshop"
            });

            // For associated employees
            this.getView().bindElement({
                path: "/Departments('" + sDepartmentId + "')",
                model: "bookshop",
                parameters: {
                    expand: "Employee"
                }
            });
        },
        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Departments");
        }
    });
});
