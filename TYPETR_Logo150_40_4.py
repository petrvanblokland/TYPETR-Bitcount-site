# -----------------------------------------------------------------------------
#     Copyright (c) 2016+ Type Network, www.typenetwork.com, www.pagebot.io
#
#     P A G E B O T
#
#     Licensed under MIT conditions
#     Made for usage in DrawBot, www.drawbot.com
# -----------------------------------------------------------------------------
#
#     TYPETR_Logo150_40_4.py
#
import os
from random import choice

import pagebot
from pagebot.fonttoolbox.objects.family import getFamilyFontPaths
from pagebot import newFS, textBoxBaseLines

typetrStoreUrl = 'https://store.typenetwork.com/foundry/typetr'
#EXPORT_PATH = '_export/TYPETR_Logo.gif'
EXPORT_PATH = 'response/img/TYPETR_Logo.gif'

USE_BITPATH = False

# Initial sample text. Can be altered in the text box of the popup window.
W = 150 # Width of the sample image. TypeNetwork preference 2040 x 1020
H = 40 # Height of the sample image
#W = 1360 # Width of the sample image. TypeNetwork preference 2040 x 1020
#H = 1020 # Height of the sample image
padding = 2 # Padding between text and image side.
#t = u'π-day' #Typetr' # Initial sample string
t = 'Bitcount' # Initial sample string
monoSpaced = True
backgroundColor = None #(0, 0, 0)#(1, 1, 1) #0.1, 0.2, 0.5
italics = False
layers = 2
color = True
frames = 5
fd = 0.2 # Frame duration

# Bitcount is made from 3 spacing sets: 
#    - Monospaced (Grid, Mono)
#    - Proportional (Prop)
# Define the family name of fonts that we want to use, 
# including the type of spacing.
if monoSpaced:
    familyName = 'BitcountMono'
else:
    familyName = 'BitcountProp'
# Just get paths of the fonts, not the Font objects. 
# We want quick interactive response.
# Call imported method, to find all installed Bitcount fonts.
fontNamePaths = getFamilyFontPaths(familyName) 
if not italics:
    for fontName in fontNamePaths.keys():
        if 'Italic' in fontName:
            del fontNamePaths[fontName]
#print fontNamePaths

fontNames = [
    'BitcountPropDouble-BoldCircle',  
    'BitcountPropDouble-MediumCircle',  
    'BitcountPropDouble-RegularCircle',  
    'BitcountPropDouble-BookCircle',  
    'BitcountPropDouble-LightCircle',  
]
"""
features = dict(
    kern = True,
    liga = Ligatures,
    zero = Slashed_Zero,
    frac = Fraction,
    smcp = Smallcaps,
    c2sc = Caps_As_Smallcaps,
    ss08 = Italic_Shapes,
    ss07 = Condensed,
    ss01 = Extended_Ascenders,
    ss02 = Extended_Capitals,
    ss03 = Extended_Descenders,
    ss05 = No_Contrast_Pixel,
    ss04 = Contrast_Pixel,
    ss09 = Alternative_g,
    onum = LC_Figures,
)
"""
# Define method to show a random sample
def drawSample(tt):
    drawCycle(tt, (1, 1, 1), 40)
    #drawCycle(tt, (1, 1, 0))
    drawCycle(tt, (1, 0, 0), 40)
    #drawCycle(tt, (1, 0, 1))
    #drawCycle(tt, (0, 0, 1))
    #drawCycle(tt, (0, 0, 0))
    
def drawCycle(tt, c, n):
    fss1 = getFittingString(tt, fontNames[0], (0, 0, 0))
    for nn in range(n):
        drawLayers(fss1, None) # Draw layers on several identical frames
    for frame in range(frames):
        fss2 = getFittingString(tt, fontNames[frames-frame-1], c)
        drawLayers(fss1, fss2) # Draw layers on several identical frames
    for frame in range(frames):
        fss2 = getFittingString(tt, fontNames[frame], c)
        drawLayers(fss1, fss2) # Draw layers on several identical frames
            
            
def getFittingString(t, fontName, c):
    # Make formatted string of large type. 
    # Then see if it fits and calculate the fitting size.
    # First guess, to see if constructed formatted string fits.
    
    # Calculate the size for the given string for the selected font/spacing.
    # Then use the resulting with as source to calculate the fitting fontSize.
    initialFontSize = 500 
    fs = newFS(t, None, style=dict(font=fontName, openTypeFeatures=dict(ss02=True,ss05=True),
        fontSize=initialFontSize, rTracking=0.05))
    fsWidth, fsHeight = fs.size()
    fontSize =  initialFontSize * (W-3*padding) / fsWidth
    # Make new formatted string in fitting fontSize
    fs = newFS(t, None, dict(font=fontName, openTypeFeatures=dict(ss02=True,ss05=True), 
        fontSize=fontSize, textFill=c, rTracking=0.05))
    return fs
        
def drawLayers(fs1, fs2):
    # Draw this layer in a couple of frame
    newPage(W, H)
    frameDuration(fd)
    #fill(backgroundColor[0],backgroundColor[1],backgroundColor[2])
    #rect(0, 0, W, H)
    y = 3.5*padding
    #print fs1, fs2
    text(fs1, (2.35*padding, y))
    if fs2 is not None:
        text(fs2, (2.35*padding, y))

if __name__ == '__main__':     
    # If no Bitcount fonts could be found, open the browser on the TypeNetwork shop page and stop this script.
    if not fontNamePaths:
        os.system('open %s/fonts/%s' % (typetrStoreUrl, 'bitcount')) #familyName.lower())
    else:
        tts = 'TYPETR'
        drawSample(tts)

        saveImage(EXPORT_PATH) # Save the sample as file or animated gif.
        
        