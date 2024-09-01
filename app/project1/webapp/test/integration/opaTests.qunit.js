sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/SchoolList',
		'project1/test/integration/pages/SchoolObjectPage',
		'project1/test/integration/pages/StudentObjectPage'
    ],
    function(JourneyRunner, opaJourney, SchoolList, SchoolObjectPage, StudentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSchoolList: SchoolList,
					onTheSchoolObjectPage: SchoolObjectPage,
					onTheStudentObjectPage: StudentObjectPage
                }
            },
            opaJourney.run
        );
    }
);