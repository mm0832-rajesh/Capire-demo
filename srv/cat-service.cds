using my.bookshop as my from '../db/data-model';

service CatalogService {
    // @readonly entity Books as projection on my.Books;
    //   entity Employee as projection on my.Employee;
    //  @readonly entity Company as projection on my.Company;
    //  @readonly entity Course as projection on my.Course;
    //  @readonly entity EmployeeCourse as projection on my.EmployeeCourse;
     entity Employees as projection on my.Employees;
     entity Departments as projection on my.Departments;
}

