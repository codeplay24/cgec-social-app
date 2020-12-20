const postComment = ()=>{
  const commentTextHtml = document.getElementById('commentTextArea')
  const commentText = commentTextHtml.value
  const postId = location.search.split('=')[1]
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/saveComment', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({commentText, postId}))
  xhr.onload = ()=>{
    if(xhr.status===200){
      console.log('hoes')
      location.reload()
    }
  }
}

const logoutClick = ()=>{
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5000/logout', true)
  xhr.send()
  xhr.onload = ()=>{
    if(xhr.status===200){
      console.log('logged out');
      location.reload()
    }
  }
}

const deletePost = ()=>{
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/deletePost', true)
  xhr.setRequestHeader('Content-Type','application/json')
  var postId = location.search.split('=')[1]
  xhr.send(JSON.stringify({postId:postId}))
  xhr.onload = ()=>{
    if(xhr.status===200){
      location.reload()
    }
  }
}

const deleteComment = (commentId)=>{
  const xhr =new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/deleteComment', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({commentId}))
  xhr.onload = function(){
    if(xhr.status===200){
      location.reload()
    }
  }
  console.log(commentId)
}
