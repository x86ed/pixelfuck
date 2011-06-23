//Some shit to maje javascript behave more like a real programming language
Object.prototype.keys = function(){
    var keys=[];
    for(var i in this) if (this.hasOwnProperty(i)){
        keys.push(i)}
    return keys
}

Object.prototype.values = function(){
    var values=[];
    for(var i in this) if (this.hasOwnProperty(i)){
        values.push(this[i])}
    return values
}

    var pixelFuck = {};
    pixelFuck.webdb = {};
    pixelFuck.webdb.db = null;
  
    pixelFuck.webdb.open = function(dbName,dbDescription,dbSize=5) {//two strings for name and description followed by a number for the size
      if(typeOf(dbName) == "string" && typeOf(dbDescription) == "string" && typeOf(dbSize) == "number"){    
          dbSize = dbSize * 1024 * 1024; // megs 
          html5rocks.webdb.db = openDatabase(dbName, "1.0",dbDescription , dbSize);
      } else {
          console.error("incorrect datatypes for DB creation");
    }
  
    pixelFuck.webdb.createTable = function(tableName,columnArray,hasPrimarykey=False,hasDate=True) {//takes arguments as name,{column Array sets coumns of key ,type}
      var db = pixelFuck.webdb.db;
      var columnString = function(){
	  var columnStringContent = "";
          for(var i in columnArray){i
              columnStringContent += ", " + columnArray.keys[i] + " " + columnArray.values[i]; 
          }
	  columnStringContent = hasPrimarykey?columnStringContent.substr(2):"ID INTEGER PRIMARY KEY ASC" + columnStringContent;
	  columnStringContent = hasDate?columnStringContent + ", added_on DATETIME":columnStringContent;
          return columnStringContent;
      }
      if(typeof(tableName)== "string" && typeof(columnArray) == "object" && columnArray.length > 0 ){
          db.transaction(function(tx) {
              tx.executeSql("CREATE TABLE IF NOT EXISTS" + tableName +"(" + columnString + ")", []);
          });
      }else{
          console.error("table datatypes incorrect");
      }
    }
  
    pixelFuck.webdb.addRow = function(table,rowData) {//rowData should be an object
      var db = pixelFuck.webdb.db;
      if(typeof(table) == "string" && typeof(rowData) == "object" && rowData.length > 0){
          db.transaction(function(tx){
              rowInfo = rowData.values();
	      if(rowData.keys().indexOf("added_on") != -1)
                  rowInfo[rowData.keys().indexOf("added_on")] = new Date();
              tx.executeSql("INSERT INTO " + table  +  "(" + JSON.stringify(rowData.keys()).replace(/\[|\]|"/,"") + ") VALUES (?,?)", 
                  rowInfo,
                  pixelFuck.webdb.onSuccess,
                  pixelFuck.webdb.onError);
          });
     }else{
         console.error("rowData needs to be an object");
     }
    }
  
    pixelFuck.webdb.onError = function(tx, e) {
      console.error("SQLite ERROR: " + e.message);
    }
  
    pixelFuck.webdb.onSuccess = function(tx, r) {
      // re-render the data.
      pixelFuck.webdb.getAllTodoItems(loadTodoItems);
    }
  
  
    pixelFuck.webdb.getAllTableItems = function(renderFunc) {
      var db = pixelFuck.webdb.db;
      db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM " +tableName +  , [], renderFunc, 
            pixelFuck.webdb.onError);
      });
    }
  
    pixelFuck.webdb.deleteTableRow = function(tableName,id) {
      var db = pixelFuck.webdb.db;
      db.transaction(function(tx){
        tx.executeSql("DELETE FROM " + tableName  + " WHERE ID=?", [id],      
            pixelFuck.webdb.onSuccess, 
            pixelFuck.webdb.onError);
        });
    }
  
    function loadTodoItems(tx, rs) {
      var rowOutput = "";
      var todoItems = document.getElementById("todoItems");
      for (var i=0; i < rs.rows.length; i++) {
        rowOutput += renderTodo(rs.rows.item(i));
      }
   
      todoItems.innerHTML = rowOutput;
    }
    
    function renderTodo(row) {
      return "<li>" + row.todo  + " [<a href='javascript:void(0);'  onclick='html5rocks.webdb.deleteTodo(" + row.ID +");'>Delete</a>]</li>";
    }
  
    function init() {
      html5rocks.webdb.open();
      html5rocks.webdb.createTable();
      pixelFuck.webdb.getAllTableItems(loadTodoItems);
    }

    function addTodo() {
      var todo = document.getElementById("todo"); 
      html5rocks.webdb.addTodo(todo.value);
      todo.value = "";
    }




// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var imageObjects = {};
imageObjects.values = [];
var notifier
$(function() {
	chrome.extension.onConnect.addListener(function(port) {
  		port.onMessage.addListener(function(msg) {
			if(typeof(msg.remove)=="number")
				imageObjects.values.remove(parseInt(msg.remove));
			if(typeof(msg.replace)=="number")
				imageObjects.values.remove(parseInt(msg.replace));
				$.extend(imageObjects.values[parseInt(msg.replace)] , msg.value);
			if(msg.replace =="none" && msg.remove == "none")
				imageObjects.values.push(msg.value);
			chrome.tabs.getSelected(null, function (Tab,tab) {
          		var tabOfOrigin = Tab.id;
				notifier = chrome.tabs.connect(tabOfOrigin, {name: "listChange"})
		  		notifier.postMessage({list: "modified"});
				notifier.onMessage.addListener(function(msg) {
  					if (msg.confirm == "added")
					    notifier.disconnect();
				});
     		});
	  	});

	});

});
