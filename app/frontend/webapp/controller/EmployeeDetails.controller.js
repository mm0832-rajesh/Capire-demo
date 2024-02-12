sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, Fragment, MessageToast) => {
    "use strict";

    return Controller.extend("frontend.controller.EmployeeDetails", {
      onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("EmployeeDetails")
          .attachPatternMatched(this._onObjectMatched, this);

        var oModel = new sap.ui.model.json.JSONModel();
        this.getView().setModel(oModel, "employeeModel");
        this._Emp_Id = null;
      },
      _onObjectMatched: function (oEvent) {
        this._Emp_Id = oEvent.getParameter("arguments").EmployeeId;
        this.getView().bindElement("/Employees/" + this._Emp_Id);

        let url =
          this.getOwnerComponent().getModel("bookshop").getServiceUrl() +
          "Employees" +
          `('${this._Emp_Id}')`;
        // console.log(url);

        // console.log(this._Emp_Id);
        let that = this;
        jQuery.ajax({
          method: "GET",
          url: url,
          success: function (data) {
            // console.log(data);
            that.setDataToModel(data);
          },
          error: function (error) {
            console.log(error);
          },
        });
      },
      setDataToModel: function (data) {
        // console.log(data);
        let oModel = this.getView().getModel("employeeModel").setData(data);
        // console.log(oModel);
      },
      onNavBack: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Employees");
      },

      onEdit: function () {
        if (!this.pDialog) {
          this.pDialog = Fragment.load({
            id: this.getView().getId(),
            name: "frontend.view.EditEmployee",
            controller: this,
          }).then(
            function (oDialog) {
              this.getView().addDependent(oDialog);
              return oDialog;
            }.bind(this)
          );
        }
        this.pDialog.then((oDialog) => {
          oDialog.open();
        });
      },
      onSaveEmployee: function () {
        let oEmployeeData = this.getView().getModel("employeeModel").getData();

        // console.log(this._Emp_Id);

        // console.log("Adding employee:", oEmployeeData);

        let url =
          this.getOwnerComponent().getModel("bookshop").getServiceUrl() +
          "Employees" +
          `('${this._Emp_Id}')`;
        // console.log(url);

        if (oEmployeeData) {
          $.ajax({
            method: "PATCH",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(oEmployeeData),
            success: function () {
              // console.log("Data Saved in OData Service");
              MessageToast.show("Employee Edited ");
            },
            error: function (error) {
              console.error(error);
            },
          });
        }

        this.onCancelEmployee();
      },

      onCancelEmployee: function () {
        this.byId("editEmployee").close();
      },
      onRequest: function () {
        if (!this._oValueHelpDialog) {
          this._oValueHelpDialog = Fragment.load({
            id: this.getView().getId(),
            name: "frontend.view.ValueHelp",
            controller: this,
          }).then(
            function (oDialog) {
              this.getView().addDependent(oDialog);
              return oDialog;
            }.bind(this)
          );
        }
        this._oValueHelpDialog.then((oDialog) => {
          oDialog.open();
        });
      },
      _onValueHelpConfirmPress: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        let empDepartment = this.getView().byId("empDepartmentId");

        if (oSelectedItem) {
          var sSelectedDepartmentId = oSelectedItem.getTitle();

          empDepartment.setValue(sSelectedDepartmentId);

          console.log("Selected Department ID:", sSelectedDepartmentId);
        }
      },
    });
  }
);
