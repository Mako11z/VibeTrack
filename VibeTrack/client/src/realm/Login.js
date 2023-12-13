import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; //Link Link' is defined but never used
import { UserContext } from "./UserContext"; // Import the app instance
import '../css/login.css';
 
const Login = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 // Retrieve user, fetchUser, and emailPasswordLogin functions from UserContext
 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
 
 const [form, setForm] = useState({ // State to manage form input
   email: "",
   password: ""
 });
 
 // Handle changes in form input fields
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/profile");
 }
 
 // Load user data if user is not already logged in
 const loadUser = async () => {
   if (!user) {
     const fetchedUser = await fetchUser();
     if (fetchedUser) {
       redirectNow();
     }
   }
 }
 
 // Load user data on component mount
 useEffect(() => {
   loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 
 // Handle form submission for login
 const onSubmit = async (event) => {
   try {
     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
   }
 };
 
 return (
  <div class="login-component"  style={{marginTop:"20px", marginBottom:'30px'}}>
    <div class="container-fluid">
    <div class="card card-login" style={{ fontSize: '14px', padding: '0', border: 'none', boxShadow: '0 4px 30px rgba(0,0,0,.05)', borderRadius: '0', fontFamily: 'Segoe UI', width: '800px', margin: '0 auto', position: 'relative' }}>
      <div class="card-body" style={{ padding: '0'}}>
        <div class="row justify-content-center"  style={{color:'#000', display:'flex', gridTemplateColumns: '1fr 1fr', height:'80vh'}}>
        <div class="col-lg-6 col-md-12" style={{ width: '50vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div class="padding bg-primary text-center align-items-center d-flex" style={{display:'flex', background: 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 53%, rgba(226,100,172,1) 100%)', width:'100%', height: '100%', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px' }}>
        <div class="w-100" >
            <div class="logo mb-4" style={{ marginBottom:'20px', display: 'inline-block', padding: '5px', borderRadius: '50%', backgroundColor: '#fff', width: '60px', height: '60px', overflow: 'hidden'}}>
                <img src="https://i.imgur.com/vyOLo4O.png" alt="kodinger logo" class="img-fluid" style={{ width: '50px', maxWidth:'100%', height:'auto'}} />
            </div>
            <h4 class="text-light mb-2" style={{ marginBottom:'20px', color: '#fff', fontSize: '20px', fontFamily: 'Segoe UI' }}>Don't waste your time</h4>
            <p class="lead text-light" style={{ marginBottom:'20px', color: '#fff', fontFamily: 'Segoe UI' }}>Login quickly with Google one-tap signin.</p>
            <button class="btn btn-block btn-icon btn-icon-google mb-3" style={{ color: '#000', backgroundColor: '#fff', borderRadius:'5px' }}>
                Login with Google
            </button>
        </div>

        <div class="help-links" style={{ textAlign: 'center', padding: '0', margin: '0', position: 'absolute', left: '0', bottom: '25px', width: '100%' }}>
            <ul style={{ display: 'inline-block', padding: '0', margin: '0' }}>
                <li style={{ float: 'left', listStyle: 'none', color: '#000' }}><a href="/test" style={{ fontSize: '12px', fontWeight: 400, color: '#fff' }}>Terms of Service &nbsp; </a></li>
                <li style={{ float: 'left', listStyle: 'none', color: '#000' }}><a href="/test" style={{ fontSize: '12px', fontWeight: 400, color: '#fff' }}>Privacy Policy</a></li>
            </ul>
        </div>
    </div>
</div>

          <div class="col-lg-6 col-md-12"  style={{ width: '50vw', display: 'flex', justifyContent: 'center', alignItems: 'center', height:'80vh'}} >
            <div class="padding" style={{width:'100%', height: '100%', padding:'40px'}}>
              <h2>Login</h2>
              <p class="lead" style={{ fontSize: '14px', lineHeight: '24px', marginBottom: '30px', color: '#747474', fontWeight: 400}}>Before you get started, you must login or register if you don't already have an account.</p>
              <form style={{ display: "flex", flexDirection: "column", margin: "auto",  color:'#000', backgroundColor:"#fff"}}>
                <div class="form-group">
                      <TextField
                          label="Email"
                          type="email"
                          variant="outlined"
                          name="email"
                          value={form.email}
                          onChange={onFormInputChange}
                          tabindex="1"
                          style={{ marginBottom: "1rem", backgroundColor:"#fff",  width:'300px'}}
                          inputProps={{ style: { backgroundColor: "#fff" } }}
                      />
                </div>
                <div class="form-group" style={{marginBottom:'30px'}}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={form.password}
                        onChange={onFormInputChange}
                        style={{ marginBottom: "1rem", backgroundColor:"#fff", width:'300px'}}
                        inputProps={{ style: { backgroundColor: "#fff" } }}
                        tabindex="2"
                    />
                    <div class="float-left" style={{float:'left'}}><a href="/signup">Create an account?</a></div>
                    <div class="float-right" style={{float:'right'}}><a href="/security">Forgot Password?</a>
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={onSubmit}  tabindex="3" style={{ backgroundColor: "#e24e99 ", borderRadius:'5px' }}>Login</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
 );
}

export default Login;
