var app = {}
var CRUD = {}

app.namespace = function( nameSpaceString ) {
    var names = nameSpaceString.split(".");
 
    //global object is the parent for first level nameSpace
    var parent = window;  
     
    //if any nameSpace level doesn't exist, create it
    for ( var i=0, imax=names.length ; i < imax; i++ ) {
        if ( !parent[names[i]] ) parent[names[i]]={};
        parent = parent[names[i]];
    }      
};

app.namespace("app.Render");

app.Render.loadXMLDoc = function(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");  
    } 

    xhttp.open("GET",dname,false);
    xhttp.send("");
    return xhttp.responseXML;
};

app.Render.xml2Html = function(XML, XSLT, id) {
    xml = app.Render.loadXMLDoc(XML);
    xsl = app.Render.loadXMLDoc(XSLT);

    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        
        app.Render.remove(id);
        document.getElementById(id).innerHTML = ex;
    }

    // code for Mozilla, Firefox, Opera,etc.
    else if (document.implementation && 
        document.implementation.createDocument) {
        xsltProcessor=new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);  
        resultDocument = xsltProcessor.transformToFragment(xml,document);

        app.Render.remove(id);
        document.getElementById(id).appendChild(resultDocument);
    }
};

app.Render.remove = function(id) {
    var element = document.getElementById(id);
    while (element.innerHTML != '') {
        element.innerHTML = '';
    }
};

