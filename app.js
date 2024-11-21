
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  db,
  collection,doc,
  addDoc,setDoc,
  getDocs
} from "./firebase.js";

//Signup function

let signUp =() => {
  console.log('signUpWorkings'); //Check if function is triggered

  //Get input values
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let cPassword = document.getElementById("confirm_pass").value;

  // Email regex (updated for better validation)
  // let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password regex (updated for better validation)
  // let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // Debugging the input values
  console.log(`Email: '${email}'`);
  console.log(`Password: '${password}'`);
  console.log(`Confirm Password: '${cPassword}'`);

  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;
  let userData = { name, number, email, password };
  // console.log(userData);

    // Validate email and password using regex
  //   if (emailRegex.test(email)) {
  //     console.log("Email is valid");
  //   } else {
  //     console.log("Email is invalid");
  //     alert("Please enter a valid email address"); 
  //     return; // Exit the function if the email is invalid
  //   }

  //   if (passwordRegex.test(password)) {
  //     console.log("Password is valid");
  //   } else {
  //     console.log("Password is invalid");
  //     return; // Exit the function if the password is invalid
  //   }

  //     // Check if password and confirm password match
  // if (password !== cPassword) {
  //    console.log("password should be identical");
  //   return; // Exit the function if passwords don't match
  // }

    // If all validations pass, proceed to create the user
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      // console.log(user);
      alert("Account created successfully");
      // window.location.href = "./index.html";  // Redirect after successful sign-up
       // ________________________________Add Doc
          try {
            const docRef = await addDoc(collection(db, "users"), {
              ...userData,
              uid: user.uid,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          //_____________________set doc
          // try {
          //   await setDoc(doc(db, "users", user.uid), {
          //     ...userData,
          //     uId: user.uid,
          //   });
          //   console.log("Document written with ID: ", user.uid);
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }
        })
    .catch((error) => {
      console.log(error.message);
      alert(error.code);  // Display the error code to the user
    });
  
  };

  
  // Check the current page path and attach the event listener
  if (window.location.pathname === "/index.html") {
    let sign_up = document.getElementById("sign_up");
    sign_up.addEventListener("click", signUp);
  }

  // Sign In Function (Login)
let signIn = () => {
  console.log('signInWorkings');  // Check if function is triggered
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "/updated.html";
    })
    .catch((error) => {
      alert(error.code);
    });
};

// Handle Login Page (for login form)
if (window.location.pathname === "/login.html") {
  let sign_in = document.getElementById("sign_in");
  sign_in.addEventListener("click", signIn);
}

// auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    // window.location.href = "./updated.html"
  } else {
  console.log("User not found")
  }
});

// Google Sign-up
let googleSignup = () => {
  console.log('Google SignUp is working');
  signInWithPopup(auth, provider)
    .then(async(result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      // Redirect to another page after success (if needed)

      // try {
      //   await setDoc(doc(db, "users", user.uid), {
      //     uid:user.uid,
      //     name : user.displayName,
      //     email : user.email,
      //     image : user.photoURL,
      //     number : user.phoneNumber
  
      //   });
      //     console.log("Document written with ID: ", user.uid);
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      })
    .catch((error) => {
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    });
}

// Check if on the signup page and add event listener to Google button
if (window.location.pathname === "/index.html") {
  let googleBtn = document.getElementById("googleBtn");
  googleBtn.addEventListener("click", googleSignup);
}

//Getting user data from firestore
let getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
};
getAllUsers();



let updateProfile = async () => {
  // console.log("test");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("Phone").value;
  console.log(auth.currentUser.uid);
  let id = auth.currentUser.uid;
  try {
    const washingtonRef = doc(db, "users", id);
    await updateDoc(washingtonRef, 
      {name,
      email,
      phone,
      timestamp: serverTimestamp(), 
      
    }
    );
    console.log("Updated");
    
  } catch (e) {
    console.log(e);
    alert(not)
  }
};
if (update) {
  const updateBtn = document.getElementById("update");
  updateBtn.addEventListener('click', updateProfile)
}

// let deleteAccount=async()=>{
//   let id = auth.currentUser.uid
//   console.log(id);
//   await deleteDoc(doc(db, "users", id));
//   console.log("Account Deleted");
// }
// let delete_btn = document.getElementById("delete_btn")
// delete_btn.addEventListener("click", deleteAccount)
  

