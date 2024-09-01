sap.ui.define(['sap/ui/core/mvc/ControllerExtension','sap/m/MessageToast'], function (ControllerExtension,MessageToast) {
	'use strict';

	return ControllerExtension.extend('project1.ext.controller.UploadVendorMail', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf project1.ext.controller.UploadVendorMail
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		},
		uploadMailDialog: function(oEvent) {oEvent=undefined
			debugger;
			MessageToast.show("Custom handler invoked.")
		}
	});
});
