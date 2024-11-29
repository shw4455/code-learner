import styles from "./Checkcard.module.css";

function Checkcard(props) {
  return (
    <a className={styles.chooseFlexContainer} href="">
      <div className={styles.chooseElementContainer}>
        <img className={styles.chooseIcon} src={props.image} alt="이미지" />
        <div className={styles.textContainer}>
          <div className={styles.chooseText}>{props.text}</div>
        </div>
      </div>
    </a>
  );
}

export default Checkcard;
