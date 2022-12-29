window. scrollTo(0, 0);

let diaryText = document.querySelector('.diaryText')
let buttonSave = document.querySelector('.diary_buttons_save')
let buttonLogin = document.querySelector('.login_button')
let buttonDiary = document.querySelector('.diary_button')
let formLogin = document.querySelector('.sign_in')
let formRegister = document.querySelector('.sign_up')
let loggedIn = false
//let currentUser;

buttonLogin.innerHTML = 'Login'


function saveDiaryText(text) {
    buttonSave.addEventListener('click', ()=> {
        let name = currentUser;
        if (!loggedIn) {
            alert('Please sign in or create an account')
        }
        else {
            userRecords = JSON.parse(localStorage.getItem('records'))?JSON.parse(localStorage.getItem('records')):[]
            localStorage.setItem('text', text)
            window.location.href='index.html'
        }
    })   
} 

function login(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let email, password;
        email = document.getElementById('loginEmail').value 
        password = document.getElementById('loginPassword').value

        let userRecords = [];
        userRecords = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]
        if(userRecords.some((user) => {return user.email == email && user.password == password})){
            alert('you are logged in');
            loggedIn = true;
            buttonLogin.innerHTML = 'Logout'
            showDiary()
            //currentUserArr = userRecords.filter(user => user.email == email)
            //currentUser = currentUser.name
        }
        else{
            alert('login fail')
        }
        form.reset() 
})
}

function register(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let name,email, password;
        name = document.getElementById('fullname').value 
        email = document.getElementById('registerEmail').value 
        password = document.getElementById("registerPassword").value
    
        let userRecords = []
        userRecords = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]
        if(userRecords.some((item) => {return item.name == name })){
            alert('this name is already used by somebody')
        }     
        else if(userRecords.some((item) => {return item.email == email })){
            alert('this email is already used by somebody')
        }
        else{    
            userRecords.push({
                'name':name,
                'email':email,
                'password':password
            })
            localStorage.setItem('users', JSON.stringify(userRecords))
            alert('you are successfully registered')
            loggedIn = true;
            buttonLogin.innerHTML = 'Logout'
            showDiary()
        }
        //currentUser = name;
        form.reset() 
    })

}

function logout(button){
    button.addEventListener('click', () => {
        loggedIn = false;
        buttonLogin.innerHTML = 'Login'
        showDiary()

    })
}

function showDiary() {
    let diary = document.querySelector('.diary_wrapper')
    let login = document.querySelector('.login_wrapper')
    if(loggedIn) {
        diary.style.display='flex'
        login.style.display='none'
        window.location.href='#diary'
    }
    else{
        diary.style.display='none'
        login.style.display='flex'
    }
    console.log(loggedIn)
    
}


register(formRegister)
login(formLogin)
showDiary()
logout(buttonLogin)

buttonDiary.addEventListener('click', () => {
    if(loggedIn){
        buttonDiary.setAttribute('href', '#diary')
    }
    else{
        buttonDiary.setAttribute('href', '#login')
    }
})
