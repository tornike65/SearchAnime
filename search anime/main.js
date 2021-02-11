// class WebWorker{
//     static delegateAction;

//     static sendHttpRequest(){
//         var webWorker = new XMLHttpRequest();
//         webWorker.open("GET","https://official-joke-api.appspot.com/random_ten",true); // false
//         webWorker.onloadstart = function(){
//             console.log("Request has started");
//         }
//         webWorker.onloadend = function(){
//             var objects = JSON.parse(webWorker.responseText);
//             WebWorker.delegateAction(objects) //action
//         }
//         webWorker.send();
//     }  
// }


// // class RendererService 
// // {
// //     static RenderCollectionInHtml(collection){
// //         var area = document.querySelector(".jokes");
// //         collection.forEach(o => {
// //             area.innerHTML += RendererService.getObjHtml(o);
// //         });
// //     }


// //     static getObjHtml(obj){
// //         return `<tr>
// //                     <th scope="row">${obj.id}</th>
// //                     <td>${obj.type}</td>
// //                     <td>${obj.setup}</td>
// //                     <td>${obj.punchline}</td>
// //                 </tr>`
// //     }
// // }


// // class ViewController
// // {
// //     constructor(){
// //         this.startUp();
// //     }

// //     startUp(){
// //         WebWorker.sendHttpRequest(RendererService.RenderCollectionInHtml);
// //     }
// // }

// // WebWorker.delegateAction = RendererService.RenderCollectionInHtml;
// // var viewController = new ViewController();
// // var r = new Array();
// // r.filter(o => {
// //     return o % 2 == 0;
// // })



// // https://api.jikan.moe/v3/search/anime?q=deathnote&limit=50

class LoadingController {
    static startLoading(){
        var body = document.querySelector("body");
        var loading = document.querySelector(".loading");
        body.style.overflow = "hidden";
        loading.style.display = "flex"
    }


    static endLoading(){
        var body = document.querySelector("body");
        var loading = document.querySelector(".loading");
        body.style.overflow = "scroll";
        loading.style.display = "none"
    }
}

class WebWorkerService
{
    static getDataFromApi(apiUrl,func){
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET",`https://api.jikan.moe/v3/search/anime?q=${apiUrl}`,true);
        xmlHttpRequest.onloadstart = function(){
            LoadingController.startLoading();
        }
        xmlHttpRequest.onloadend = function(){
            var data = JSON.parse(xmlHttpRequest.responseText);
            console.log(data);
            ViewController.renderAnimesOnView(data);
            LoadingController.endLoading();
        }
        xmlHttpRequest.send();
    }
}


class ViewController
{
    apiUrl = 'https://api.jikan.moe/v3/search/anime?q=';
    constructor(){
        this.addListenerToSearchBtn();
    }

    addListenerToSearchBtn(){
        var btn = document.querySelector("#search");
        var animeNameInp = document.querySelector("#animeName");
        btn.addEventListener("click",function(){
            WebWorkerService.getDataFromApi(animeNameInp.value);
        });
    }

    static renderAnimesOnView(collection){
        var cardArea = document.querySelector(".card-area");
        cardArea.innerHTML = null;
        console.log(collection.results);
        collection.results.forEach(element => {
            cardArea.innerHTML += ViewController.getCardHtml(element);
        });
    }

    static getCardHtml(obj){
        return `<div class="card" style="width: 18rem;">
                    <img src="${obj.image_url}"
                        class="card-img-top" alt="https://images.unsplash.com/photo-1584796892527-c5e33f03eff5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60">
                    <div class="card-body">
                        <h5 class="card-title">${obj.title}</h5>
                        <p class="card-text">${obj.synopsis}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${obj.start_date}</li>
                        <li class="list-group-item">${obj.end_date}</li>
                        <li class="list-group-item">Score : ${obj.score}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${obj.url}" class="card-link">
                            <button class="btn btn-dark btn-block btn-lg">Go to anime</button>
                        </a>
                    </div>
                </div>`;
    }
}

var viewController = new ViewController();