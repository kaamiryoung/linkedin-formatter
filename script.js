document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const formatBtn = document.getElementById('formatBtn');
    const copyBtn = document.getElementById('copyBtn');
    const charCounter = document.getElementById('charCounter');
    const hashCounter = document.getElementById('hashCounter');
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const emojiBtn = document.getElementById('emojiBtn');
    const emojiPicker = document.querySelector('emoji-picker');
    const emojiPickerContainer = document.querySelector('.emoji-picker-container');
    // V2 Elements
    const previewContent = document.getElementById('linkedinPreviewContent'); // Target the content div specifically
    const hashtagListContainer = document.getElementById('hashtagList');

    const LINKEDIN_CHAR_LIMIT = 3000;
    const UNICODE_BULLET = '•'; // Define the bullet character to use

    // --- Unicode Character Maps --- (Make sure all maps are here)
    const unicodeMaps = {
        bold: { 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭', 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇', '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'},
        italic: { 'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡', 'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'},
        monospace: { 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉', 'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣', '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'}
    };

    // --- Stop Words --- (Make sure this list is complete)
    const stopWords = new Set([
        'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
        'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could',
        'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for',
        'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
        'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m',
        'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
        'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours',
        'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t',
        'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
        'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
        'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t',
        'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s',
        'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
        'yourselves', 'like', 'get', 'use', 'also', 'just', 'will', 'com'
    ]);

    // --- Event Listeners ---
    inputText.addEventListener('input', updateCounters);
    formatBtn.addEventListener('click', handleFormat);
    copyBtn.addEventListener('click', handleCopy);
    boldBtn.addEventListener('click', () => applyUnicodeStyleManually('bold'));
    italicBtn.addEventListener('click', () => applyUnicodeStyleManually('italic'));
    emojiBtn.addEventListener('click', toggleEmojiPicker);
    if (emojiPicker) {
      emojiPicker.addEventListener('emoji-click', handleEmojiSelect);
    }
    hashtagListContainer.addEventListener('click', addHashtagOnClick); // Uses the final corrected version below
    document.addEventListener('click', (event) => {
        if (emojiPickerContainer && !emojiPickerContainer.contains(event.target) && event.target !== emojiBtn) {
             emojiPickerContainer.style.display = 'none';
         }
     });

    // --- Helper Functions ---
    function updateCounters() {
        const text = inputText.value;
        const charCount = text.length;
        charCounter.textContent = `Characters: ${charCount} / ${LINKEDIN_CHAR_LIMIT}`;
        charCounter.style.color = charCount > LINKEDIN_CHAR_LIMIT ? 'red' : '#606770';
        charCounter.style.fontWeight = charCount > LINKEDIN_CHAR_LIMIT ? 'bold' : 'normal';

        const outputContent = outputText.value;
        const hashtags = outputContent.match(/#\w+/g) || [];
        hashCounter.textContent = `Hashtags: ${hashtags.length}`;
     }

    function transformToUnicode(text, type) {
        const map = unicodeMaps[type];
        if (!map) return text;
        let transformed = '';
        for (let char of text) {
            transformed += map[char] || char;
        }
        return transformed;
     }

    // --- V2 Preview Update Function ---
     function updatePreview(formattedText) {
        if (!previewContent) return;

        if (formattedText.trim() === '') {
            previewContent.innerHTML = '<p class="preview-placeholder">Preview will appear here after formatting...</p>';
            return;
        }

        // 1. Escape HTML characters in the input text FIRST
        let processedHtml = formattedText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // 2. Wrap Hashtags and Mentions in spans AFTER escaping
        // Hashtag: # followed by alphanumeric or underscore
        processedHtml = processedHtml.replace(/(#\w+)/g, '<span class="preview-hashtag">$1</span>');
        // Mention: @ followed by alphanumeric or underscore (basic)
        processedHtml = processedHtml.replace(/(@\w+)/g, '<span class="preview-mention">$1</span>');

        // 3. Set the innerHTML
        previewContent.innerHTML = processedHtml;
    }


    // --- V2.1 Intelligent Formatting Logic ---
    function handleFormat() {
        let text = inputText.value;

        // 1. Preprocessing
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        text = text.replace(/\t/g, '    ');
        text = text.trim();
        text = text.split('\n')
                   .filter(line => !/^\s*[-*_]{3,}\s*$/.test(line.trim()))
                   .join('\n');

        const lines = text.split('\n');
        const processedLines = [];
        let currentBlockType = null;
        let listMarkerType = null;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            let originalLine = lines[i]; // Keep original indentation for non-lists/headers

            if (line === '') {
                // Only add a single blank line if the previous wasn't already blank
                if (processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') {
                    processedLines.push('');
                }
                currentBlockType = null; // Reset block type on blank line
                continue;
            }

            // Apply Inline Formatting (Bold, Italic, Monospace) to the line content
            let formattedContent = originalLine.trimEnd(); // Preserve leading space for now
            formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, (match, p1) => transformToUnicode(p1, 'bold'));
            formattedContent = formattedContent.replace(/__(.*?)__/g, (match, p1) => transformToUnicode(p1, 'bold'));
            formattedContent = formattedContent.replace(/(?<!\w)_(?!_|\s)(.+?[^\s_])_(?!\w|_)/g, (match, p1) => transformToUnicode(p1, 'italic'));
            formattedContent = formattedContent.replace(/(?<![\w*])\*(?!\s|\*)(.+?[^\s*])\*(?![\w*])/g, (match, p1) => transformToUnicode(p1, 'italic'));
            formattedContent = formattedContent.replace(/`(.*?)`/g, (match, p1) => transformToUnicode(p1, 'monospace'));

            let blockChanged = false;
            let lineProcessed = false; // Flag if line was handled as header/list

            // Structure Detection
            const headerMatch = formattedContent.match(/^\s*(#{1,6})\s+(.*)/);
            const bulletListMatch = formattedContent.match(/^(\s*[*+\-])\s+(.*)/);
            const numberedListMatch = formattedContent.match(/^(\s*\d+\.)\s+(.*)/);
            const alphaListMatch = formattedContent.match(/^(\s*[a-zA-Z][.)])\s+(.*)/);

            // a) Handle Headers
            if (headerMatch) {
                 if (currentBlockType !== null && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') processedLines.push('');
                 processedLines.push(transformToUnicode(headerMatch[2].trim(), 'bold'));
                 currentBlockType = 'heading';
                 blockChanged = true;
                 lineProcessed = true;
            }
            // b) Handle Lists
            else if (bulletListMatch || numberedListMatch || alphaListMatch) {
                let marker, content;
                let detectedMarkerType;

                 if (bulletListMatch) { marker = UNICODE_BULLET; content = bulletListMatch[2]; detectedMarkerType = 'bullet'; }
                 else if (numberedListMatch) { marker = numberedListMatch[1].trim(); content = numberedListMatch[2]; detectedMarkerType = 'number'; }
                 else { marker = alphaListMatch[1].trim(); content = alphaListMatch[2]; detectedMarkerType = 'alpha'; }

                if (currentBlockType !== 'list' || listMarkerType !== detectedMarkerType) {
                     if (currentBlockType !== null && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') processedLines.push('');
                     currentBlockType = 'list';
                     listMarkerType = detectedMarkerType;
                     blockChanged = true;
                }
                processedLines.push(marker + ' ' + content); // Content already has inline formatting
                lineProcessed = true;
            }
             // c) Potential Heading Heuristic (Apply if not already processed) - Less reliable
            else if (!lineProcessed && currentBlockType !== 'list') {
                 const words = line.split(' ').filter(w => w);
                 if (line.length > 0 && line.length < 60 && words.length < 10) {
                     let titleCaseCount = 0;
                     words.forEach(word => { if (word.length > 0 && word[0] === word[0].toUpperCase()) titleCaseCount++; });
                     if (titleCaseCount / words.length > 0.6) {
                         if (currentBlockType !== null && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') processedLines.push('');
                         processedLines.push(transformToUnicode(line.trim(), 'bold'));
                         currentBlockType = 'heading';
                         blockChanged = true;
                         lineProcessed = true;
                     }
                 }
            }

            // d) Default to Paragraph
            if (!lineProcessed) {
                 if (currentBlockType !== 'paragraph') {
                     // Add space before new paragraph block, unless previous was blank
                     if (currentBlockType !== null && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') {
                        processedLines.push('');
                     }
                     currentBlockType = 'paragraph';
                     blockChanged = true;
                 }
                 processedLines.push(formattedContent.trim()); // Trim paragraph lines
            }
        } // End loop

        // Reassemble and final cleanup
        const finalFormattedText = processedLines.join('\n')
            .replace(/\n{3,}/g, '\n\n') // Collapse excess blank lines
            .trim();

        // Update UI
        outputText.value = finalFormattedText;
        updatePreview(finalFormattedText);
        suggestHashtags(finalFormattedText);
        updateCounters();
    }

    // --- Hashtag Suggestion Logic ---
     function suggestHashtags(text) {
        if (!text) { displayHashtags([]); return; }
        // Clean text for keyword extraction
        const cleanedText = text
            .toLowerCase()
            .replace(/<span class="preview-hashtag">#\w+<\/span>/g, '') // Remove preview spans if any linger
            .replace(/#\w+/g, '') // Remove actual hashtags
            .replace(/[^\w\s']/g, ' ') // Remove punctuation
            .replace(/\s+/g, ' '); // Normalize whitespace

        const words = cleanedText.split(' ');
        const wordFrequencies = new Map();
        words.forEach(word => {
            const trimmedWord = word.trim();
            if (trimmedWord.length > 2 && !stopWords.has(trimmedWord) && isNaN(trimmedWord)) {
                wordFrequencies.set(trimmedWord, (wordFrequencies.get(trimmedWord) || 0) + 1);
            }
        });
        const sortedKeywords = Array.from(wordFrequencies.entries()).sort((a, b) => b[1] - a[1]).slice(0, 7);
        // Simple tag gen, remove underscores which aren't valid in LI hashtags usually
        const suggestedTags = sortedKeywords.map(([word]) => `#${word.replace(/_/g,'')}`);
        displayHashtags(suggestedTags);
    }

    function displayHashtags(tags) {
        hashtagListContainer.innerHTML = '';
        if (tags.length === 0) { hashtagListContainer.innerHTML = '<p style="color:#888; font-size:0.9em;">No suggestions found.</p>'; return; }
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.type = 'button';
            button.classList.add('hashtag-suggestion');
            hashtagListContainer.appendChild(button);
        });
     }

    // --- CORRECTED Hashtag Click Handler (V2 - Final) ---
    function addHashtagOnClick(event) {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('hashtag-suggestion')) {
            const tagToAdd = event.target.textContent;
            let currentOutput = outputText.value; // Use let

            // Avoid adding duplicate hashtags
             if (new RegExp(`\\B${tagToAdd}\\b`).test(currentOutput)) {
                 event.target.style.opacity = '0.5';
                 event.target.disabled = true;
                 setTimeout(() => { event.target.style.opacity = '0.6'; }, 1000); // Restore default disabled opacity
                return;
            }

            // --- Logic to add Hashtags at the end, separated by newlines/spaces ---

            // 1. Trim trailing whitespace from the current output to analyze the end cleanly
            const trimmedOutput = currentOutput.trimEnd();

            // 2. Regex to check if the trimmed output ends with a block of hashtags
            //    Looks for optional space/newline then #word, followed by zero or more (space + #word), anchored to the end.
            const endsWithHashtagBlockRegex = /(?:^|\s)(#\w+(?:\s+#\w+)*)$/;
            const matchResult = trimmedOutput.match(endsWithHashtagBlockRegex);

            let newText;

            if (matchResult) {
                // CASE 1: Already ends with hashtags. Append with a single space.
                newText = trimmedOutput + ' ' + tagToAdd;
            } else {
                // CASE 2: Doesn't end with hashtags (or is empty). Add double newline separator.
                let separator = '\n\n';
                if (trimmedOutput === '') {
                    separator = ''; // No separator needed if the entire output was empty or just whitespace
                }
                newText = trimmedOutput + separator + tagToAdd;
            }

            // Update the text area
            outputText.value = newText;

            // --- END OF HASHTAG LOGIC ---


            // Update preview and counters
            updatePreview(outputText.value);
            updateCounters();

            // Disable the button after successful addition
            event.target.disabled = true;
            // CSS :disabled rule handles styling
        }
    }


    // --- V1 Helper Functions ---
    function applyUnicodeStyleManually(type) {
         const start = inputText.selectionStart; const end = inputText.selectionEnd;
         const selectedText = inputText.value.substring(start, end);
         if (!selectedText) return;
         const transformedText = transformToUnicode(selectedText, type);
         inputText.value = inputText.value.substring(0, start) + transformedText + inputText.value.substring(end);
         inputText.focus(); inputText.setSelectionRange(start, start + transformedText.length);
         updateCounters();
     }

    function handleCopy() {
         const textToCopy = outputText.value; if (!textToCopy) {
            copyBtn.textContent = 'Nothing to Copy';
            setTimeout(() => { copyBtn.textContent = 'Copy Formatted Text'; }, 1500);
            return;
         }
         navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied-feedback');
            setTimeout(() => {
                copyBtn.textContent = 'Copy Formatted Text';
                copyBtn.classList.remove('copied-feedback');
            }, 1500);
         }).catch(err => {
            console.error('Failed to copy text: ', err);
            copyBtn.textContent = 'Copy Failed!';
            copyBtn.style.backgroundColor = 'red';
             setTimeout(() => {
                copyBtn.textContent = 'Copy Formatted Text';
                copyBtn.style.backgroundColor = ''; // Reset style
             }, 2000);
         });
     }

    function toggleEmojiPicker() {
         if (!emojiPickerContainer) return; const isVisible = emojiPickerContainer.style.display === 'block';
         emojiPickerContainer.style.display = isVisible ? 'none' : 'block';
     }

    function handleEmojiSelect(event) {
         const emoji = event.detail.unicode; const start = inputText.selectionStart; const end = inputText.selectionEnd;
         inputText.value = inputText.value.substring(0, start) + emoji + inputText.value.substring(end);
         const newCursorPos = start + emoji.length; inputText.focus(); inputText.setSelectionRange(newCursorPos, newCursorPos);
         updateCounters();
     }

    // --- Initial Setup ---
    updateCounters();
    if (emojiPickerContainer) {
        emojiPickerContainer.style.display = 'none';
    }
    updatePreview(''); // Initialize preview pane
    displayHashtags([]); // Initialize hashtag area

    // --- Set Dynamic Copyright Year ---
    const yearSpan = document.getElementById('copyYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded