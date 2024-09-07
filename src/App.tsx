import { Header } from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import { TaskForm } from "./components/TaskForm";

export function App() {
  return (
    <>
      <Header />
      <article className={styles.wrapper}>
        <main>
          <TaskForm />
        </main>
      </article>
    </>
  );
}

export default App;
