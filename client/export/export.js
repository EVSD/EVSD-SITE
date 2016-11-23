if (Meteor.isClient){
  Template.export.events({

    'click #downloadUsers': function(event) {
        var users = Meteor.users.find().fetch();
        var csv = Collection2CSV(users);
        window.open("data:text/csv;charset=utf-8," + escape(csv));
        $("#csv").val(csv);
    },
    'click #downloadTournaments': function(event) {
        var tournament = TournamentList.find().fetch();
        var csv = Collection2CSV(tournament);
        window.open("data:text/csv;charset=utf-8," + escape(csv));
        $("#csv").val(csv);
    },
    'click #downloadTournamentEntries': function(event) {
        var entries = Tournaments.find().fetch();
        var csv = Collection2CSV(entries);
        window.open("data:text/csv;charset=utf-8," + escape(csv));
        $("#csv").val(csv);
    },

  });
  function Collection2CSV(objArray) {
     /*
     This function extracts all the strings from the data.
     It takes lines of data as a string and then uses slice to create an array of these strings
     Result: a CSV-readable file
     */
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var csvArray = ''; //an array of strings, with each string being a row in the csv
    var line = ''; //holder for the srings for each line

    /*NOTE: HEADER
    This is what gets the titles of the properties in the objects of a given collection.
    It creates a huge long string that can be read as a CSV file.
    **MARK:The slice might not really be necessary but Jackson needs to test it further to make sure that is the case.
    */
    for (var index in array[0]) {
      var subObj = array[0][index];
      /*
      this first "if" statment accounts for if there is an object, and if so, then check if if the object is an email with
      a subobject or if it is not, make sure it is not one of the things that we do not want to record.
      */
      if (typeof(subObj) == 'object'){
        for (var i in subObj){
          var value = i + "";
            var emailCheck = subObj[i];
            if (typeof(emailCheck) == 'object'){
              for (var i2 in emailCheck){
                if (i2 != 'bcrypt' && i2 != 'loginTokens'){

                  value = i2 + "." + i;
                  line += '"' + value.replace(/"/g, '""') + '",';
                }
              }
            }else if (value != 'password' && value != 'resume' && value != 'accountBalanceLog' && value != '0'){
            line += '"' + value.replace(/"/g, '""') + '",';
          }
        }
      }
      /*
      in this part we see if there is a string, and make sure it is not the local ID, and record that as it is
      for the title.
      //NOTE: the /g will ensure that all of the ones that match " are replaced with ""
      */
      else if(typeof(subObj) == 'string' && index != '_id'){
        var value = index + "";
        console.log(value);
        line += '"' + value.replace(/"/g, '""') + '",';
      }
    }
      //this is also part of the HEADER
      //MARK: idk why this is seperate, but I think it was b/c it didn't work in the main loop so I made an exception for it
       line += '"' + "createdAt".replace(/"/g, '""') + '",';
       line = line.slice(0, -1); //MARK: idk if this is necessary since we have the while string; should check later
       console.log(line);
       csvArray += line + '\n'; //adds the string onto our csvArray array
       line = ""; //resets the line after the header

    /*NOTE: DATA BODY
    This is suppose to get all of the data from each of the objects
    very similar to the top of the code
    **MARK: the problem with this not working seems to come from line not being reset, b/c it clearly runs through enough times if we look at the array that is being produced
    */
    for (var length = 0; length < array.length; length++){
      //MARK: I think that this goes through each of the objects in the array (so all of the users or tournaments or entries)
      //1. get the object from the collection
      line = ""; //empty the javascript string
      for (var index in array[length]) {
        //2. get each prop from the object
        var subObj = array[length][index];
        /*  check for what the sub object is, and the parse the data into a string
            1. is the subObj an object (MARK:idk what services is)
            2.
        */
        //if (index == "createdAt") line += '"' + (subObj + "").replace(/"/g, '""') + '",';
        if (typeof(subObj) == 'object' && subObj != 'services'){
          console.log(subObj);
          for (var prop in subObj){
            var stringCheck = prop + ''; //used to convert i into string
            //TODO: should be iterating again if it is still an object, most likely is not tho
            if(subObj.hasOwnProperty(i) && (subObj != 'admin' && subObj != 'officer'&& subObj != 'frozen' && subObj != 'member' && i != 'password' && i != 'resume')){
              //check for objects inside of objects. i.e. user -> profile -> emails
              if (typeof(subObj[i]) == 'object' && i == '0'){
                var emails = subObj[i];
                for (var i2 in emails){
                  value = "" + emails[i2];
                  line += '"' + value.replace(/"/g, '""') + '",';
                }
              }else if (stringCheck != 'password' && stringCheck != 'resume' && stringCheck != 'accountBalanceLog' && stringCheck != '_id'){
                //if there is no object to parse out of, we just take the value of the property in the subobject
                value = '' + subObj[i];
                line += '"' + value.replace(/"/g, '""') + '",';
                }
              }
            }
          //if it is a string then
        }
        else if (typeof(subObj) == 'string' && index != '_id'){
          //else it goes through the array
          var value = array[0][index] + "";
          line += '"' + value.replace(/"/g, '""') + '",';
        }
        if (index == "createdAt"){
           line += '"' + (subObj + "").replace(/"/g, '""') + '",';
        }
      }
      line = line.slice(0, -1);
      console.log("line: " + line);
      csvArray += line + '\n';
      line = "";
      console.log("If there is nothing the line cleared successfully: " + line);
    }
    console.log(csvArray);
    return csvArray;
  }
}
