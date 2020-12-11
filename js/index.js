const user = {
	id: localStorage.getItem('id') ?? null,
}

const formatDate = (d) => {
	date = new Date(d)
	return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
}

const urls = {
	home: "https://dchhitarka.github.io/placements/index.html",
	companies: "https://dchhitarka.github.io/placements/pages/companies.html",
	trainings: "https://dchhitarka.github.io/placements/pages/trainings.html",
	dashboard: "https://dchhitarka.github.io/placements/pages/dashboard.html"
}

var firebaseConfig = {
    apiKey: "AIzaSyAeDpR9D2vM5WzQQzMbDe9TguMaYwtJMaU",
    authDomain: "placementmadeeasy.firebaseapp.com",
    projectId: "placementmadeeasy",
    storageBucket: "placementmadeeasy.appspot.com",
    messagingSenderId: "69605639017",
    appId: "1:69605639017:web:7d66eb5d19eeec247873f8",
    measurementId: "G-VN11CQ4FEZ"
 }
// {
//     apiKey: "AIzaSyDofmDJlyoxLyCQ52WUbXXYVEKqwC4rFdM",
//     authDomain: "placementsmadeasy.firebaseapp.com",
//     projectId: "placementsmadeasy",
//     storageBucket: "placementsmadeasy.appspot.com",
//     messagingSenderId: "392004737537",
//     appId: "1:392004737537:web:31292e2549290227a53e00",
//     measurementId: "G-4CF4G40ELN"
// };

const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const companies = db.collection("companies");
const trainings = db.collection("trainings");
const students = db.collection("students");
const applications = db.collection("applications");

/* Show Login, Logout and Dashboard in the navbar based on user id state*/
if(user.id != null){
	document.querySelector('.login-button').style.display = 'none';
	document.querySelector('.logout-button').style.display = 'block';
}else{
	document.querySelector('.dashboard').style.display = 'none';
}

// <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
const loader = document.querySelector(".loader");
// document.createElement('div');
// loader.setAttribute('class', 'loader');
// loader.innerHTML = `<svg fill="currentColor" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 140" preserveAspectRatio="xMidYMid meet" x="202">
// <rect xmlns="http://www.w3.org/2000/svg" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect xmlns="http://www.w3.org/2000/svg" x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect xmlns="http://www.w3.org/2000/svg" x="60" width="15" height="140" rx="6"><animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect xmlns="http://www.w3.org/2000/svg" x="90" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect xmlns="http://www.w3.org/2000/svg" x="120" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect>
// </svg>`;
// document.body.appendChild(loader);

const displayCompanies = () => {
	companies
	.onSnapshot((snapshot) => {
	    const data = snapshot.docs.map((doc) => ({
	      id: doc.id,
	      ...doc.data(),
	    }));
	   	const companiesCard = document.querySelector('.companies-card');
	    data.map((doc) => {
	   		let card = 
	   			`<div class="col company-card">
	          		<div class="card shadow-sm bg-dark">
			            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: ${doc.company}" preserveAspectRatio="xMidYMid slice" focusable="false">
			            	<title>${doc.company}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${doc.company}</text>
			            </svg>

			            <div class="card-body">
			                <p class="card-text">${doc.details}</p>
			                <p>CTC: ${doc.ctc}</p>
			                <p>Apply Before ${formatDate(doc.last_date?.seconds)}</p>
		    	            <div class="d-flex justify-content-between align-items-center">
			        	        <div class="btn-group">
		                  	  		<button type="button" class="btn btn-sm btn-outline-secondary"><a href="///home/dchhitarka/Desktop/Practise/Project/pages/company.html?id=${doc.id}" class="text-decoration-none text-light">View</a></button>
			                  		<button type="button" class="btn btn-sm btn-outline-secondary"><a href="${doc.link}" target="_blank" class="text-decoration-none text-light">Apply</a></button>
		                   		</div>
		                		<small class="text-muted">${formatDate(doc.created_at?.seconds)}</small>
		              		</div>
		            	</div>
	          		</div>
	        	</div>`;
	    	companiesCard.innerHTML = card;
	    })
    	document.body.contains(loader) ? document.body.removeChild(loader) : null;
	});
}

const displayTrainings = () => {
	trainings
	.onSnapshot((snapshot) => {
	    const data = snapshot.docs.map((doc) => ({
	      id: doc.id,
	      ...doc.data(),
	    }));
	   	const trainingsCard = document.querySelector('.trainings-card');
	    data.map((doc) => {
	   		let card = 
	   			`<div class="col training-card">
	          		<div class="card shadow-sm bg-dark">
			            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: ${doc.company}" preserveAspectRatio="xMidYMid slice" focusable="false">
			            	<title>${doc.company}</title><rect width="100%" height="100%" fill="#55595c"/><text x="10%" y="50%" fill="#eceeef" dy=".3em">${doc.company}</text>
			            </svg>

			            <div class="card-body">
			                <p class="card-text">${doc.details}</p>
			                <p>Date: ${formatDate(doc.from?.seconds)} - ${formatDate(doc.to?.seconds)}</p>
		    	            <div class="d-flex justify-content-between align-items-center">
			        	        <div class="btn-group">
		                  	  		<button type="button" class="btn btn-sm btn-outline-secondary"><a href="///home/dchhitarka/Desktop/Practise/Project/pages/training.html?id=${doc.id}" class="text-decoration-none text-light">View</a></button>
			                  		<button type="button" class="btn btn-sm btn-outline-secondary"><a href="${doc.link}" target="_blank" class="text-decoration-none text-light">Join</a></button>
		                   		</div>
		                		<!--<small class="text-muted">${formatDate(doc.created_at?.seconds)}</small>-->
		              		</div>
		            	</div>
	          		</div>
	        	</div>`;
	    	trainingsCard.innerHTML = card;
	    })
    	document.body.contains(loader) ? document.body.removeChild(loader) : null;
	 });	
}

if(window.location.pathname.endsWith("/pages/companies.html")){
	// COMPANIES
	displayCompanies()
}
else if(window.location.pathname.startsWith("/home/dchhitarka/Desktop/Practise/Project/pages/company")){
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	companies
	.doc(id)
	.get()
	.then(doc => {
		if (!doc.exists) {
			window.location = urls.home;
		}
		const data = doc.data();
		document.title = data.company + " " +document.title
		console.log(data);
		/* ADD DATA TO COMPANY PAGE*/
    	document.body.contains(loader) ? document.body.removeChild(loader) : null;
	})
}
else if(window.location.pathname.endsWith("/pages/trainings.html")){
	// TRAININGS
	displayTrainings();
}
else if(window.location.pathname.startsWith("/home/dchhitarka/Desktop/Practise/Project/pages/training")){
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	trainings
	.doc(id)
	.get()
	.then(doc => {
		if (!doc.exists) {
			window.location = "file:///home/dchhitarka/Desktop/Practise/Project/pages/companies.html";
		}
		const data = doc.data();
		document.title = data.company + " " + document.title
		console.log(data);
		/* ADD DATA TO TRAINING PAGE*/
    	document.body.contains(loader) ? document.body.removeChild(loader) : null;
	})
}

else if(window.location.pathname.endsWith("/pages/dashboard.html")){
	// DASHBOARD
	if(user.id == null) window.location = "file:///home/dchhitarka/Desktop/Practise/Project/index.html";
	students
	.doc(user.id)
	.get()
	.then(doc => {
		if (!doc.exists) {
			localStorage.clear();
			window.location = urls.home;
		}
		data = doc.data();
		document.querySelector('.myname').innerHTML = data.name ?? "Your Name"
		document.querySelector('.profile').innerHTML = 
			`<div class="form-group row my-2">
		    	<label for="name" class="col-sm-2 col-form-label">Name</label>
		    	<div class="col-sm-10">
		      		<input type="text" class="form-control" name="name" id="name" value="${data.name}">
		    	</div>
			</div>
		  	<div class="form-group row my-2">
		    	<label for="email" class="col-sm-2 col-form-label">Email</label>
		    	<div class="col-sm-10">
		      		<input type="text" class="form-control" id="email" name="email" value=${data.email}>
		    	</div>
			</div>
		  	<div class="form-group row my-2">
		    	<label for="reg_no" class="col-sm-2 col-form-label">Reg. No.</label>
		    	<div class="col-sm-10">
		      		<input type="text" class="form-control" id="reg_no" name="reg_no" readonly value=${data.reg_no}>
		    	</div>
			</div>
		  	<div class="form-group row my-2">
		    	<label for="mobile" class="col-sm-2 col-form-label">Mobile</label>
		    	<div class="col-sm-10">
		      		<input type="text" class="form-control" id="mobile" name="mobile" value=${data.mobile}>
		    	</div>
			</div>
		 	<div class="form-group row my-2">
		    	<label for="staticEmail" class="col-sm-2 col-form-label"></label>
		    	<div class="col-sm-10">
		      		<input type="submit" class="form-control btn btn-success" value="Update">
		    	</div>
		 	</div>`;
		colors = {
			'placed': "green",
			'rejected': "red",
			'ongoing': "orange"
		}
	 	applications.onSnapshot((snapshot) => {
		    const apps = snapshot.docs.map((doc) => ({
		      id: doc.id,
		      ...doc.data(),
		    }));
		    apps.map(app => {
		    	if(app.student.id == doc.id){
		    		// console.log(doc.id)
		    		const tbody = document.querySelector('.application-rows');
		    		const row = document.createElement("tr");
		    		row.innerHTML = 
			    		`<th scope="row">${tbody.childElementCount + 1}</th>
						<td>${app.company}</td>
						<td>${app.ctc} LPA</td>
						<td>${app.status}</td>`
					row.style.backgroundColor = colors[app.status]
					row.style.color = 'white';
		    		tbody.appendChild(row)
		    	}
		    })
		});
    	document.body.contains(loader) ? document.body.removeChild(loader) : null;
	})

	const profile = document.querySelector(".profile");
	profile.addEventListener("submit", (e) => {
		document.body.appendChild(loader);
		console.log(loader)
		e.preventDefault();	
		students
		.doc(user.id)
		.update({
			name: profile.name.value,
			email: profile.email.value,
			mobile: profile.mobile.value,
		})
		.then(() => {
		    console.log("Document updated"); // Document updated
			document.body.removeChild(loader);
		})
		.catch((error) => {
		    console.error("Error updating doc", error);
			document.body.removeChild(loader);
		});
	})
	
}

else if(window.location.pathname.startsWith("/home/dchhitarka/Desktop/Practise/Project/pages/auth/")){
	/* LOGIN PAGE*/
	if(user.id != null) window.location = urls.home;
	// document.body.removeChild(loader);
	const login = document.querySelector('#login-form')
	
	login.addEventListener('submit', (e) => {
		e.preventDefault();
		const data = {
			"reg_no": login.reg_no.value.toUpperCase(),
			"password": cyrb53(login.password.value),
		}
		db.collection("students")
		.onSnapshot((snapshot) => {
		    const student = snapshot.docs.map((doc) => ({
		      id: doc.id,
		      ...doc.data(),
		    }));
		    student.map(doc => {
		    	if(doc.reg_no == data.reg_no && doc.password == data.password){
		    		console.log("Login Successfull!");
		    		localStorage.setItem("id", doc.id)
		    		window.location = "https://dchhitarka.github.io/placements/index.html"
		    	}
		    })
		    alert("Failed to Login. Try Again!")
		});
	})
}
else{
	displayCompanies();
	displayTrainings();
	// document.body.removeChild(loader);
}

document.querySelector('.logout-button')?.addEventListener('click', (e) => {
	e.preventDefault();
	localStorage.clear();
	// console.log("")
	window.location = "https://dchhitarka.github.io/placements/index.html";
})