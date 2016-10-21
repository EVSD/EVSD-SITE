Meteor.methods({
	savePageEdits(pageName, title, content){
		//this finds the page that you sent, and sets the edit updates
		var page = PageEdits.findOne({page: pageName});
		 if(page){
		    PageEdits.update(page, {
					$set: {
						"title": title,
						"content": content,
					}
				});
			}
	},
	indexNewPage(pageName){
		//this is for the admin to create new pages
		PageEdits.insert({
			page: pageName,
			title:" ",
			content: " ",
		});
		console.log("Created new Page " + pageName);
	},
});
