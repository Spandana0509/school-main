sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'schoolmanagement/school/test/integration/FirstJourney',
		'schoolmanagement/school/test/integration/pages/SchoolList',
		'schoolmanagement/school/test/integration/pages/SchoolObjectPage'
    ],
    function(JourneyRunner, opaJourney, SchoolList, SchoolObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('schoolmanagement/school') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSchoolList: SchoolList,
					onTheSchoolObjectPage: SchoolObjectPage
                }
            },
            opaJourney.run
        );
    }
);