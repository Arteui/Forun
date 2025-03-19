const items = document.querySelector('.forum__items');



const comments = [
    {
        text: "Пиздец, я знаю этого чела. Мы с ним бухали однажды, так вот он разбил на бухаловке каждому ебальник, потому что кто-то рассказал ему не смешной анекдот. Моя жена до сих пор в больнице лежит из-за того случая",
        id: 0,
        children: [
                {
                text: "Ебать вы терпилы, он мне тоже насолил, так я ему из-за этого камень в огород кинул",
                id: 1,  
                children: [
                    {
                        text: "Иди нахуй, ты не был в нашей ситуации, хули ты тут распизделся",
                        id: 2,  
                        children: null
                    },
                    {
                        text: "Странно, что ты ещё пизды не получил",
                        id: 3,  
                        children: [ {
                            text: "Уже получил",
                            id: 4,  
                            children: null
                        }]
                    },
                    {
                        text: "Ну нихуя себе ты выёбистый",
                        id: 5,  
                        children: null
                    },
                ]
            }
        ],
    },
    {
        text: "ЭТА ГНИДА СОЖГЛА МОЙ ДОМ. ПРОСТО ТАК!!! БЕЗ ПРИЧИН!!! МЫ УЖЕ КУДА ТОЛЬКО НЕ ОБРАЩАЛИСЬ, НО НИКТО НИЧЕГО СДЕЛАТЬ НЕ МОЖЕТ",
        id: 6,
        children: [{
            text: "Пизди больше, я в новостях видел, что он твой дом сжог, потому что ты умный дохуя, мразь ты ебаная, книги читать любишь, кучу статей написал по естественным наукам, какие то эксперементы проводил, лекарства всякие придумывал, а впрочем ты ничо такой)))",
            id: 7,  
            children: null
        },
        {
            text: "САМ ТЫ ГНИДА, а Данил прекрасный парень, помню, я до мужиков доебался а то хули они веселые были, а я нет. Так вот он помог мне и наебашил им, но правда я не понял, почему потом он меня отпиздил, но мне понравился этот парень",
            id: 8,  
            children: null
        }],
    }
]

items.insertAdjacentHTML('beforeend', render(comments))
items.insertAdjacentHTML('beforeend', GetMainAnswer())


 

items.onclick = function(event) {
    if (event.target.dataset.type === "otvet") { 
        const comment = event.target.closest('.comment');
        const answerBlock = comment.querySelector('.answer');
        const answerInp = comment.querySelector('.answer__input'); 

        if (answerBlock) {
            answerInp.value = ''
            answerBlock.classList.toggle('answer-active'); 
            
        }
    }
    if (event.target.dataset.type === "close") { 
        const comment = event.target.closest('.comment');
        const answerBlock = comment.querySelector('.answer'); 

        if (answerBlock) {
            answerBlock.classList.toggle('answer-active'); 
        }
    }
    if (event.target.dataset.type === "send") { 
        const comment = event.target.closest('.comment');
        const answerInp = comment.querySelector('.answer__input'); 
    
        if (answerInp) {
            const index = event.target.dataset.index;
            const newComment = {
                text: answerInp.value,
                id: Date.now(), 
                children: null
            };
    
            AddComment(comments, index, newComment);
    
            items.innerHTML = GetCommentBase(); 
            items.insertAdjacentHTML('beforeend', render(comments))
            items.insertAdjacentHTML('beforeend', GetMainAnswer())



        }
    }


    if (event.target.dataset.type === "MainSend") { 
        const text = MainInput.value
        comments.push({text: text, id: Date.now(), children: null })
    
        items.innerHTML = GetCommentBase(); 
        items.insertAdjacentHTML('beforeend', render(comments))
        items.insertAdjacentHTML('beforeend', GetMainAnswer())
    }
    if (event.target.dataset.type === "MainClose") { 
        MainInput.value = ''
        
    }

}

function AddComment(comments, index, newComment) {
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id == index) { 
            if (!comments[i].children) { 
                comments[i].children = []; 
            }
            comments[i].children.push(newComment);
            return;     
        } 

        if (comments[i].children) {
            AddComment(comments[i].children, index, newComment);
        }
    }
}



function render(comments) {
    let html = ""

    for (let i = 0; i < comments.length; i++) {
        let temp = ""
        if (comments[i].children) {
            temp = render(comments[i].children)
        }
        html = html + GetCommentTemplation(comments[i].text, comments[i].id, temp)
    }
    return html

}


function GetCommentBase() {
    return `<div class="comment__first"> 
                <div class="comment__item">
                    <div class="comment__main">
                        <div class="comment__row"> 
                            <img class="comment__img" src="img/admin.png"> 
                            <p class="comment__author">Администратор</p>
                        </div>
                        <p class="comment__text">Дорогие коллеги, попрошу вас быть на этом сайте вежливыми, конструктивными и доброжелательными. Это место не для ссор и разногласий. и пожалуйста, не используйте нецензурные слова.</p>
                        <div class="comment__buttons">
                        </div>
                    </div>
                </div>
                <div class="answer">
                    <div class="answer__wrapper">
                        <textarea rows="10" class="answer__input" placeholder="Ответ на сообщение..."></textarea>
                        <div class="answer__buttons">
                            <button class="comment__button answer__cancel">Отмена</button>
                            <button class="comment__button answer__send">Отправить</button>
                        </div>
                    </div>
                </div>
                <div class="comment__chlidrens">
                    
                  <div class="comment"> 
                    <div class="comment__item">
                        <div class="comment__main">
                            <div class="comment__row"> 
                                <img class="comment__img" src="img/anon.png"> 
                                <p class="comment__author">Аноним</p>
                            </div>
                            <p class="comment__text">Иди нахуй</p>
                            <div class="comment__buttons">
                            </div>
                        </div>
                    </div>
                    <div class="answer">
                        <div class="answer__wrapper">
                            <textarea rows="10" class="answer__input" placeholder="Ответ на сообщение..."></textarea>
                            <div class="answer__buttons">
                                <button class="comment__button answer__cancel">Отмена</button>
                                <button class="comment__button answer__send">Отправить</button>
                            </div>
                        </div>
                    </div>
                    <div class="comment__chlidrens">
                        
                    </div>
                  </div>

                  <div class="comment"> 
                    <div class="comment__item">
                        <div class="comment__main">
                            <div class="comment__row"> 
                                <img class="comment__img" src="img/anon.png"> 
                                <p class="comment__author">Аноним</p>
                            </div>
                            <p class="comment__text">АДМИН СОСИ МОЙ ХУЙ БЫДЛО ЕБУЕЕ</p>
                            <div class="comment__buttons">                            </div>
                        </div>
                    </div>
                    <div class="answer">
                        <div class="answer__wrapper">
                            <textarea rows="10" class="answer__input" placeholder="Ответ на сообщение..."></textarea>
                            <div class="answer__buttons">
                                <button class="comment__button answer__cancel">Отмена</button>
                                <button class="comment__button answer__send">Отправить</button>
                            </div>
                        </div>
                    </div>
                    <div class="comment__chlidrens">
                        
                    </div>
                  </div>

                </div>
            </div>`
}


function GetMainAnswer() {
    return `<div class="answer__main">
              <div class="answer__wrapper__main">
                  <textarea rows="10"  class="answer__input" id = "MainInput" placeholder="Ваш комментарий..."></textarea>
                  <div class="answer__buttons">
                      <button data-type = "MainClose" class="comment__button answer__cancel">Отмена</button>
                      <button data-type = "MainSend" class="comment__button answer__send" >Отправить</button>
                  </div>
              </div>`
}


function GetCommentTemplation(text, index, temp) {
    return `<div class="comment"> 
                <div class="comment__item">
                    <div class="comment__main">
                        <div class="comment__row"> 
                            <img class="comment__img" src="img/anon.png"> 
                            <p class="comment__author">Аноним</p>
                        </div>
                        <p class="comment__text">${text}</p>
                        <div class="comment__buttons">
                            <button data-type = "otvet" data-index = "${index}" class="comment__button">Ответить</button>
                        </div>
                    </div>
                </div>
                <div class="answer">
                    <div class="answer__wrapper">
                        <textarea rows="10" class="answer__input" placeholder="Ответ на сообщение..."></textarea>
                        <div class="answer__buttons">
                            <button data-index = "${index}" data-type = "close" class="comment__button answer__cancel">Отмена</button>
                            <button data-index = "${index}" data-type = "send" class="comment__button answer__send">Отправить</button>
                        </div>
                    </div>
                </div>
                <div class="comment__chlidrens">
                ${temp = (temp) ? temp : ''}
                </div>
            </div>`
}







// const { MongoClient, ServerApiVersion } = require('mongodb');

// const url = "mongodb+srv://tema333345:qwerty123@cluster0.gz8dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// const client = new MongoClient(url);


// async function start() {
//     try {
//         await client.connect()
//     } catch(err) {
//         console.log(err)
//     }
// }

// start()







