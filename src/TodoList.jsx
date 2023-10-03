import React, { useState, useEffect} from 'react'
import './TodoList.css';
import Icone from './assets/icone.jpg';

function TodoList() {
    const listaStorage = localStorage.getItem("Lista");

    const [lista, setLista] = useState(listaStorage?JSON.parse(listaStorage):[]);
    const [tarefa, setTarefa] = useState("");

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista))
    },[lista])

    function adicionarTarefa(form) {
        form.preventDefault();
        if (!tarefa) {
            return;
        }
        setLista([...lista, { texto: tarefa, completada: false }]);
        setTarefa("");
        document.getElementById('input-tarefa').focus();
    }

    function concluirTarefa(index){
        const listaAux = [...lista];
        listaAux[index].completada = !listaAux[index].completada;
        setLista(listaAux);
    }

    function remover(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function removerTodos(){
        setLista([]);
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adicionarTarefa}>
                <input id='input-tarefa' type='text' placeholder='Digite uma tarefa' value={tarefa} onChange={(e) => { setTarefa(e.target.value) }}></input>
                <button className='adicionar'>Adicionar</button>
            </form>
            <div className='listaTarefas'>
                <div>
                    {
                        lista.length < 1 ?
                            <img src={Icone}></img>
                            :
                            
                            lista.map((item, index) => (
                                
                                <div key={index} className={item.completada ? "item Concluido" : "item"} 
                                >
                                    <span onClick={()=>{concluirTarefa(index)}}>{item.texto}</span>
                                    <button onClick={()=>{remover(index)}} className='Deletar'>Deletar</button>
                                </div>
                            ))
                            
                    }
                    {
                        lista.length > 0 &&
                        <button className='DeletarTodos' onClick={()=>{removerTodos()}}>Deletar Todos</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default TodoList