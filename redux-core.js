const redux = require('redux');

const createStore = redux.createStore

const initialState = {
    postCount: 0,
    posts: []
}

//Reducer
const postReducer = (state = initialState, action) => {
    if (action.type === 'ADD_POST') {
        const updatedCount = state.postCount + 1;
        return Object.assign({}, state, {
            postCount: updatedCount
        }, {
            posts: [
                ...state.posts, {
                    postId: updatedCount,
                    name: action.payload.post,
                    comment: action.payload.comment
                }
            ]
        })
    }
    else if(action.type === 'UPDATE_POST'){
        return Object.assign({},state,{
            posts:state.posts.map((post)=>{
                if(post.postId===action.payload.postId){
                    return {
                        ...post,
                        name:action.payload.post,
                        comment:action.payload.comment
                    }
                }
                return post
            })
        })
    }
    else if(action.type==='DELETE_POST'){
        return Object.assign({},state,{
            posts:state.posts.filter((post)=>post.postId!==action.payload.postId)
        })
    }
    return state;
}

//Store
const store = createStore(postReducer);
console.log(store.getState())


//Dispachers
store.dispatch({
    type: 'ADD_POST',
    payload: {
        post: 'Hi Hello there',
        comment: 'YES YES'
    }
});
store.dispatch({
    type: 'ADD_POST',
    payload: {
        post: 'Hi Hello there',
        comment: 'YES YES'
    }
});
store.dispatch({
    type: 'ADD_POST',
    payload: {
        post: 'Hi Hello there',
        comment: 'YES YES'
    }
});
store.dispatch({
    type: 'UPDATE_POST',
    payload: {
        postId: 1,
        post: 'Hi Hello there-Updated',
        comment: 'YES--YES'
    }
});
store.dispatch({
    type: 'DELETE_POST',
    payload: {
        postId: 2
    }
});

console.log(store.getState())
//Subscribers