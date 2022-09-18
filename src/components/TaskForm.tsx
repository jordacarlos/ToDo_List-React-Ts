import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'

import styles from './TaskForm.module.css';

import {ITask} from '../interfaces/ITask';

type Props = {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
    handleUpdate?(id:number, title:string, dificuldade:number): void
}

const TaskForm = ({btnText, taskList,setTaskList, task, handleUpdate}: Props) => {

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("");
  const [dificuldade, setDificuldade] = useState<number>(0)

  // Salvando nova lista
  useEffect(()=>{
    if(task){
      setId(task.id);
      setTitle(task.title);
      setDificuldade(task.dificuldade);
    }

  }, [task])

  const AddTaskHandler = (e: FormEvent<HTMLFormElement>) =>{

    const hasTask = taskList.find(tasks => tasks.title === title);

    if(hasTask){
      alert("Já existe esse tarefa no seu ToDo!")
      e.preventDefault()
    }
    else{
      if(handleUpdate){
        e.preventDefault()
        handleUpdate(id,title, dificuldade)
      }

      else{
        e.preventDefault();

        const id = Math.floor(Math.random() * 1000)
        const newTask: ITask = {id, title, dificuldade};

        setTaskList!([...taskList, newTask]);
        setTitle("");
        setDificuldade(0);
      }
  }
}

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{

    if(e.target.name === "title"){
      setTitle(e.target.value)
    }else{
      setDificuldade(parseInt(e.target.value));
    }
  };

  return (
    <form className={styles.form} onSubmit={AddTaskHandler}>
        <div className={styles.input_container}>
            <label htmlFor='title'>Tarefa:</label>
            <input type="text" name="title" placeholder='Título da tarefa' onChange={handleChange} value = {title} required />
        </div>
        <div className={styles.input_container}>
            <label htmlFor='dificuldade'>Dificuldade:</label>
            <input type="number" min="1" max="5" name="dificuldade" placeholder='Dificuldade da tarefa' onChange={handleChange} value = {dificuldade}/>
        </div>
        <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm