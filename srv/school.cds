using { com.satinfotech.school as db } from '../db/schema';

service school {
    entity School as projection on db.School;
    entity student as projection on db.Student;
}

annotate school.School with @odata.draft.enabled;

annotate school.School with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Label: 'School_name',
            Value: school_name
        },
        {
            $Type: 'UI.DataField',
            Value: school_ID
        },
        {
            $Type: 'UI.DataField',
            Value: address
        },
        {
            $Type: 'UI.DataField',
            Value: no_of_teachers
        },
        {
            $Type: 'UI.DataField',
            Value: no_of_classes
        }
    ]
);

annotate school.School with @(
    UI.FieldGroup #ProductInformation: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                $Type: 'UI.DataField',
                Value: school_name
            },
            {
                $Type: 'UI.DataField',
                Value: school_ID
            },
            {
                $Type: 'UI.DataField',
                Value: address
            },
            {
                $Type: 'UI.DataField',
                Value: no_of_classes
            },
            {
                $Type: 'UI.DataField',
                Value: no_of_teachers
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'ProductInfoFacet',
            Label: 'Product Information',
            Target: '@UI.FieldGroup#ProductInformation'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'relatedCustomerFacet',
            Label: 'Related Customer',
            Target: '@UI.LineItem'
        }
    ]
);

annotate school.student with @(
    UI.LineItem: [
        {
            Label: 'school ID',
            Value: 'School_ID'
        },
        {
            Label: 'student Name',
            Value: name
        },
        {
            Label: 'student ID',
            Value: ID
        }
    ],
    UI.FieldGroup #student: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                Label: 'school ID',
                Value: 'School_ID'
            },
            {
                Label: 'student Name',
                Value: name
            },
            {
                Label: 'student ID',
                Value: ID
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'ItemsFacet',
            Label: 'Items',
            Target: '@UI.FieldGroup#student'
        }
    ]
);
