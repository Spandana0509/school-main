sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/ui/core/Fragment','sap/m/MessageToast'], function (ControllerExtension,Fragment,MessageToast) {
	'use strict';
	const Constants = {
        fragmentName: "project2.ext.fragment.uploadFileDialog",
    };

	return ControllerExtension.extend('project2.ext.controller.UploadExcel', {
		oDialog: null,
		
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf project2.ext.controller.UploadExcel
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		},
		uploadExcelDialog: function (oEvent) {
            var that = this;
            if (!this.oDialog) { 
                Fragment.load({
                    name: Constants.fragmentName,
                    controller: this
                }).then(function (oDialog) {
                    that.oDialog = oDialog;  
                    that.getView().addDependent(that.oDialog);  
                    that.oDialog.open();
                });
            } else {
                this.oDialog.open();  
            }
        },
        onCancelPress: function () {
            var oDialog = this.oDialog || sap.ui.getCore().byId("idFileDialog");

            if (oDialog) {
                oDialog.close();
            } else {
                console.error("Dialog not found.");
            }
        },
		onFileChange: function (oEvent) {
			var file = oEvent.getParameter("files")[0];
			if (!file) {
				return;
			}
		
			this.fileType = file.type;  
			this.fileName = file.name;  
			this.fileExtension = file.name.split('.').pop();
		
			var fileReader = new FileReader();
			
			fileReader.onload = function (loadEvent) {
				
				this.fileContent = loadEvent.target.result.split(",")[1];
			}.bind(this);  
		
			fileReader.readAsDataURL(file);
		},
		onUploadPress: function (oEvent) {
            var that = this;
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        
            if (!this.fileContent || this.fileContent === "") {
                MessageToast.show(oResourceBundle.getText("uploadFileErrMsg"));
                return;
            }
        
           
            var data = JSON.stringify({
                mimeType: this.fileType,
                fileName: this.fileName,
                fileContent: this.fileContent,
                fileExtension: this.fileExtension
            });
        
            $.ajax({
                url: "/odata/v4/school/ExcelUpload",  
                type: "POST",
                contentType: "application/json",
                data: data,
                dataType: "json",
                success: function (response) {
                    MessageToast.show(oResourceBundle.getText("sucessfully uploaded the file"));
                    // Clear the file uploader and file content
                    sap.ui.getCore().byId("idFileUpload").clear();
                    that.fileContent = undefined;
                    
                   
                    if (that.oDialog) {
                        that.oDialog.close();
                    }
                that._refreshListReport();

                },
                error: function (xhr, status, error) {
                    
                    var errorMessage = oResourceBundle.getText("error uploading file");
                    MessageToast.show(errorMessage);
        
                   
                    console.error("Upload failed:", error);
                }
            });
        },
		onTempDownload: function (oEvent) {
			var wb = XLSX.utils.book_new();
            var wsData = [
                ["id", "school_ID", "school_name", "address", "no_of_classes", "no_of_teachers"] 
            ];
            var ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "Template");
            var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "school_template.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
		},
        _refreshListReport: function () {
            var oExtensionAPI = this.getView().getController().getExtensionAPI();  
            if (oExtensionAPI && oExtensionAPI.refresh) {
                oExtensionAPI.refresh(); 
            } else {
                console.error("Extension API not available for refreshing List Report.");
            }
        },
	});
});