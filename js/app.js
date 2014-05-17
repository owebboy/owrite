function saveTextAsFile()
{
	var textToWrite = document.getElementById("text").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("save").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

(function() {

	// Grab the textarea
	var demo = document.querySelector('#text');

	// localStorage feature detect
	function supportsLocalStorage() {
		return typeof(Storage)!== 'undefined';
	}

	// Run the detection with inverted expression
	if (!supportsLocalStorage()) {

		// Change the value to inform the user of no support
		demo.value = 'No HTML5 localStorage support, soz.';

	} else {

		// Try this
		try {

			// Set the interval and autosave every second
			setInterval(function() {
				localStorage.setItem('autosave', demo.value);
			}, 1000);

		} catch (e) {

			// If any errors, catch and alert the user
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!');
			}
		}

		// If there is data available
		if (localStorage.getItem('autosave')) {

			// Retrieve the item
			demo.value = localStorage.getItem('autosave');
		}

		// Clear button, onclick handler
		document.querySelector('.clear').onclick = function() {
			demo.value = '';
			localStorage.removeItem('autosave');
		};

		// Empty button, onclick handler
		document.querySelector('.empty').onclick = function() {
			demo.value = '';
			localStorage.clear();
		};

	}

})();