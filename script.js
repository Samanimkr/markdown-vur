const inputText = document.getElementById('inputText');
const markdownContainer = document.getElementsByClassName('markdownContainer')[0];


inputText.addEventListener('input', event => {
    let code = '';
    let html = ''

    const openedTags = [];
    const headingType = null;

    const val = [...event.target.value];

    val.forEach(char => {
        switch(char) {
            case '#': {
                code += '#';

                break;
            }
            case ' ': {
                if (code === '#') {
                    openedTags.push('h1');
                    html += '<h1>'
                } else if (code === '##') {
                    openedTags.push('h2');
                    html += '<h2>'
                } else if (code === '###') {
                    openedTags.push('h3');
                    html += '<h3>'
                }
                code = '';
                html += ' ';

                break;
            }
            case '\n': {
                const tag = openedTags.pop();
                if (tag === 'h1') html += '</h1>';
                if (tag === 'h2') html += '</h2>';
                if (tag === 'h3') html += '</h3>';

                html += '</br>';

                break;
            }


            default: {
                html += char;
                break;
            }
        }
    });

    markdownContainer.innerHTML = html;
});
