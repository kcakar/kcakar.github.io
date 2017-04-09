$(function(){
	$("#input").val("");
	$("#output").val("");
	$("#work").click(function(){
		generate();
	});

	$("#demo").click(function(){
		$("#input").val($("#Demo").text());
		generate();
	});

	$("#input").on("change",generate);
});

function generate()
{
	try{
		var outText="Merge list for\n\n";
    	outText += fillRevisions(getRevisions());
    	outText += fillFilesTouched(getFilesTouched());
    	$("#output").val(outText);
	}
	catch(ex)
	{
		console.log("yaramaz");
	}

}

function getRevisions()
{
	var revisions=[];
	var myStr = $("#input").val();

	do{
		var start=myStr.indexOf('Revision');
		var end=myStr.indexOf('Files touched');
		var commit=myStr.substring(start+8,end);

		do{
			var regex=/\d+/;
			var match= regex.exec(commit);
			if(match!=null)
			{
				if(match.length>0)
				{
					if(match.length>1)
					{
						console.log(match)
					}
					for(var j=0;j<match.length;j++)
					{
						var has=false;

						for(var i=0;i<revisions.length;i++)
						{
							if(revisions[i]==match[j])
							{
								has=true;
								break;
							}
						}

						if(!has)
						{
							revisions.push(match[j]);
						}
						has=false;
					}
					
				}
			}
			commit=commit.replace(match,"");
		}
		while(match!=null&&commit.trim().length>0);
		
		myStr = myStr.substring(myStr.indexOf("Files touched") + 13);
	}
	while(start!=-1);
	  	
	return revisions;
}

function fillRevisions(revisions)
{
	var revisionText="Revisions:\n";

	for(var i=0;i<revisions.length;i++)
	{
		revisionText+=revisions[i];
		if(i!=revisions.length-1)
		{
			revisionText+=", ";
		}
	}
	return revisionText+"\n\n";
}

function getFilesTouched()
{
	var filesTouched=[];
	var myStr = $("#input").val();
	
	do{
		var start=myStr.indexOf('Files touched');
		var end=myStr.indexOf('Url');
		var commit=myStr.substring(start+13,end-2	);
		
		commit = commit.substring(commit.indexOf(":") + 1);
		do
		{

			var check="";
			if(commit.indexOf("\n")>-1)
			{
				check=commit.substr(0, commit.indexOf("\n")+1);
			}
			else
			{
				check=commit;
			}
			

			if(check.indexOf("tr")!=-1)
			{
				var toAdd=check.replace("\n","").trim();
				var has=false;

					for(var i=0;i<filesTouched.length;i++)
					{
						if(filesTouched[i]==toAdd)
						{
							has=true;
							break;
						}
					}

					if(!has)
					{
						filesTouched.push(toAdd);
					}
					has=false;
			}

			
			if(check=="\n")
			{
				commit = commit.replace('\n', '');
			}
			else
			{
				commit=commit.substring(commit.indexOf(check) + check.length);
			}
			
		}
		while(commit.length>0 || commit.indexOf("\n")!=-1);

		
		myStr = myStr.substring(myStr.indexOf("Files touched") + 13);
		myStr = myStr.substring(myStr.indexOf("Files touched"));
	}
	while(start!=-1);
	  	
	return filesTouched;

}

function fillFilesTouched(filesTouched)
{
	var filesTouchedText="FilesTouched:\n";

	for(var i=0;i<filesTouched.length;i++)
	{
		filesTouchedText+=filesTouched[i];
		if(i!=filesTouched.length-1)
		{
			filesTouchedText+="\n";
		}
	}
	return filesTouchedText+"\n\n";
}