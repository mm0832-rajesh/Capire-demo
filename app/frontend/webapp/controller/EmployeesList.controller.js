sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    Fragment,
    MessageBox
  ) {
    "use strict";

    return Controller.extend("frontend.controller.EmployeesList", {
      onInit: function () {
        var oModel = new JSONModel({
          Employee_Id: "",
          Employee_First_Name: "",
          Employee_Last_Name: "",
          Employee_Phone_Number: "",
          Employee_Department_ID: "",
        });

        let AllEmployeeModel = new JSONModel();

        this.getView().setModel(oModel, "employeeModel");
        this.getView().setModel(AllEmployeeModel, "EmployeesModel");

        var that = this;

        let url =
          this.getOwnerComponent().getModel("bookshop").getServiceUrl() +
          "Employees";
        $.ajax({
          method: "GET",
          url: url,
          contentType: "application/json",
          success: function (data) {
            // console.log(data);
            that.getView().getModel("EmployeesModel").setData(data.value);
          },
          error: function (error) {
            console.log(error);
          },
        });
      },
      onNavBack: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteView1");
      },
      onSelect: function (oEvent) {
        let Emp_Id = oEvent.getSource().getTitle();
        // console.log(Emp_Id);
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("EmployeeDetails", { EmployeeId: Emp_Id });
      },
      onAddEmp: function () {
        if (!this.pDialog) {
          this.pDialog = Fragment.load({
            id: this.getView().getId(),
            name: "frontend.view.Popup",
            controller: this,
          }).then(
            function (oDialog) {
              this.getView().addDependent(oDialog);
              return oDialog;
            }.bind(this)
          );
        }
        this.pDialog.then((oDialog) => {
          oDialog.setBindingContext(
            this.getView().getModel("employeeModel").createBindingContext(),
            "employeeModel"
          );
          oDialog.open();
        });
      },

      onAddEmployee: function () {
        var oEmployeeData = this.getView().getModel("employeeModel").getData();

        // console.log("Adding employee:", oEmployeeData);

        let url =
          this.getOwnerComponent().getModel("bookshop").getServiceUrl() +
          "Employees";

        if (oEmployeeData.Employee_Id && oEmployeeData.Employee_Last_Name && (/^\d{10}$/.test(oEmployeeData.Employee_Phone_Number))) {
          $.ajax({
            method: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(oEmployeeData),
            success: function () {
              // console.log("Data Saved in OData Service");
              MessageBox.success("Employee Added ");
              this.getView().getModel("employeeModel").setData({
                Employee_Id: "",
                Employee_First_Name: "",
                Employee_Last_Name: "",
                Employee_Phone_Number: "",
                Employee_Department_ID: "",
              });
            },
            error: function (error) {
              MessageBox.error(error);
              this.getView().getModel("employeeModel").setData({
                Employee_Id: "",
                Employee_First_Name: "",
                Employee_Last_Name: "",
                Employee_Phone_Number: "",
                Employee_Department_ID: "",
              });
            },
          });
        } else {
          MessageBox.error("Error");
        }

        this.onCancelAddEmployee();
      },

      onCancelAddEmployee: function () {
        this.byId("addEmployeeDialog").close();
      },

      onSearchEmployee: function (oEvent) {
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
          const oEmployeeIdFilter = new Filter(
            "Employee_Id",
            FilterOperator.Contains,
            sQuery
          );
          aFilter.push(oEmployeeIdFilter);

          const oEmployeeNameFilter = new Filter(
            "Employee_Full_Name",
            FilterOperator.Contains,
            sQuery
          );
          aFilter.push(oEmployeeNameFilter);
        }

        const oCombinedFilter = new Filter(aFilter, false);
        // filter binding
        const oList = this.byId("EmployeesList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(oCombinedFilter);
      },

      onEmployeeDepartmentValueHelp: function (oEvent) {
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

          // console.log("Selected Department ID:", sSelectedDepartmentId);
        }
      },
    });
  }
);
