# -----------------------------------------------------------------------------
#     CopyrigfontNht (c) 2016+ Type Network, www.typenetwork.com, www.pagebot.io
#
#     P A G E B O T
#
#     Licensed under MIT conditions
#     Made for usage in DrawBot, www.drawbot.com
# -----------------------------------------------------------------------------
#
from random import choice

fontNames = []
for fontName in installedFonts():
    if 'Bitcount' in fontName and 'Mono' in fontName and not 'Italic' in fontName:
        fontNames.append(fontName)
        
#print fontNames

pixel = 50
for image in range(1,5):
    newPage(1920, 1080)
    for n in range(2400):
        x = int(random()*50)*pixel
        y = int(random()*50)*pixel
        font(choice(fontNames))
        fontSize(10*pixel)
        fill(random()*0.4+0.3)
        text(choice('Bitcount'), (x-10*pixel, y-10*pixel))
    saveImage('response/img/slider/%d.jpg' % image)