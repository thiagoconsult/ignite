import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./TaskForm.module.css";
import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";
import { TaskList } from "./TaskList";
import emptyTask from "../assets/emptyTask.svg";

export interface task {
  id?: string;
  descricao: string;
  isCompleted?: boolean;
  handleRemoveTask: (id: string) => void;
  handleCompletedTask: (id: string) => void;
}

export function TaskForm() {
  const [totalTask, setTotalTask] = useState(0);
  const [totalTaskCompleted, setTotalTaskCompleted] = useState(0);
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(false);
  const [taskList, setTaskList] = useState<task[]>([]);

  function handleDescChange(event: ChangeEvent<HTMLInputElement>) {
    setDesc(event.target.value);
  }

  function handleNewTask(event: FormEvent) {
    event.preventDefault();

    let newTask: task = {
      id: uuidv4(),
      descricao: desc,
      isCompleted: status,
      handleRemoveTask: handleRemoveTask,
      handleCompletedTask: handleCompletedTask,
    };

    if (taskList !== undefined && newTask !== undefined) {
      setTaskList([...taskList, newTask]);
    }

    setTotalTask(totalTask + 1);

    setDesc("");
  }

  function handleRemoveTask(id: string): void {
    const taskListNew = taskList.filter((item) => {
      return item.id !== id;
    });

    setTaskList(taskListNew);

    setTotalTask(totalTask - 1);
    setTotalTaskCompleted(totalTaskCompleted - 1);
  }

  function handleCompletedTask(id: string): void {
    const taskListNew = taskList.map((item) => {
      if (item.id === id) {
        item.isCompleted = true;
      }
      return item;
    });

    setTaskList(taskListNew);

    setTotalTaskCompleted(totalTaskCompleted + 1);
  }

  return (
    <>
      <form onSubmit={handleNewTask} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={desc}
          onChange={handleDescChange}
        />

        <button type="submit">
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <div className={styles.taskList}>
        <header>
          <strong className={styles.taskCreated}>
            Tarefas criadas{" "}
            <span className={styles.taskCount}>{totalTask}</span>
          </strong>
          <strong className={styles.taskCompleted}>
            Concluídas{" "}
            <span className={styles.taskCount}>{totalTaskCompleted}</span>
          </strong>
        </header>

        <div className={styles.content}>
          <div
            className={
              taskList.length > 0
                ? (styles.taskEmpty, styles.inative)
                : styles.taskEmpty
            }
          >
            <img src={emptyTask} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>

          <article className={styles.taskOne}>
            {taskList.map((task) => {
              if (taskList.length > 0) {
                return (
                  <TaskList
                    id={task.id}
                    descricao={task.descricao}
                    isCompleted={task.isCompleted}
                    key={task.id}
                    handleRemoveTask={handleRemoveTask}
                    handleCompletedTask={handleCompletedTask}
                  />
                );
              }
            })}
          </article>
        </div>
      </div>
    </>
  );
}
