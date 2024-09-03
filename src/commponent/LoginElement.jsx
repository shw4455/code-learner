// import login from "./styles/login.module.css";

function LoginElement(props) {
  return (
    <button className={`${props.element} ${props.style}`}>
      {props.content}
    </button>
  );
}

export default LoginElement;
