namespace my.bookshop;

type Gender : String enum {
  male;
  female;
  non_binary = 'non-binary';
}

type Amount {
  value    : Decimal(10, 3);
  currency : String;
}

entity Books {
  key id    : Integer;
      title : String;
      stock : Integer;
}

entity Employee {
  key id         : Integer;
      companyId  : Integer;
      eNam       : String;
      job        : String;
      sal        : Amount;
      email      : many {
        kind : String;
        add  : String
      };
      company    : String default 'Maventic' not null;
      lName      : type of eNam;
      gen        : Gender;
      // employeeCompany: Association to Company;
      // empCompany : Association to Company
      //                on empCompany.cId = companyId;
      courses: Composition of many EmployeeCourse on courses.employee = $self;
}

entity Company {
  key cId       : Integer;
      cName     : String default 'Maventic';
      // employee: Association to Employee;
      // employees : Association to many Employee
      //               on employees.companyId = $self.cId;
}

entity Course {
  key couId: Integer;
  cName: String default 'Programing';
  employee: Composition of many EmployeeCourse on employee.course = $self;
}

entity EmployeeCourse {
  employee: Association to Employee;
  course: Association to Course;
}
