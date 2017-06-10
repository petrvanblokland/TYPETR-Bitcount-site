
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function getRandomOpacity(start) {
    return Math.floor(255*(start + (1-start)*Math.random()));
}
function getRandomColor() {
    var colors = [
        [0, 0, 0],
        [1, 0.1+0.9*Math.random(), 1],
        [0.5, 0.1+0.9*Math.random(), 1],
        [0.1+0.9*Math.random(), 1, 1],
        [0.1+0.9*Math.random(), 0.5, 1],
        [0, 0, 0.1+0.9*Math.random()],                 
        /*[0.6, 1, 0.9*0.1*Math.random(), opacity], */

        [1, 0.1+0.9*Math.random(), 1],
        [0.5, 0.1+0.9*Math.random(), 1],
        [0.1+0.9*Math.random(), 1, 1],
        [0.1+0.9*Math.random(), 0.5, 1],
        [0, 0, 0.1+0.9*Math.random()],                 
        /*[0.6, 1, 0.9*0.1*Math.random(), opacity],*/

        [1, 0.1+0.9*Math.random(), 1],
        [0.5, 0.1+0.9*Math.random(), 1],
        [0.9+0.1*Math.random(), 1, 1],
        [0.9+0.1*Math.random(), 0.5, 1],
        [0, 0, 0.1+0.9*Math.random()],                 
        /*[0.6, 1, 0.9*0.1*Math.random(), opacity],*/
    ];
    var color = colors[Math.floor(Math.random()*colors.length)];
    return rgbToHex(Math.floor(color[0]*255), Math.floor(color[1]*255), Math.floor(color[2]*255));
}


var fontNamesDoubleBackground = [
    'BitcountMonoDoubleRegularCircle',
    'BitcountMonoDoubleRegularSquare',

    'BitcountMonoDoubleMediumCircle',
    'BitcountMonoDoubleMediumSquare',

    'BitcountMonoDoubleBoldCircle',
    'BitcountMonoDoubleBoldSquare'
];
var fontNamesDoubleForground = [
    'BitcountMonoDoubleLightCircle',
    'BitcountMonoDoubleLightSquare',
    'BitcountMonoDoubleLightPlus',

    'BitcountMonoDoubleBookCircle',
    'BitcountMonoDoubleBookSquare',
    'BitcountMonoDoubleBookPlus',

    'BitcountMonoDoubleRegularPlus',
    'BitcountMonoDoubleMediumPlus',
    'BitcountMonoDoubleBoldPlus',

    /* Line */
    'BitcountMonoDoubleLightLineCircle',
    'BitcountMonoDoubleLightLineSquare',

    'BitcountMonoDoubleBookLineCircle',
    'BitcountMonoDoubleBookLineSquare',

    'BitcountMonoDoubleRegularLineCircle',
    'BitcountMonoDoubleRegularLineSquare',

    'BitcountMonoDoubleMediumLineCircle',
    'BitcountMonoDoubleMediumLineSquare',

    'BitcountMonoDoubleBoldLineCircle',
    'BitcountMonoDoubleBoldLineSquare'
];
var fontNamesDouble = [].concat(fontNamesDoubleBackground, fontNamesDoubleForground);

var fontNamesSingleBackground = [
    'BitcountMonoSingleRegularCircle',
    'BitcountMonoSingleRegularSquare',

    'BitcountMonoSingleMediumCircle',
    'BitcountMonoSingleMediumSquare',

    'BitcountMonoSingleBoldCircle',
    'BitcountMonoSingleBoldSquare'
];
var fontNamesSingleForground = [
    'BitcountMonoSingleLightCircle',
    'BitcountMonoSingleLightSquare',
    'BitcountMonoSingleLightPlus',

    'BitcountMonoSingleBookCircle',
    'BitcountMonoSingleBookSquare',
    'BitcountMonoSingleBookPlus',

    'BitcountMonoSingleRegularPlus',
    'BitcountMonoSingleMediumPlus',
    'BitcountMonoSingleBoldPlus',

    /* Line */
    'BitcountMonoSingleLightLineCircle',
    'BitcountMonoSingleLightLineSquare',

    'BitcountMonoSingleBookLineCircle',
    'BitcountMonoSingleBookLineSquare',

    'BitcountMonoSingleRegularLineCircle',
    'BitcountMonoSingleRegularLineSquare',

    'BitcountMonoSingleMediumLineCircle',
    'BitcountMonoSingleMediumLineSquare',

    'BitcountMonoSingleBoldLineCircle',
    'BitcountMonoSingleBoldLineSquare'
];
var fontNamesSingle = [].concat(fontNamesSingleBackground, fontNamesSingleForground);

var fontNames = fontNamesDouble;
var fontNamesForground = fontNamesDoubleForground;

var layerCnt = 4;
var stemType = 'double';
var posture = 'italic'; /* Will toggle on init to roman. */
var border = '1px solid #0000FF';
var doShift = true;

function selectShift(flag){
    if (flag == -1)
        flag = !doShift;
    doShift = flag;
    if (doShift){
        document.getElementById('selectShift').style['border'] = border;
        document.getElementById('selectNoShift').style['border'] = 'none';
    } else {        
        document.getElementById('selectShift').style['border'] = 'none';
        document.getElementById('selectNoShift').style['border'] = border;
    }
    makeNewLayers();
}

function useShortSample(isShort){
    var s;
    if (isShort){
        // the width of browser is more then 700px
        s = 'Bit</br>';
    } else
        // the width of browser is less then 700px
        s = 'Bitcount</br>';

    document.getElementById('player1').innerHTML = s;
    document.getElementById('player2').innerHTML = s;
    document.getElementById('player3').innerHTML = s;
    document.getElementById('player4').innerHTML = s;
}

/* https://modernweb.com/using-media-queries-in-javascript/ */
var mq = window.matchMedia('all and (max-width: 991px)');
mq.addListener(function(changed) {
    useShortSample(changed.matches);
});

function selectStem(selectedStemType){
    if (selectedStemType == 'toggle'){
        if (stemType == 'single')
            selectedStemType = 'double';
        else if (stemType == 'double')
            selectedStemType = 'mix';
        else 
            selectedStemType = 'single';
    }
    if (selectedStemType == 'single'){
        fontNames = fontNamesSingle;
        fontNamesForground = fontNamesSingleForground;
        document.getElementById('selectSingle').style['border'] = border;
        document.getElementById('selectDouble').style['border'] = 'none';
        document.getElementById('selectMix').style['border'] = 'none';
    } else if (selectedStemType == 'double'){
        fontNames = fontNamesDouble;
        fontNamesForground = fontNamesDoubleForground;
        document.getElementById('selectSingle').style['border'] = 'none';
        document.getElementById('selectDouble').style['border'] = border;
        document.getElementById('selectMix').style['border'] = 'none';
    } else { /* selectedStemType == 'mix' */
        fontNames = [].concat(fontNamesSingle, fontNamesDouble);
        fontNamesForground = [].concat(fontNamesSingleForground, fontNamesDoubleForground);
        document.getElementById('selectSingle').style['border'] = 'none';
        document.getElementById('selectDouble').style['border'] = 'none';
        document.getElementById('selectMix').style['border'] = border;
    }
    stemType = selectedStemType;
    makeNewLayers();
}
function selectLayers(layers){
    document.getElementById('selectLayer1').style['border'] = 'none';
    document.getElementById('selectLayer2').style['border'] = 'none';
    document.getElementById('selectLayer3').style['border'] = 'none';
    document.getElementById('selectLayer4').style['border'] = 'none';
    if (layers == 0){
        layerCnt += 1;
        if (layerCnt > 4) layerCnt = 1;
    } else layerCnt = layers;
    document.getElementById('selectLayer'+layerCnt).style['border'] = border;
    makeNewLayers();
}
function toggleRomanItalic(){
    if (posture == 'normal'){
        posture = 'italic';
        document.getElementById('selectRoman').style['border'] = 'none';
        document.getElementById('selectItalic').style['border'] = border;
    } else { /* Italic */
        posture = 'normal'
        document.getElementById('selectRoman').style['border'] = border;
        document.getElementById('selectItalic').style['border'] = 'none';
    }
    makeNewLayers();
}
function makeNewLayers(){
    var css;
    var randomNumber1 = Math.floor(Math.random()*fontNamesForground.length);
    var randomNumber2 = Math.floor(Math.random()*fontNamesForground.length);
    var randomNumber3 = Math.floor(Math.random()*fontNames.length);
    var randomNumber4 = Math.floor(Math.random()*fontNames.length);

    var shifts = [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,3,4,5,6];

    var e, c, f, o;
    var x = 0;
    var y = 0;
    e = document.getElementById('playroom_content')
    /*e.style.lineHeight = Math.random()*0.02; /*0.0;*/

    e = document.getElementById('player1');
    e.style.color = c = getRandomColor();
    e.style.opacity = o = getRandomOpacity(0.8);
    e.style.fontFamily = f = fontNamesForground[randomNumber1];
    e.style.fontStyle = posture;
    if (doShift){
        x = shifts[Math.floor(Math.random()*shifts.length)];
        y = shifts[Math.floor(Math.random()*shifts.length)];
    }
    e.style.left = x+'px';
    e.style.top = y+'px';
    css = ".layer1 {font-family:"+f+"; style:"+posture+"; color:"+c+"; opacity:"+o+"; left:"+x+"px; top:"+y+"px;}<br>";

    e = document.getElementById('player2');
    e.style.color = c = getRandomColor();
    e.style.opacity = o = getRandomOpacity(0.8);
    e.style.fontFamily = f = fontNamesForground[randomNumber2];
    e.style.fontStyle = posture;
    if (layerCnt >= 2){
        if (doShift){
            x += shifts[Math.floor(Math.random()*shifts.length)];
            y += shifts[Math.floor(Math.random()*shifts.length)];
        }
        e.style.left = x+'px';
        e.style.top = y+'px';
        e.style.display = 'block';
        css += ".layer2 {font-family:"+f+"; style:"+posture+"; color:"+c+"; opacity:"+o+"; left:"+x+"px; top:"+y+"px;}<br>";
    } else
        e.style.display = 'none';
    
    e = document.getElementById('player3');
    e.style.color = c = getRandomColor();
    e.style.opacity = o = getRandomOpacity(0.5);
    e.style.fontFamily = f = fontNames[randomNumber3];
    e.style.fontStyle = posture;
    if (layerCnt >= 3){
        if (doShift){
            x += shifts[Math.floor(Math.random()*shifts.length)];
            y += shifts[Math.floor(Math.random()*shifts.length)];
        }
        e.style.left = x+'px';
        e.style.top = y+'px';
        e.style.display = 'block';
        css += ".layer3 {font-family:"+f+"; style:"+posture+"; color:"+c+"; opacity:"+o+"; left:"+x+"px; top:"+y+"px;}<br>";
    } else
        e.style.display = 'none';
    
    e = document.getElementById('player4');
    e.style.color = c = getRandomColor();
    e.style.opacity = o = getRandomOpacity(0.5);
    e.style.fontFamily = f = fontNames[randomNumber4];
    e.style.fontStyle = posture;
    if (layerCnt >= 4){
        if (doShift){
            x += shifts[Math.floor(Math.random()*shifts.length)];
            y += shifts[Math.floor(Math.random()*shifts.length)];
        }
        e.style.left = x+'px';
        e.style.top = y+'px';
        e.style.display = 'block';
        css += ".layer4 {font-family:"+f+"; style:"+posture+"; color:"+c+"; opacity:"+o+"; left:"+x+"px; top:"+y+"px;}<br>";
    } else
        e.style.display = 'none';

    document.getElementById('css_sample').innerHTML = css;
    document.getElementById('layerCnt').innerHTML = layerCnt;
};

useShortSample($(window).width() < 991);
toggleRomanItalic();
selectShift(1);
selectStem('double');
selectLayers(4);
makeNewLayers();
