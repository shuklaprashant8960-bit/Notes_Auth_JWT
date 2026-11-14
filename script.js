

async function signup(){
    const username= document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

   const response = await axios.post("http://localhost:3000/signup",{
        username: username,
        password: password
    })
    alert(response.data)


}

async function signin(){
    const username= document.getElementById("signin-username").value;
    const password= document.getElementById("signin-password").value;

   const response = await axios.post("http://localhost:3000/signin",{
        username: username,
        password: password
    })
    localStorage.setItem("token", response.data.token);
    alert(response.data.message);
    await getDashboard();
}
async function getDashboard(){
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:3000/dashboard", {
            headers: {
                token: token
            }
        });
        if(response.status === 200){
            document.getElementById("signin").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        }
    }





async function addNote() {
    const note = document.getElementById("note-input").value;
    const notesList = document.getElementById("notes-list");

    const token = localStorage.getItem("token");
    const response= await axios.post("http://localhost:3000/notes", {
        note: note
    }, {
        header: {
            token: token
        }
    })

    const noteElement = document.createElement("p");
    noteElement.innerText = note;

    notesList.appendChild(noteElement);
}