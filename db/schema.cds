namespace com.satinfotech.school;
using { managed,cuid } from '@sap/cds/common';

entity School : managed {
    key ID : UUID;
    @title: 'School Name'
    school_name: String(20);
    @title: 'School ID'
    school_ID: String(20);
    @title: 'Address'
    address: String(20);
    @title: 'no of classes'
    no_of_classes: Integer;
    @title: 'no of teachers'
    no_of_teachers: Integer;
}
entity Student : cuid {
                key ID    : UUID;

                    @title: 'student ID'
                    pid   : Association to one School;

                    name          : String(100);
                    
              }
