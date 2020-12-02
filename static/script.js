let url = 'https://restcountries.eu/rest/v2/all';



let state = {
    'page': 1,
}


trimData = (data, page) => {
    start = (page - 1) * 6;
    end = start + 6
    trimmedData = data.slice(start,end)
    return trimmedData
}


displayData = (data, page)  => {

    console.log(data);
    displayNodes = document.querySelectorAll('.display-col')
    trimmedData = trimData(data,page);
    displayNodes.forEach((node,index) => {
        node.innerHTML =  `<div class="card my-card">` +
                          ` <div class="card-header">${trimmedData[index].name} </div>`+
                          ` <div class="card-body">`+
                  //        `     <h5 class="card-title">${trimmedData[index].name}</h5>`+
                          `     <img src="${trimmedData[index].flag}" style = "width:100%; height:38% ;margin-bottom:10px">`+
                          `     <p class = 'capital'>Capital: ${trimmedData[index].capital}</p>`+
                          `     <p class = 'capital' >Region: ${trimmedData[index].region}</p>`+
                          `     <p class = 'capital'><button class='btn btn-success'>Click For Weather</button> </p>` 
                          
    })


    document.getElementById('btns').innerHTML = ''
    document.getElementById('btns').innerHTML = '<button class="btn btn-primary page-btn" value=0>First</button>'
    for (var i = state.page; i < state.page + 10 && i<=42; i++){
        tempBtn = document.createElement('button');
        tempBtn.classList.add('btn', 'btn-primary', 'page-btn');
        tempBtn.setAttribute('value',i)
        tempBtn.innerHTML = i;
        document.getElementById('btns').append(tempBtn);        // document.getElementById('btns').append(`<button class="btn btn-primary">${i}{</button>`);
    }

    listBtns = document.querySelectorAll('.page-btn').forEach((b) =>{
        b.addEventListener('click', (event)=> {
            console.log(event.target.value);
            event.target.value !=0? state.page = parseInt(event.target.value): state.page = 1;
            console.log(state)
            displayData(JSON.parse(sessionStorage.getItem('myData')), state['page']);
        })
    })
}

async function getData(url){
    try {        
        let res =  await fetch(url);
        let data = await res.json();
        console.log(data) ;
        sessionStorage.setItem('myData', JSON.stringify(data))
        displayData(JSON.parse(sessionStorage.getItem('myData')), state['page']);
    } catch (error) {

        console.log(error);
        
    }
}


getData(url);




