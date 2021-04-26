const quoteContainer = document.getElementById('quote_container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const socialButton = document.getElementById('social');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const quoteContainerTxt = document.getElementById('quote_container_txt');

function loading() {
    loader.hidden = false;
    quoteContainerTxt.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainerTxt.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        
        if(data.quoteAuthor===""){
            authorText.innerText = ' - Unknown';
        }else {
            authorText.innerText = ' - '+ data.quoteAuthor;
        }

        if(data.quoteText.length>50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        complete();
        
    } catch (error) {
        getQuote();
    }
    
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


newQuote.addEventListener('click',getQuote);
socialButton.addEventListener('click',tweetQuote);

getQuote();