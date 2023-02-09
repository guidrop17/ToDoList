import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./ToDoList.module.css";
import { PlusCircle, ClipboardText } from "phosphor-react";
import LogoToDoList from "../assets/Logo.svg";
import { Task } from "./task/Task";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ITask {
    task: string;
    id: string;
    isChecked: boolean;
  }

export const ToDoList = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [inputValue, setInputValue] = useState("")
    const [taskCounts, setTaskCounts] = useState({ total: 0, completed: 0 });
    const [checked, setChecked] = useState(false)

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("")
        setInputValue(event.target.value)
    };

    const handleAddTask = (event: FormEvent) => {
        event.preventDefault();
        setTaskCounts({...taskCounts, total: taskCounts.total + 1})
        setTasks([...tasks, {task: inputValue, id: uuidv4(), isChecked: checked}])
        setInputValue("")
        toast.info("Tarefa adicionada a lista")
    };

    const handleInputInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("Este campo é obrigatório!")
    };

    const deleteTask = (taskToDelete: string) => {
        const tasksWithoutDeletedOne = tasks.filter((item) => {
            return (
                item.id !== taskToDelete
            )
        })
        setTaskCounts({...taskCounts, total: taskCounts.total - 1, completed: tasksWithoutDeletedOne.length })
        setTasks(tasksWithoutDeletedOne)
        toast.error("Tarefa excluida com sucesso")
    };
    
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        const toggleChecked =
            tasks.map((item) => {
                if(item && item.id === event.target.id){
                    return {...item, isChecked: !item.isChecked};
                }else{
                    return item;
                }
            });
        setTasks(toggleChecked);
        toast.success("Menos uma tarefa na sua lista")

        const tasksCompleted = toggleChecked.filter((item) => item.isChecked === true);

        if(tasksCompleted) {
            setTaskCounts({...taskCounts, completed: tasksCompleted.length})
        }
    }

    return (
        <>
            <header className={styles.header}>
                <img src={LogoToDoList}/>
            </header>

            <section className={styles.section}>
                <form className={styles.taskAdd} onSubmit={handleAddTask}>
                    <textarea 
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    value={inputValue}
                    onChange={handleInputChange}
                    onInvalid={handleInputInvalid}
                    required 
                    />
                    <button type="submit">Criar <PlusCircle size={16}/></button>
                </form>

                    <div className={styles.taskSection}>
                        <div>
                            <p className={styles.tasksCreate}>Tarefas Criadas</p>
                            <p className={styles.taskCount}>{taskCounts.total}</p>
                        </div>
                        <div>
                            <p className={styles.tasksCompleted}>Concluidas</p>
                            <p className={styles.taskCount}>{taskCounts.completed}</p>
                        </div>
                    </div> 
                    {taskCounts.total <= 0 && (
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