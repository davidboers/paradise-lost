
importText = async function (book) {
    const fileName = `books/${book}.txt`;
    const selectors = document.getElementsByClassName('book-selector-on');
    let selector;
    for (let i in selectors) {
        selector = selectors[i];
        selector.className = 'book-selector';
    }
    selector = document.querySelector(`.book-selector#${book}`);
    selector.className = 'book-selector-on';

    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const response_text = await response.text();

    console.log(response_text);

    const partitioned_content = response_text.split(/\r?\n\r?\n/);
    const text_block = document.getElementById('text');
    text_block.innerHTML = ''; // Clear text box
    let total_lines = 1;
    for (let i in partitioned_content) {
        let block = partitioned_content[i].split(/\r?\n/);
        const block_elem = document.createElement('div');
        for (let l in block) {
            let line = block[l];

            const line_elem = document.createElement('div');

            const line_num_elem = document.createElement('div');
            line_num_elem.textContent = total_lines;
            if (total_lines % 5 == 0) {
                line_elem.className = 'line-wnum';
                line_num_elem.className = 'num';
                let tl_as_str = String(total_lines);
                if (line.startsWith(tl_as_str)) {
                    line = line.substring(tl_as_str.length);
                }
            } else {
                line_elem.className = 'line';
                line_num_elem.className = 'num-hover';
            }
            line_elem.appendChild(line_num_elem);

            const line_text_elem = document.createElement('span');
            line_text_elem.textContent = line;
            line_text_elem.className = 'line-text';
            line_elem.appendChild(line_text_elem);

            block_elem.appendChild(line_elem);
            total_lines++;
        }
        text_block.appendChild(block_elem);
        text_block.appendChild(document.createElement('br'));
    }
};