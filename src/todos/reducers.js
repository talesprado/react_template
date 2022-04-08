import { 
    CREATE_TODO, 
    REMOVE_TODO, 
    COMPLETE_TODO, 
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE
 } from "./actions";

 const initialState = { isLoading : false , data : [] }

export const todos = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_TODO: {
        const { todo } = payload;
        return { 
            ...state,
            data: state.data.concat(todo)
        };
    }
    case REMOVE_TODO: {
        const { text } = payload;
        return {
            ...state,
            data: state.data.filter(todo => todo.text !== text)
        };
    }
    case COMPLETE_TODO: {       
        const  { todo: completedTodo } = payload;
        return {
            ...state,
            data: state.data.map(todo => {                
                if ( todo.TodoId === completedTodo.TodoId ){
                    return  completedTodo ;
                }
                return todo;
            })
        };
        
    }
    case LOAD_TODOS_SUCCESS:{
        const { todos } = payload;
        return {
            ...state,
            isLoading: false,
            data: todos
        };
    }
    case LOAD_TODOS_IN_PROGRESS:
        return {
            ...state,
            isLoading: true
        }
    case LOAD_TODOS_FAILURE:
        return {
            ...state,
            isLoading: false
        }
    default:
        return state;
    }

}