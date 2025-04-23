import {useState} from 'react';
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button,{BUTTON_TYPES_CLASSES} from '../button/button.component'
const SignInForm = () =>{

    const defaultFields = {
        email : '',
        password : ''
    }

    const [formFields,setFormFields] = useState(defaultFields);
    const {email,password} = formFields
    

 
    const resetFormField = () =>{
        setFormFields(defaultFields)
    }

    const signInWithGoogle = async () => {
      await signInWithGooglePopup();
       
        
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const {user} =await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
           
            resetFormField();

        }
        catch(error){
            if(error.code === "auth/invalid-credential" || error.code === "auth/wrong-password"){
                alert("You Entered The Wrong Password")
            }
            console.log("error occured" , error)
        }
    }

    const handlechange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }


    return (
        <div className='sign-up-container'>
            <h2>Already Have an Account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit = {handleSubmit} action="">
                <FormInput label = "Email" type="email" required onChange={handlechange} name="email"value={email} />
                <FormInput label = "Password" type="password" required onChange={handlechange} name="password" value={password}/>
                <div className="buttons-container">
                <Button type ="submit">Sign In</Button>
                <Button type= "button" buttonType= {BUTTON_TYPES_CLASSES.google}onClick ={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
};

export default SignInForm;