const todos = [];
const addTodo = (req, res)=>{
    try{
        let newTodo = {
            "id" : Date.now(),
            "todo" : req.body.todo,
            "isCompleted" : false
        }
    
        if(!newTodo.todo){
          return res.status(400).json({error: "The todo field is required"})
        }
        todos.push(newTodo)
        res.status(200).json({data : newTodo});
    }catch(e){
        res.status(500).json({error: "Server Error"})
    }
}


const getTodos = (req, res)=>{
    try{
        let {page = 1, limit = 5} = req.query

        page = parseInt(page);
        limit = parseInt(limit);

        const startIndex = (page - 1)*limit;
        const endIndex = page*limit;

        const results = todos.slice(startIndex, endIndex)

        let totolTodo = todos.length;
        let totalPages = Math.ceil(totolTodo/limit);

        res.status(200).json({data: results, totolTodo, totalPages})
    }catch(error){
        res.status(500).json({error : "Server Error"})
    }
}

const getTodo = (req, res)=>{
    try{
        const id = req.params.id
        if(!id){
          return  res.status(400).json({message : "please give valid id"})
        }
        const findTodo = todos.find((todo)=> id == todo.id)
        if(!findTodo){
           return res.status(404).json({message : "Cannot find the requested todo"})
        }
        res.status(200).json({data : findTodo})
    }catch(error){
        res.status(500).json({error : "Server Error"})
    }  
}

const updateTodo = (req, res)=>{
   try{
    const id = req.params.id
    if(!id){
        return res.status(400).json({message : "id is not valid"})
    }
    const findTodo = todos.find((todo)=>id == todo.id)
    if(!findTodo){
        return res.status(404).json({error : "The task you are looking for is not available" })
    }

    let { todo, isCompleted } = req.body

    if(todo === undefined){
        return res.status(400).json({error : "todo field is required"})
    }
    if(todo !== undefined){
        findTodo.todo = todo
    }
    if(isCompleted !== undefined && typeof isCompleted === 'boolean'){
        findTodo.isCompleted = isCompleted
    }else{
        res.json({message : "isCompleted should be in boolean"})
    }
    res.status(200).json({data: findTodo, message: "Todo is updated"});
   }catch(error){
        res.status(500).json({error: "Server Error"})
   }
}

const deleteTodo = (req, res) => {
    try{
        const id = req.params.id;
    if(!id){
        return res.status(400).json({message : "id is not valid"})
    }
    const findTodo = todos.find((todo)=>id == todo.id)
    if(!findTodo){
        return res.status(404).json({error : "The task you are looking for is not available" })
    }
    const index = todos.indexOf(findTodo)
    const deletedTodo = todos.splice(index, 1)[0]
    res.status(200).json({data: deletedTodo, message : "Todo is deleted"});
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
}

module.exports = {
    addTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}