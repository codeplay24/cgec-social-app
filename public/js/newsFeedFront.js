const table = document.getElementById('newsFeedTable')
const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:5000/getpost', true)
xhr.send()
xhr.onload = ()=>{
  if(xhr.status===200){
      onLoadFunction(xhr)
  }
}

const onLoadFunction = (xhr)=>{
  let postArray = JSON.parse(xhr.response)
  postArray.reverse()
  iterator(0,postArray)
  let button = document.getElementById('frontClicked')
  let button1 = document.getElementById('backClicked')
  let pageNumber = 0;
  let totalRequests = postArray.length
  let totalPossiblePages = Math.floor(totalRequests/10)

  if(totalRequests%10!=0){
    totalPossiblePages +=1
  }
  button.addEventListener('click', ()=>{
    pageNumber+=1;
    if(pageNumber>=totalPossiblePages){
      pageNumber-=1;
      return
    }

    iterator(pageNumber*10,postArray)
  })
  button1.addEventListener('click', ()=>{
    pageNumber-=1;
    if(pageNumber<0){
      pageNumber+=1
      return
    }
    iterator(pageNumber*10, postArray)
  })
}

const iterator = (start, postArray)=>{
  var j = 0;
  if(start>=postArray.length){
    return;
  }
  for(var i =start; i<start+10; i++){
    if(i>=postArray.length){
      break;
    }
    var target = document.getElementById(`post${j+1}`)
    var html = `<a href='http://localhost:5000/openPost?_id=${postArray[i]._id}'><h4>${postArray[i].user_name} from ${postArray[i].depertment} requested a book for ${postArray[i].semester} on ${postArray[i].subject}</h4></a>`
    target.innerHTML = html
    j=j+1;
  }
  for(var i =j; i<10; i++){
    var target = document.getElementById(`post${i+1}`)
    target.innerHTML = ''
  }
}

const openPost = (postId)=>{
  const element = document.getElementById(postId)
  let html = element.innerHTML
  const id = idScrapper(html)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/openPost', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({postId:id}))
  //console.log(idScrapper(html).trim())
}

const idScrapper = (html)=>{
  const arr = html.split(' ')
  const subString = arr[1]
  var q = 0
  var id = ' '
  for(var i =0; i<subString.length; i++){
    if(subString[i]==="\"" && q===0){
      q =1;
    }else if(q===1 && subString[i]!=="\""){

      id+=subString[i]
    }else if(q===1 && subString[i]==="\""){
      return id
    }
  }
}



const logoutClick = ()=>{
  xhr.open('GET', 'http://localhost:5000/logout', true)
  xhr.send()
  xhr.onload = ()=>{
    if(xhr.status===200){
      console.log('logged out');
      location.reload()
    }
  }
}




const optionTag = document.getElementById('depts');
const optionTag2 = document.getElementById('sem');
optionTag2.addEventListener('click', m2);
var f1 = 0
function m2(){
  f1++;
  console.log(f1)
  if(f1%2===0){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/try', true)
    const searchQueries = {
      dept: optionTag.value,
      sem: optionTag2.value
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    const jsonObj = JSON.stringify(searchQueries)
    xhr.send(jsonObj)
    xhr.onload = function(){
      if(xhr.status==200){
        const subjects = xhr.response
        const subjectArray = subjects.split(',')
        var htmlElement='';
        subjectArray.forEach((item) => {
          htmlElement+="<option>"+item+"</option>"
        });
        document.getElementById('subjects').innerHTML = htmlElement
      }
    }

    //f1 = 0;
  }
}
