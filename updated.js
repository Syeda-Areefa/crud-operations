import {db,collection,addDoc,getDocs,doc, deleteDoc,getDoc, updateDoc} from "./firebase.js"

const notify = document.querySelector('.notify')

// add data firestore 
async function addData() {
    const name = document.querySelector('#name').value ;
    const email = document.querySelector('#email').value ;
    // alert(name)

    try {
        const DocRef = await addDoc(collection(db,"users"),{
            name: name,
            email: email,
        }) 
        notify.innerHTML = `Data Added`
         document.querySelector('#name').value="" ;
         document.querySelector('#email').value="" ;


         setTimeout (()=>{
            notify.innerHTML = "";
        }, 1000)
         GetData();
    
    } catch (err) {
        console.log(err);
        
    }

}
const addBtn = document.querySelector('#update');
addBtn.addEventListener('click', addData);


//GET DATA FROM FIRESTORE 
async function GetData() {
    try {
        const getDataQuery = await getDocs(collection(db, "users"))
        let html = "";

        getDataQuery.forEach((doc) => {
            const data = doc.data()

            html += `
            <tr>
            <td>${doc.id}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td><button class = "del_btn" onclick = "deleteData('${doc.id}')">Delete</button></td>
             <td><button class = "update_btn" onclick = "updateData('${doc.id}')">Update</button></td>

            </tr>
            
            `
            
        });

        document.querySelector('.table').innerHTML = html 
    } catch {
        console.log(error);
        
    }
    
}

GetData();


//delete btn
window.deleteData = async(id) => {
  try {
    await deleteDoc(doc(db,"users", id))
    notify.innerHTML = "data Deleted";

    setTimeout (()=>{
        notify.innerHTML = "";
    }, 1000)
    getDocs()
  } catch(err) {
    console.log(err);
    
  }

}

//update btn

window.updateData =  async function(id){
   try {
    const docSnapShot = await getDoc(doc(db, "users", id))
    const currentUser = docSnapShot.data()
    document.querySelector('#name').value= currentUser.name ;
    document.querySelector('#email').value= currentUser.email ;

    const updateDataBtn = document.querySelector('#update')
    updateDataBtn.classList.add('show')
    addBtn.classList.add('hide')
    updateDataBtn.addEventListener('click', async function() {
        const newName = document.querySelector('#name').value;
        const newEmail = document.querySelector('#email').value;

        if (newName !== null && newEmail !== null){
            await updateDoc(doc(db, "users", id),{
                name: newName,
                email: newEmail
            })

            notify.innerHTML= "Data Updated"
            GetData();
            updateDataBtn.classList.remove('show')
            addBtn.classList.remove('hide')

            document.querySelector('#name').value="" ;
            document.querySelector('#email').value="" ;
   
   
            setTimeout (()=>{
               notify.innerHTML = "";
           }, 1000)
        }
    })
    
   } catch (error) {
    console.log(error);
    
   }

}