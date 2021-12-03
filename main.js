prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">';
    });
}
console.log('ml5.version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9VIUW8vKq/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "first prediction is"+prediction_1;
    speak_data_2 = "second prediction is"+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(result[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "This Is Looking Amazing";
        }
        else if(result[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "All The Best";
    }
    else{
        document.getElementById("result_emoji").innerHTML = "&#9996;";
        document.getElementById("quote").innerHTML = "That Was A Marvelous Victory";
    }
    }
}
