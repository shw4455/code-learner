import styles from "./Left.module.css";
import Tag from "./Tags";

function Left(props) {
    return (
        <div Id={styles.leftContainer}>
            <Tag></Tag>
        </div>
    );
}

export default Left;
