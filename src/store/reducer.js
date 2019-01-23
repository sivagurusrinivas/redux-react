const initialState={
    addActive:true,
    updateActive:false,
    deleteActive:false,
    postCount:0,
    posts:[{postId:100,postName:"Hello Hello",postComment:"Hey Redux"}],
    currentPost:{}
}


// const reducer = (state=initialState,action)=>{
//     return state;
// }

const reducer = (state = initialState, action) => {

    if(action.type==='SET_CURRENT_POST'){
        return Object.assign({},state,{
            currentPost:action.payload.post
        }) 
    }
    else if(action.type==='TOGGLE_ADD_FORM'){
        return Object.assign({},state,{
            addActive:true,
            updateActive:false,
            deleteActive:false
        })
    }
    else if(action.type==='TOGGLE_UPDATE_FORM'){
        return Object.assign({},state,{
            addActive:false,
            updateActive:true,
            deleteActive:false
        })
    }
    else if(action.type==='TOGGLE_DELETE_FORM'){
        return Object.assign({},state,{
            addActive:false,
            updateActive:false,
            deleteActive:true
        })
    }
    else if (action.type === 'ADD_POST') {
        const updatedCount = state.postCount + 1;
        return Object.assign({}, state, {
            postCount: updatedCount
        }, {
            posts: [
                ...state.posts, {
                    postId: updatedCount,
                    postName: action.payload.postName,
                    postComment: action.payload.postComment
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
                        postName:action.payload.postName,
                        postComment:action.payload.postComment
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

export default reducer;