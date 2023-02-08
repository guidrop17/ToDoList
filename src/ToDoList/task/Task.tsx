import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface TaskProps {
    id:string;
    content: string;
    isChecked: boolean;
    onClickDeleteTask: (idTask:string, task: string, checkedTask: boolean) => void;
    onChangeValueTask: any;
}

export const Task = ({content, onClickDeleteTask, onChangeValueTask, isChecked, id}: TaskProps) => {
    const [disabled, setDisabled] = useState(false);

    const handleDeleteTask = () => {
        onClickDeleteTask(id, content, isChecked);
    }

    const handleChangeValueTask = () => {
        setDisabled(!disabled)
        onChangeValueTask();
    };

    return (
            <div className={disabled ? styles.disabled : styles.task} >
                <div className={styles.taskCheck} > 
                    <input type="checkbox" id={id} onChange={handleChangeValueTask} checked={isChecked} />
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