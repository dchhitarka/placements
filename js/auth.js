// const login = document.querySelector('#login-form')
// console.log("LOGIN")

// login.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const data = {
// 		"reg_no": login.reg_no.value.toUpperCase(),
// 		"password": login.password.value,
// 	}
// 	console.log(data)
// 	const db = window.firebase.firestore();
// 	const students = db.collection("users");

// 	students
// 	.onSnapshot((snapshot) => {
// 	    const stu_data = snapshot.docs.map((doc) => ({
// 	      id: doc.id,
// 	      ...doc.data(),
// 	    }));
// 	    stu_data.map(doc => {
// 	    	if(doc.reg_no == data.reg_no && doc.password == data.password){
// 	    		console.log("Login Successfull!");
// 	    		localStorage.setItem("id", doc.id)
// 	    		window.location.reload("file:///home/dchhitarka/Desktop/Practise/Project/index.html")
// 	    	}
// 	    })
// 	    console.log("Failed to Login.")
// 	  });
// })