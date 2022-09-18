import React, { useState, useEffect } from 'react';
import styles from './App.module.css'

//components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import {ITask} from './interfaces/ITask';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null> (null);

   //Buscando do localStorage
   useEffect(() =>{
    const repoList = localStorage.getItem('newList');
    if(repoList){
      setTaskList!(JSON.parse(repoList));
    }

  },[])

  // Enviando para o localStorage
  useEffect(()=>{
    if(taskList.length <= 0){
      localStorage.clear()
    }else{
      localStorage.setItem('newList', JSON.stringify(taskList));
    }
  },[taskList]);


  const deleteTask = (id: number) =>{
    setTaskList(
      taskList.filter(task =>{
        return task.id !== id
      })
    );
    localStorage.removeItem(JSON.stringify(id));
  }

  const hideorShowModal = (display: boolean) =>{
    const modal = document.querySelector("#modal")
    if(display){
      modal!.classList.remove("hide")
    }else{
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void =>{
    hideorShowModal(true);
    setTaskToUpdate(task)

  }

  const updateTask =(id:number, title:string, dificuldade:number) =>{
    
    const updateTask: ITask = {id, title, dificuldade}

    const updatedItems = taskList.map ((task) =>{
      return task.id === id ? updateTask : task
    })

    setTaskList(updatedItems);

    hideorShowModal(false)
  }

  return (
    <div>
      <Modal children={ <TaskForm 
          btnText='Editar Tarefa' 
          taskList={taskList} 
          task={taskToUpdate}
          handleUpdate= {updateTask}
          /> 
      }  />
      <Header/>
      <div className={styles.main}>
        <h2>Quais são suas tarefas ?</h2>
        <TaskForm 
          btnText = "Criar tarefa" 
          taskList={taskList}
          setTaskList={setTaskList} 
        />

        <h2> Suas tarefas</h2>
        <TaskList
          taskList={taskList}
          handleDelete ={deleteTask}
          handleEdit = {editTask}
        />
      </div>
      <Footer/>
      

    </div>
  );
}

export default App;