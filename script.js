const inputText = document.getElementById('inputText');
const markdownContainer = document.getElementsByClassName('markdownContainer')[0];

window.onload = () => {
    const text = localStorage.getItem('markdownText');
    const html = localStorage.getItem('markdownHtml');

    if (text) inputText.innerHTML = text;
    if (html) markdownContainer.innerHTML = html;
};

inputText.addEventListener('input', event => {
    let code = '';
    let html = ''
    let prevChar = '';

    const activeTags = [];
    const headingType = null;

    const text = event.target.value;
    const textArray = [...text];

    const specialCharRegex = /[#*]/;

    textArray.forEach(char => {
        switch(char) {
            case '#': {
                code += '#';
                break;
            }
            case '*': {
                const currentActiveTag = activeTags[activeTags.length - 1]; 
                if (
                    !specialCharRegex.test(prevChar)
                    && (
                        currentActiveTag === '</em>'
                        || currentActiveTag === '</strong>'
                        || currentActiveTag === '</em></strong>'
                    )
                ) {
                    const tag = activeTags.pop();
                    html += tag;
                }

                code += '*';
                break;
            }
            case ' ': {
                if (code === '#') {
                    activeTags.push('</h1>');
                    html += '<h1>'
                } else if (code === '##') {
                    activeTags.push('</h2>');
                    html += '<h2>'
                } else if (code === '###') {
                    activeTags.push('</h3>');
                    html += '<h3>'
                } 

                code = '';
                html += ' ';
                break;
            }
            case '\n': {
                if (activeTags.length) {
                    for (let index = 0; index < activeTags.length; index++) {
                        const tag = activeTags.pop();
                        html += tag;
                    }
                }

                html += '</br>';
                break;
            }


            default: {
                if (code === '*') {
                    activeTags.push('</em>');
                    html += '<em>'
                } else if (code === '**') {
                    activeTags.push('</strong>');
                    html += '<strong>'
                } else if (code === '***') {
                    activeTags.push('</em></strong>');
                    html += '<strong><em>'
                }
                code = '';

                html += char;
                break;
            }
        }

        prevChar = char; 
    });

    markdownContainer.innerHTML = html;
    localStorage.setItem('markdownText', text);
    localStorage.setItem('markdownHtml', html);
});
