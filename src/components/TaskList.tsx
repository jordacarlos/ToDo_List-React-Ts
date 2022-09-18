import React from 'react'
import {ITask} from '../interfaces/ITask';
import styles from './TaskList.module.css'

type Props = {
  taskList: ITask[];
  handleDelete(id:number): void
  handleEdit(task: ITask):void
}

const TaskList = ({taskList, handleDelete,handleEdit}: Props) => {
  return (
    
    <>
    <hr />
    {taskList.length > 0 ? (
      taskList.map((task) => (
       
        <div key={task.id} className={styles.task}>
           <div className={styles.title}>
           <h5>Dificuldade: {task.dificuldade}</h5>
            <p>{task.title}</p>
            
          </div>
          <div className={styles.actions}>
            <i className='bi bi-pencil' onClick={() => handleEdit(task)} />
            <i className='bi bi-trash' onClick={() => {handleDelete(task.id)}} />
          </div>

        </div>
      ))
    )
    :
    (
      <div>
        <br />
        <p className={styles.title}>Não há Tarefa cadastradas</p>
      </div>
      
    )}
    </>
  )
}

export default TaskList