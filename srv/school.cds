using { com.satinfotech.school as db } from '../db/schema';

service school {
    entity School as projection on db.School;
    entity Student as projection on db.Student;
    action ExcelUpload(mimeType: String, fileName: String, fileContent: String, fileExtension: String) returns Boolean;
}

annotate school.School with @odata.draft.enabled;

annotate school.School with @(
    UI.LineItem: [
        {
            Label: 'School Name',
            Value: school_name
        },
        {
            Label: 'School ID',
            Value: school_ID
        },
        {
            Label: 'Address',
            Value: address
        },
        {
            Label: 'Number of Classes',
            Value: no_of_classes
        },
        {
            Label: 'Number of Teachers',
            Value: no_of_teachers
        }
    ],
    UI.FieldGroup #Product: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                Label: 'School Name',
                Value: school_name
            },
            {
                Label: 'School ID',
                Value: school_ID
            },
            {
                Label: 'Address',
                Value: address
            },
            {
                Label: 'Number of Classes',
                Value: no_of_classes
            },
            {
                Label: 'Number of Teachers',
                Value: no_of_teachers
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'CourseFacet',
            Label: 'School Facets',
            Target: '@UI.FieldGroup#Product'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'RelatedStudentsFacet',
            Label: 'Related Students',
            Target: 'Student/@UI.LineItem'
        }
    ]
);

annotate school.Student with @(
    UI.LineItem: [
        {
            Label: 'School ID',
            Value: school_ID
        },
        {
            Label: 'Name',
            Value: name
        }
    ],
    UI.FieldGroup #Student: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                Label: 'School ID',
                Value: school_ID
            },
            {
                Label: 'Name',
                Value: name
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'StudentFacet',
            Label: 'Student Information',
            Target: '@UI.FieldGroup#Student'
        }
    ]
);