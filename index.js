

console.log(urls)
let data=[]

async function fetchJSONdata(rsslink) {
    let res =await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rsslink}`)
    console.log(`https://api.rss2json.com/v1/api.json?${rsslink}`)
    return await res.json()
}

async function loadData() {
    let final=[]
    // console.log(magazines)
    for (let item of urls) {
        console.log(item)
        let res = await fetchJSONdata(item)
        final.push(res)
    }
    final = await Promise.all(final)
    console.log(final)
    return final
}


async function loadToDom() {
    let acc = document.querySelector('.accordion')
    let data=await loadData()
    console.log('data',data.length)
    for (let i = 0; i < data.length; i++) {
        let main=data[i]
        let accElement = document.createElement('div')
        let headerNames=['Politics',"Space","Sports"]
        accElement.setAttribute('class', 'accordion-item')
             accElement.innerHTML = `
            <h2 class="accordion-header" id="heading-${i}">
                                        <button class="accordion-button ${i!=0 ? 'collapsed':''}" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapse-${i}" aria-expanded="${i!=0 ? 'false':'true'}" aria-controls="collapse-${i}">
                                                <p class="acc-header">${headerNames[i]}</p>
                                        </button>
                                </h2>
                                <div id="collapse-${i}" class="accordion-collapse ${i!=0 ? 'collapsed collapse':'collapse show'} " aria-labelledby="heading-${i}"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                                <div id="carouselExampleControls-${i}" class="carousel slide" data-bs-ride="carousel">
                                                        <div class="carousel-inner">
                                                            
                                                        </div>
                                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-${i}" data-bs-slide="next">
                                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                <span class="visually-hidden">Next</span>
                                                        </button>
                                        
                                                
                                                </div>
                                                    

                                        </div>
                                </div>
            `
        let carousel = accElement.querySelector('.carousel-inner')
        console.log(carousel)
        function parseDate(inpDate) {
            let date = new Date(inpDate);

                var options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric"
                };
             return date.toLocaleString('en-IN',options)
        }
        for (let i = 0; i < main.items.length; i++) {
            topic=main.items[i]
            let counter
            let carouselEl = document.createElement('div')
            carouselEl.setAttribute('class',i==0 ? 'carousel-item active' :'carousel-item')
            // carouselEl.setAttribute('id','carouselExampleControls')
            // carouselEl.setAttribute('data-bs-ride', 'carousel')
            carouselEl.innerHTML = `
                                <a href="${topic.link}">
                                <img src="${topic.enclosure.link}" class="d-block w-100" alt="...">
                                <p class='article-heading'>${topic.title}</p>
                                <p class='author-and-date'>${topic.author}   <span>•</span>  ${parseDate(topic.pubDate)}</p>
                                <p class='art-content'>${topic.content}</p>
                                </a>
            `
            carousel.appendChild(carouselEl)
            counter++
        }
        acc.appendChild(accElement)
    }
   
}



loadData()

loadToDom()