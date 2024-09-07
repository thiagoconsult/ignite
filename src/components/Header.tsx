import styles from "./Header.module.css";
import todoLogo from "../assets/todo-logo.svg";

export function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={todoLogo} alt="TODO Logotipo" />
      <div className={styles.title}>
        <span className={styles.titleTo}>to</span>
        <span className={styles.titleDo}>do</span>
      </div>
    </div>
  );
}
