import styles from "./ToDoList.module.css";
import { PlusCircle, ClipboardText } from "phosphor-react";
import LogoToDoList from "../assets/Logo.svg";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Task } from "./task/Task";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
    task: string;
    id: string;
    isChecked: boolean;
  }

export const ToDoList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setnewTask] = useState("")
    const [counterTask, setCounterTask] = useState(0)
    const [counterTaskComplete, setCounterTaskComplete] = useState(0)
    const [checked, setChecked] = useState(false)

    const handleNewTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("")
        setnewTask(event.target.value)
    };

    const handleCreateNewTask = (event: FormEvent) => {
        event.preventDefault();
        setCounterTask(counterTask + 1)
        setTasks([...tasks, {task: newTask, id: uuidv4(), isChecked: checked}])
        setnewTask("")
    };

    const handleNewTaskInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("Este campo é obrigatório!")
    };

    const deleteTask = (taskToDelete: string) => {
        const tasksWithoutDeletedOne = tasks.filter((item) => {
            return (
                item.id !== taskToDelete
            )
        })
        setCounterTask(counterTask - 1)
        setTasks(tasksWithoutDeletedOne)

        if(checked === true) {
            setCounterTaskComplete(counterTaskComplete - 1)
        }
    };
    
    const handleCheckboxChange = () => {
        const toggleChecked = (ids: any) => {
            tasks.filter((item) => {
                console.log("id", item)
                console.log("idssss", ids)
                if(item !== ids){
                    console.log("if")
                    return { ...item, isChecked: !checked }
                }else{
                    console.log("else")
                    return item
                }
            });
        };
        
        setTasks(toggleChecked);

        const tasksCompleted = tasks.filter((item) => item.isChecked === true);
        if(tasksCompleted) {
            setCounterTaskComplete(counterTaskComplete + 1)
        }else{
            setCounterTaskComplete(counterTaskComplete - 1)
        }
    }

    return (
        <>
            <header className={styles.header}>
                <img src={LogoToDoList}/>
            </header>

            <section className={styles.section}>
                <form className={styles.taskAdd} onSubmit={handleCreateNewTask}>
                    <textarea 
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    value={newTask}
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required 
                    />
                    <button type="submit">Criar <PlusCircle size={16}/></button>
                </form>

                    <div className={styles.taskSection}>
                        <div>
                            <p className={styles.tasksCreate}>Tarefas Criadas</p>
                            <p className={styles.taskCount}>{counterTask}</p>
                        </div>
                        <div>
                            <p className={styles.tasksCompleted}>Concluidas</p>
                            <p className={styles.taskCount}>{counterTaskComplete}</p>
                        </div>
                    </div> 
                    {counterTask <= 0 && (
                        <div className={styles.taskContent}>
                            <div>
                                <ClipboardText size={56} />
                            </div>
                            <div>
                                <strong>Você ainda não tem tarefas cadatradas</strong>
                            </div>
                            <div>
                                Crie tarefas e organize seus itens a fazer
                            </div>
                        </div>
                    )}
                    <div className={styles.taskContentWhoTasks}>
                        {tasks.map((item) => {
                            return (
                                <Task
                                key={item.task}
                                id={item.id}
                                content={item.task}
                                onChangeValueTask={handleCheckboxChange}
                                onClickDeleteTask={deleteTask}
                                isChecked={item.isChecked}
                                ></Task>
                                )
                            })}
                    </div>
            </section>
        </>
    )
}