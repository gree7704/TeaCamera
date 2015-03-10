//Assignment 3: Teas and Camera App
//Jessica G. Greene

(function(){
	var win1 = Titanium.UI.createWindow({
		title:'Select Color',
		background:'#fff'
	});
	// open window
	win1.open();


var Teas = ['#F5F5DC', '#FFE4B5', '#FFE4C4', '#D2B48C',
	'#C3B091', '#C3B091', '#926F5B', '#804000', '#654321',
	'#C3D2B1F'];
	
var allRows = [];
var theColours = Titanium.UI.createTableView({});
var theRow;

for (var i=0; i <Teas.length; i++) {
	theRow = Titanium.UI.createTableViewRow({backgroundColor:
	Teas[i], height:40, TeaColour:Teas[i]});
	allRows.push(theRow);
}

theColours.setData(allRows);
win1.add(theColours);

function getVerdict(colour) {
	var indicator  = colour.charAt(1);
	var msg;
	// make a crude decision on the strength of the tea based
	switch (indicator) {
		case 'F': msg = 'Milky'; break;
		case 'D': msg = 'Nice'; break;
		case 'C': msg = 'Perfect'; break;
		case '9': msg = 'A bit strong'; break;
		case '8': msg = 'Builders tea'; break;
		case '6': msg = 'Send it back'; break;
		case '3': msg = 'No milk here'; break;
	}
	return msg;
}

function showTeaVerdict(_args) {
	var teaVerdict = Ti.UI.createWindow({layout:'vertical'});
	
	teaVerdict.backgroundColor = _args;
	teaVerdict.msg = getVerdict(_args);
	
	var judgement = Ti.UI.createLabel
	({text: teaVerdict.msg, top:'50%'});
	var close = Ti.UI.createButton
	({title:'Choose again', top:'25%'});
	close.addEventListener('click', function(e)
		{teaVerdict.close();
		//release the resources
		teaVerdict = null;
		});
	
	teaVerdict.add(judgement);
	teaVerdict.add(close);
	teaVerdict.open();
}

theColours.addEventListener('click', function(e)
	{showTeaVerdict(e.source.TeaColour);});
	
	
//second window

var win2 = Titanium.UI.createWindow({
	title: 'Camera',
	backgroundColor: '#fff'
});	
var button = Titanium.UI.createButton ({
	title: 'Camera',
	top:380,
	left:10,
	height: 30,
	backgroundColor: '#006633'
});

win1.add(button);

var NavButton2 = Ti.UI.createButton({
	title: 'Home',
	color: '#33b366',
	top: 180,
	width: '50%',
	height: 30,
	backgroundColor: '#006633',
	font: {
		fontSize: '20sp',
		fontWeight: 'bold'
	}
});

var options = Ti.UI.createView( {layout: 'vertical'});

var bshowCamera = Ti.UI.createButton({title: 'Show Camera'});
var thePhoto = Ti.UI.createImageView({height: '30%', width: '30%'});

options.add(bshowCamera);
options.add(thePhoto);
//add navigation button to view
options.add(NavButton2);
win2.add(options);
button.addEventListener('click', function(e) {
	Ti.API.info('Clicked Camera Button');
	win2.open();
});

//add listener for navigation button
NavButton2.addEventListener('click', function(e) {
	Ti.API.info('Clicked Home Button');
	win2.close();
});

bshowCamera.addEventListener('click', function (e) {
	Ti.API.info('Clicked show camera Button');
	
	Ti.Media.showCamera({animated: true,
						autoHide: true,
						saveToPhotoGallery: true,
						showControls: true,
						mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
						success: function (e) {showPhoto(e);},
						error: 	 function (e) {alert('There was a problem accessing the camera');}
		
			});
		});
			
})();
