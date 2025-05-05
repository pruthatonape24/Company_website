// Initialize Firebase
var config = {
apiKey: "AIzaSyDTuC4gpkV6n3VAP5dQjtFjAVIaUHN1fXU",
  authDomain: "spark-laboratories.firebaseapp.com",
  databaseURL: "https://spark-laboratories-default-rtdb.firebaseio.com",
  projectId: "spark-laboratories",
  storageBucket: "spark-laboratories.firebasestorage.app",
  messagingSenderId: "570966607486",

};

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

const usersRef = dbRef.child('opcontact');
const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
	let user = snap.val();

	let $li = document.createElement("li");
	$li.innerHTML = user.company;
	
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);

});

function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('opcontact/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {

		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);
	});

}


