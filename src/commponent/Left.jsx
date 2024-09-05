import styles from "./styles/Left.module.css";
import Tag from "../tag";

function Left(props) {
    return (
        <div Id={styles.leftContainer}>
            <Tag></Tag>
        </div>
    );
}

export default Left;
