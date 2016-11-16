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
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';
    //header labels
    for (var index in array[0]) {
      //if it is an object, it gets the values of the head
      var subObj = array[0][index];
      // if (index == "createdAt") line += '"' + index.replace(/"/g, '""') + '",';
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
      }else if(typeof(subObj) == 'string' && index != '_id'){
        var value = index + "";
        console.log(value);
        line += '"' + value.replace(/"/g, '""') + '",';
      }
    }
    line += '"' + "createdAt".replace(/"/g, '""') + '",';
    line = line.slice(0, -1);
    console.log(line);
    str += line + '\n';
    line = ''; //resets the line so that we can put a new iteration here.

    //**for getting the values for each object in the collection
    //for each user or part of collection(in the array)
    for (var length = 0; length < array.length; length++){
      for (var index in array[length]) {
        var subObj = array[length][index];
        //if (index == "createdAt") line += '"' + (subObj + "").replace(/"/g, '""') + '",';
        //if the index is an object
        if (typeof(subObj) == 'object' && subObj != 'services'){
          //console.log(subObj);
          //for each property in the 'sub'object we add a value
          for (var i in subObj){
            var stringCheck = i + ''; //used to convert i into string
            //TODO: should be iterating again if it is still an object

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
        }else if (typeof(subObj) == 'string' && index != '_id'){
          //else it goes through the array
          var value = array[0][index] + "";
          console.log(value);
          line += '"' + value.replace(/"/g, '""') + '",';
        }

      }
      for (var index in array[length]) {
        var subObj = array[length][index];
        if (index == "createdAt") line += '"' + (subObj + "").replace(/"/g, '""') + '",';
      }

      line = line.slice(0, -1);
      str += line + '\n';
      line = '';
    }
    console.log(str);
    return str;
  }
}
