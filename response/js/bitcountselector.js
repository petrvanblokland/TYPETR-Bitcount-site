function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

var fontNamesDoubleBackground = [
    'BitcountMonoDoubleBoldCircle',
    'BitcountMonoDoubleBoldSquare',
    'BitcountMonoDoubleSquare',
    'BitcountMonoDoubleCircle',
    'BitcountMonoDoubleMediumCircle',
    'BitcountMonoDoubleMediumSquare'
];
var fontNamesDoubleForground = [
    'BitcountMonoDoubleBoldLineCircle',
    'BitcountMonoDoubleBoldLineSquare',
    'BitcountMonoDoubleBoldPlus',
    'BitcountMonoDoubleBookCircle',
    'BitcountMonoDoubleBookLineCircle',
    'BitcountMonoDoubleBookLineSquare',
    'BitcountMonoDoubleBookPlus',
    'BitcountMonoDoubleBookSquare',
    'BitcountMonoDoubleLightCircle',
    'BitcountMonoDoubleLightLineCircle',
    'BitcountMonoDoubleLightLineSquare',
    'BitcountMonoDoubleLightPlus',
    'BitcountMonoDoubleLightSquare',
    'BitcountMonoDoubleLightCircle',
    'BitcountMonoDoubleLineSquare',
    'BitcountMonoDoubleMediumLineCircle',
    'BitcountMonoDoubleMediumLineSquare',
    'BitcountMonoDoubleMediumPlus',
    'BitcountMonoDoublePlus'
];
var fontNamesDouble = [].concat(fontNamesDoubleBackground, fontNamesDoubleForground);

var fontNamesSingleBackground = [
    'BitcountMonoSingleBoldCircle',
    'BitcountMonoSingleBoldSquare',
    'BitcountMonoSingleCircle',
    'BitcountMonoSingleSquare',
    'BitcountMonoSingleMediumCircle',
    'BitcountMonoSingleMediumSquare'
];
var fontNameSingleForground = [
    'BitcountMonoSingleBoldLineCircle',
    'BitcountMonoSingleBoldLineSquare',
    'BitcountMonoSingleBoldPlus',
    'BitcountMonoSingleBookCircle',
    'BitcountMonoSingleBookLineCircle',
    'BitcountMonoSingleBookLineSquare',
    'BitcountMonoSingleBookPlus',
    'BitcountMonoSingleBookSquare',
    'BitcountMonoSingleLightCircle',
    'BitcountMonoSingleLightLineCircle',
    'BitcountMonoSingleLightLineSquare',
    'BitcountMonoSingleLightPlus',
    'BitcountMonoSingleLightSquare',
    'BitcountMonoSingleLightCircle',
    'BitcountMonoSingleLineSquare',
    'BitcountMonoSingleMediumLineCircle',
    'BitcountMonoSingleMediumLineSquare',
    'BitcountMonoSingleMediumPlus',
    'BitcountMonoSinglePlus'
];
var fontNamesSingle = [].concat(fontNamesSingleBackground, fontNameSingleForground);

var fontNames = fontNamesDouble;
var fontNamesForground = fontNamesDoubleForground;

var layerCnt = 2;
var stemType = 'single';
var posture = 'normal';
var border = '1px solid #0000FF';

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
        document.getElementById('selectSingle').style['border'] = 'none';
        document.getElementById('selectDouble').style['border'] = border;
        document.getElementById('selectMix').style['border'] = 'none';
    } else { /* selectedStemType == 'mix' */
        fontNames = [].concat(fontNamesSingle, fontNamesDouble);
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

    var e, c1, c2, c3, c4, f1, f2, f3, f4;
    e = document.getElementById('playroom_content')
    e.style.lineHeight = Math.random()*0.02; /*0.0;*/

    e = document.getElementById('player1');
    e.style.color = c1 = getRandomColor();
    e.style.fontFamily = f1 = fontNamesForground[randomNumber1];
    e.style.fontStyle = posture;
    css = ".layer1 {color:"+c1+"; font-family:"+f1+"; style:"+posture+";}<br>";

    e = document.getElementById('player2');
    e.style.color = c2 = getRandomColor();
    e.style.fontFamily = f2 = fontNamesForground[randomNumber2];
    e.style.fontStyle = posture;
    if (layerCnt >= 2){
        e.style.display = 'inline';
        css += ".layer2 {color:"+c2+"; font-family:"+f2+"; style:"+posture+";}<br>";
    } else
        e.style.display = 'none';
    
    e = document.getElementById('player3');
    e.style.color = c3 = getRandomColor();
    e.style.fontFamily = f3 = fontNames[randomNumber3];
    e.style.fontStyle = posture;
    if (layerCnt >= 3){
        e.style.display = 'inline';
        css += ".layer3 {color:"+c3+"; font-family:"+f3+"; style:"+posture+";}<br>";
    } else
        e.style.display = 'none';
    
    e = document.getElementById('player4');
    e.style.color = c4 = getRandomColor();
    e.style.fontFamily = f4 = fontNames[randomNumber4];
    e.style.fontStyle = posture;
    if (layerCnt >= 4){
        e.style.display = 'inline';
        css += ".layer4 {color:"+c4+"; font-family:"+f4+"; style:"+posture+";}";
    } else
        e.style.display = 'none';

    document.getElementById('css_sample').innerHTML = css;
    document.getElementById('layerCnt').innerHTML = layerCnt;
};

