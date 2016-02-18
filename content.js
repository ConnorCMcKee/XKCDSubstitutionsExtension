// Function for determining if the replacement string should be capitalized
function determineCapitalization( oldString, newString ) {
    if (oldString.charAt(0) == oldString.charAt(0).toUpperCase()){
        return newString.charAt(0).toUpperCase() + newString.slice(1);
    } else {
        return newString;
    }
}

// Regexp/new phrase replacements
var replacements = [{ old: /debate/gi, new: 'dance-off' },
                    { old: /self\Wdriving/gi, new: 'uncontrollably-swerving' },
                    { old: /\bpoll/gi, new: 'psychic reading' },
                    { old: /candidate/gi, new: 'airbender' },
                    { old: /drone/gi, new: 'dog'},
                    { old: /vows to/gi, new: 'probably won\'t' },
                    { old: /at large/gi, new: 'very large' },
                    { old: /\bsuccessfully/gi, new: 'suddenly' },
                    { old: /expand/gi, new: 'physically expand' },
                    { old: /(first|second|third|1st|2nd|3rd)-degree/gi, new: 'friggin\' awful' },
                    { old: /an unknown number/gi, new: 'like hundreds' },
                    { old: /front\Wrunner/gi, new: 'blade runner' },
                    { old: /global/gi, new: 'spherical' },
                    { old: /no indication/gi, new: 'lots of signs' },
                    { old: /urged restraint by/gi, new: 'drunkenly egged on by' },
                    { old: /horsepower/gi, new: 'tons of horsemeat' },
                    { old: /witnesses/gi, new: 'these dudes I know' },
                    { old: /allegedly/gi, new: 'kinda probably' },
                    { old: /new study/gi, new: 'tumblr post' },
                    { old: /rebuild/gi, new: 'avenge' },
                    { old: /\bspace\b/gi, new: 'SPAAACE' },
                    { old: /google glass/gi, new: 'virtual boy' },
                    { old: /smartphone/gi, new: 'Pokedex' },
                    { old: /electric/gi, new: 'atomic' },
                    { old: /senator/gi, new: 'elf-lord' },
                    { old: /\bcar\b/gi, new: 'cat' },
                    { old: /\belection/gi, new: 'eating contest' },
                    { old: /congressional leaders/gi, new: 'river spirits' },
                    { old: /homeland security/gi, new: 'homestar runner' },
                    { old: /(could not|couldn't) be reached/gi, new: 'is guilty, and everyone knows it' }];

// Get all document elements
var elements = document.getElementsByTagName('*');

// Iterate through them
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // Iterate through all the child nodes
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        // Performs text replacement on appropriate nodes
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text;
            
            // Checks for each replacement
            for( var k = 0; k < replacements.length; k++ ){
                replacedText = replacedText.replace(replacements[k].old, function(x){ return determineCapitalization(x,replacements[k].new); });
            }
            
            // Specific check for minute/year swap
            replacedText = replacedText.replace(/year|minute/gi, function(x){ if(x.length>4){return 'year'}else{return 'minute'} });

            // Determines if text has changed and makes the swap
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}