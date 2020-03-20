/****************
* GDPR Update
* This code sets the cookie value so it's ready for the GDPR tool during page load
****************/
function checkCookie(n){for(var t=n+"=",e=document.cookie.split(";"),r=0;r<e.length;r++){for(var i=e[r];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return!1}

var cookieString = "",
    cookieExists = false,
    opts = decodeURIComponent(checkCookie('OPTOUTMULTI')).split('|'); //false if cookie doesn't exist

// first check for cookie existence
if (opts) {
    //check for old cookie
    for (var b = 0; b < opts.length; b += 1) {
    // only look for actual categories (index has 'c' in it)
    	if (opts[b].indexOf('c') > -1) {
    	    var cData = opts[b].split(':');
        	if (cData[0] === 'c2' || cData[0] === 'c3' || cData[0] === 'c4' || cData[0] === 'c5' || cData[0] === 'c6') {
        	    //old cookie found
        	    writeBackUpCookie(); // and then write the new cookie
        	    writeUpdatedCookie();
        	    break;
        	} else if (cData[0] === 'c7' || cData[0] === 'c8' || cData[0] === 'c9') {
        	    //possible new cookie present. We need to check for other cookies to make sure this isn't just the transient cookie
        	    if (!checkCookie('OPTOUTMULTI_GEO') && !checkCookie('OPTOUTMULTI_TYPE')) {
        	        //probably not an existing cookie
        	        writeUpdatedCookie();
        	        break;
        	    } //otherwise probably an existing cookie, do nothing
        	}
    	}
	}
} else {
    // no cookie exists. create one
    console.log("cookie debugging");
    //writeUpdatedCookie();
}

function writeBackUpCookie() {
	var cD = new Date();
    cD.setDate(cD.getDate() + 90);
    cookieString = checkCookie('OPTOUTMULTI') + ";domain=" + document.domain.substring(document.domain.indexOf('.autodesk')) + ";expires=" + cD.toGMTString();
    localStorage.setItem('OPTOUTMULTIBACKUP', cookieString);
    //document.cookie = cookieString;
    cookieString = "";
}

function writeUpdatedCookie() {
    //write the main cookie so that the strictly necessary tags fire
    data = encodeURIComponent("c7:0|c8:1|c9:1|0:0");
    cookieString = "OPTOUTMULTI=" + data + ";domain=" + document.domain.substring(document.domain.indexOf('.autodesk')) + ";path=/";
    document.cookie = cookieString;
    cookieString = "";
    
    // also write a cookie to let the GDPR banner know it still needs to run
    cookieString = "OPTOUTMULTI_TYPE=P;domain=" + document.domain.substring(document.domain.indexOf('.autodesk')) + ";path=/"; //the value of P will trigger the form to be drawn again
    document.cookie = cookieString;
    cookieString = "";
    
    // now write the OPTOUTMULTIBACKUP cookie as a flag for the clearCookies() fn in the template
    cookieString = "OPTOUTMULTI_SKIPCLEAR=true;domain=" + document.domain.substring(document.domain.indexOf('.autodesk')) + ";path=/";
    document.cookie = cookieString;
    //localStorage.setItem('gdprdeleteskip', 'true');
}
