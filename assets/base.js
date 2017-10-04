//Generate wallet art with QR codes.
function generate(){
    var pubkey = document.getElementById("sPubkey").value;
    var privkey = document.getElementById("sPrivkey").value;
    
    if(pubkey.length<10 || privkey.length<10){
        alert('Please input a valid private and public key.');
        return;
    }

    var pubkey_qr = document.getElementById("pubkey_qr");
    pubkey_qr.innerHTML="";
    var privkey_qr = document.getElementById("privkey_qr");
    privkey_qr.innerHTML="";

    //Generate QR Codes
    new QRCode(pubkey_qr,{
        text:pubkey,
        width:100,
        height:100
    });

    new QRCode(privkey_qr,{
        text:privkey,
        width:128,
        height:128
    });

    //Fill in the keys
    document.getElementById("pubkey").innerHTML = pubkey;
    document.getElementById("pubkey_alt").innerHTML = pubkey;
    document.getElementById("privkey").innerHTML = privkey;
    document.getElementById("privkey_alt").innerHTML = privkey;

    //Unhide wallet art
    document.getElementsByClassName("wallet-wrap")[0].style.display = "block";
    document.getElementsByClassName("wallet-wrap")[1].style.display = "block";
}


//Generate a new Ripple Wallet Address
function generateAddress(){
    const api = new ripple.RippleAPI();
    api.on('error', (errorCode, errorMessage) => {
        console.log(errorCode + ': ' + errorMessage);
    });

    var generate = api.generateAddress();
    document.getElementById("sPubkey").value=generate.address;
    document.getElementById("sPrivkey").value=generate.secret;
    this.generate();
}

function doPrint(ctx){
    if(ctx=="front")
        document.getElementById('back').style.display="none";
    
    if(ctx=="back")
        document.getElementById('front').style.display="none";   
    
    window.print();
    document.getElementById('back').style.display="block";
    document.getElementById('front').style.display="block";
}

function closePopup(){
    var popups = document.getElementsByClassName("popup");
    for(var i=0; i<popups.length; i++){
        popups[i].style.display="none";
    }
}

function openPopup(ref){
    closePopup();
    var popup = document.getElementById(ref);
    if(popup)
        popup.style.display="block";
}