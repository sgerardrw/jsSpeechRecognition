var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;




const mic = document.querySelector('.box-cart')
const para = document.querySelector('.p-welcome');
const btn = document.querySelector(".btn");

mic.addEventListener('click', (e) => {
  dictate();  
});


const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    
    console.log(`You said: ${speechToText}`);

    if (event.results[0].isFinal) {

      if (speechToText.includes('next image')) {
          speak(`displaying next image`);
          index(+1)
      } 
      else if (speechToText.includes('change text')) {
          speak(`changing text`);
          if (para.classList.contains('font1')){
            para.classList.remove('font1')
            para.classList.add('font2')

          } else if (para.classList.contains('font2')){
            para.classList.remove('font2')
            para.classList.add('font1')

          }
      } 
      else if (speechToText.includes('change color') || speechToText.includes('change colour')) 
      {
          speak(`changing color`);
          if (btn.classList.contains('btn-primary')){
            btn.classList.remove('btn-primary')
            btn.classList.add('btn-warning')

          } else if (btn.classList.contains('btn-warning')){
            btn.classList.remove('btn-warning')
            btn.classList.add('btn-primary')

          }
      } 
      else {
        speak(`Please speak one of the commands given above.`);
      }
           
      
    }
  }
//https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start
recognition.onspeechend = function() {
  recognition.stop();
  console.log('Speech recognition has stopped.');
}
}

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action);
  var voices = synth.getVoices();

  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === `Google UK English Male`) {
      utterThis.voice = voices[i];
    }
  }

  synth.cancel();//https://stackoverflow.com/questions/41539680/speechsynthesis-speak-not-working-in-chrome
  console.log(utterThis)
  synth.speak(utterThis);
};



            let y = 0;
            
            const showFirstSlideOnPageLoad = () => {
                const slides = document.querySelectorAll('.slides');
            
                //hide all the slides
                for(let a = 0; a < slides.length; a++){
                    slides[a].style.display = 'none';
                }                

                slides[0].style.display = 'block';

            }
            
            showFirstSlideOnPageLoad();
            
            const index = (i) =>{
            
                //select all the slides
                const slides = document.querySelectorAll('.slides');
            
                //hide all the slides
                for(let a = 0; a < slides.length; a++){
                    slides[a].style.display = 'none';
                }
            
                slides[y].style.display = 'block';
            
                y = y + i;
            
                if (y < 0){
                    y = slides.length - 1;
                }
            
                if (y >= slides.length ){
                    y = 0;
                }
            
            
                console.log(y);
            }