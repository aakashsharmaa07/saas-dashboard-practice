class User{
    constructor(uName,uEmail,uRole){
        this.uName = uName;
        this.uEmail = uEmail;
        this.uRole = uRole;
    }

    viewData(){
        console.log("User Name : ", this.uName);
        console.log("User Email : ", this.uEmail);
        console.log("User Role : ", this.uRole);
    }
}


class Admin extends User {
    constructor(uName,uEmail,uRole){
        super(uName,uEmail,"Admin");
    }
    
    delUser() {
        console.log(`${this.uName} (Admin) deleted a user.`);
    }
}


class Editor extends User {
    constructor(uName,uEmail,uRole){
        super(uName,uEmail,"Editor");
    }
    
    editContent(name,email,role) {
        this.uName = name;
        this.uEmail = email;
        this.uRole = role;
    }

}

let usersArray = [];


let Name = document.querySelector("#nameInput");
let Email = document.querySelector("#emailInput");
let Role = document.querySelector("#roleSelect");
let Btn = document.querySelector("#addBtn");
let userListContainer = document.querySelector("#userList");
let totalUsersBadge = document.querySelector("#totalUsers");

Btn.addEventListener("click", (e) => {
    e.preventDefault(); 

    let uName = Name.value;
    let uEmail = Email.value;     
    let uRole = Role.value;

    if (uName === "" || uEmail === "") {
        alert("Please fill in all fields!");
        return;
    }

    let newUser;
    if (uRole === "Admin") {
        newUser = new Admin(uName, uEmail);
    } else if (uRole === "Editor") {
        newUser = new Editor(uName, uEmail);
    } else {
        newUser = new User(uName, uEmail, uRole);
    }

    usersArray.push(newUser);    

    Name.value = "";
    Email.value = "";

    renderUsers();
});

function renderUsers() {
    userListContainer.innerHTML = "";

    usersArray.forEach((user, index) => {
        let roleClass = user.uRole.toLowerCase();
        let cardHTML = `
            <div class="user-card">
                <div class="user-info">
                    <span class="user-name">${user.uName}</span>
                    <span class="user-email">${user.uEmail}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="role-badge ${roleClass}">${user.uRole}</span>
                    <button onclick="deleteUser(${index})" style="background: rgba(248, 113, 113, 0.15); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.2); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Delete</button>
                </div>
            </div>
        `;

        userListContainer.innerHTML += cardHTML;
    });

    totalUsersBadge.innerText = `${usersArray.length} User${usersArray.length === 1 ? '' : 's'}`;

}

function deleteUser(index) {
    
    usersArray.splice(index, 1);
    renderUsers();
}