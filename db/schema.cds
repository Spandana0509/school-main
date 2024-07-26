namespace com.satinfotech.school;

using { managed, cuid } from '@sap/cds/common';

entity School : managed {
    key ID : UUID;

    @title: 'School Name'
    school_name : String(50);

    @title: 'School ID'
    school_ID : String(20);

    @title: 'Address'
    address : String(100);

    @title: 'Number of Classes'
    no_of_classes : Integer;

    @title: 'Number of Teachers'
    no_of_teachers : Integer;
    Student : Composition of many Student on Student.school=$self;
}

entity Student : cuid, managed {
    @title: 'Student ID'
    key ID : UUID;

    @title: 'School'
    school : Association to one  School;

    @title: 'Name'
    name : String(50);
}