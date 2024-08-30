sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'student/test/integration/FirstJourney',
		'student/test/integration/pages/SchoolList',
		'student/test/integration/pages/SchoolObjectPage',
		'student/test/integration/pages/StudentObjectPage'
    ],
    function(JourneyRunner, opaJourney, SchoolList, SchoolObjectPage, StudentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('student') + '/index.html'
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