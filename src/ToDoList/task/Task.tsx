import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { useState, ChangeEvent } from "react";

interface TaskProps {
    id:string;
    content: string;
    isChecked: boolean;
    onClickDeleteTask: (idTask:string, task: string, checkedTask: boolean) => void;
    onChangeValueTask:  (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Task = ({content, onClickDeleteTask, onChangeValueTask, isChecked, id}: TaskProps) => {
    const [check, setCheck] = useState(isChecked)

    const handleDeleteTask = () => {
        onClickDeleteTask(id, content, isChecked);
    }

    const handleChangeValueTask = (event: ChangeEvent<HTMLInputElement>) => {
        setCheck(event.target.checked);
        onChangeValueTask(event);
    };
    
    return (
            <div className={check ? styles.disabled : styles.task} >
                <div className={styles.taskCheck} > 
                    <input type="checkbox" id={id} onChange={handleChangeValueTask} checked={check} />
                    <span className={styles.checkmark} />
                </div>
                <div>
                    <p>{content}</p>
                </div>
                <button onClick={handleDeleteTask}>
                    <Trash size={18}/>
                </button>
            </div>
    )
}