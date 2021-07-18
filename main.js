Baari="";
Meri_Ammi="";
left_wristx=0;
left_wristy=0;
right_wristx=0;
right_wristy=0;
score_rightWrist=0;
score_leftWrist=0;
Baari_status="";
Meri_Ammi_status="";

function preload(){
Baari=loadSound('Baari_1.mp3');
Meri_Ammi=loadSound('Meri_Pyaari_Ammi.mp3');
}

function setup(){
canvas=createCanvas(400,400);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,model_Loaded);
posenet.on("pose", gotPoses);
}

function model_Loaded(){
console.log("Model Loaded");
}

function draw(){
    image(video, 0, 0, 400, 400);
    fill('#ff00000');
    stroke('#fff000');

    Baari_status=Baari.isPlaying();
    Meri_Ammi_status=Meri_Ammi.isPlaying();

    if(score_leftWrist>0.2){
    circle(left_wristx,left_wristy,20);
    Meri_Ammi.stop();

    if(Baari_status==false){
    Baari.play();
    document.getElementById("song_name").innerHTML="Song: Baari";
    }
    }

    if(score_rightWrist>0.2){
        circle(right_wristx,right_wristy,20);
        Baari.stop();
    
        if(Meri_Ammi_status==false){
        Meri_Ammi.play();
        document.getElementById("song_name").innerHTML="Song:Meri Pyaari Ammi";
        }
        }
}

function gotPoses(results){
if(results.length>0){
console.log(results);

score_leftWrist=results[0].pose.keypoints[9].score;
console.log("Score Of Left Wrist= "+score_leftWrist);

score_rightWrist=results[0].pose.keypoints[10].score;
console.log("Score Of Right Wrist= "+score_rightWrist);


left_wristx=results[0].pose.leftWrist.x;
left_wristy=results[0].pose.leftWrist.y;

right_wristx=results[0].pose.rightWrist.x;
right_wristy=results[0].pose.rightWrist.y;

console.log("Left wristx= " + left_wristx + "Left wristy= " + left_wristy);
console.log("Right wristx=" + right_wristx + "Right wristy= " + right_wristy);
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}