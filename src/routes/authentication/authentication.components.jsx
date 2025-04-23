import SignUpForm from "../../Component/sign-up-form/sign-up-form.componnet";
import SignInForm from "../../Component/sign-in-form/sign-in-form.componnet";
import './authentication.styles.scss'
const Authentication = () =>{

  return (
      <div className="authentication-container">
          <SignInForm />
          <SignUpForm />
      </div>
  );
};


export default Authentication;