sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project2/test/integration/FirstJourney',
		'project2/test/integration/pages/SchoolList',
		'project2/test/integration/pages/SchoolObjectPage',
		'project2/test/integration/pages/StudentObjectPage'
    ],
    function(JourneyRunner, opaJourney, SchoolList, SchoolObjectPage, StudentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project2') + '/index.html'
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