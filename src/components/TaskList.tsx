import styles from "./TaskList.module.css";
import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";
import { task } from "./TaskForm";

export function TaskList({
  id,
  descricao,
  isCompleted,
  handleRemoveTask,
  handleCompletedTask,
}: task) {
  function onRemove() {
    if (id) {
      handleRemoveTask(id);
    }
  }

  function onCompleted() {
    if (id) {
      handleCompletedTask(id);
    }
  }

  return (
    <>
      <div className={styles.list}>
        <div className={styles.task}>
          <span hidden={true} title="id">
            {id}
          </span>
          <button className={styles.status} onClick={onCompleted}>
            {isCompleted ? (
              <CheckCircle size={20} weight="fill" />
            ) : (
              <Circle size={20} />
            )}
          </button>
          <p>{descricao}</p>
          <button onClick={onRemove} className={styles.trash}>
            <Trash size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
