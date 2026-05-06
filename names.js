const NameDatabase = {
    arabic: [
        { name: "محمد", transliteration: "Muhammad", clue: "Most common name in the Muslim world", hint: "Starts with م", category: "Religious" },
        { name: "أحمد", transliteration: "Ahmad", clue: "Another name meaning 'praiseworthy'", hint: "Starts with أ", category: "Religious" },
        { name: "عبدالله", transliteration: "Abdullah", clue: "Means 'servant of Allah'", hint: "Two words combined", category: "Religious" },
        { name: "فاطمة", transliteration: "Fatima", clue: "Daughter of Prophet Muhammad", hint: "Starts with ف", category: "Religious" },
        { name: "عائشة", transliteration: "Aisha", clue: "Beloved wife of Prophet Muhammad", hint: "Starts with ع", category: "Religious" },
        { name: "علي", transliteration: "Ali", clue: "Fourth caliph and cousin of Prophet", hint: "Short 2-letter name", category: "Religious" },
        { name: "حسن", transliteration: "Hassan", clue: "Grandson of Prophet Muhammad", hint: "Starts with ح", category: "Religious" },
        { name: "حسين", transliteration: "Hussein", clue: "Grandson of Prophet Muhammad (brother of Hassan)", hint: "Starts with ح", category: "Religious" },
        { name: "خديجة", transliteration: "Khadija", clue: "First wife of Prophet Muhammad", hint: "Starts with خ", category: "Religious" },
        { name: "عمر", transliteration: "Omar", clue: "Second caliph of Islam", hint: "Starts with ع", category: "Religious" },
        { name: "عثمان", transliteration: "Uthman", clue: "Third caliph of Islam", hint: "Starts with ع", category: "Religious" },
        { name: "يوسف", transliteration: "Yusuf", clue: "Prophet known for his beauty", hint: "Starts with ي", category: "Prophet" },
        { name: "موسى", transliteration: "Musa", clue: "Prophet who spoke to Allah directly", hint: "Starts with م", category: "Prophet" },
        { name: "إبراهيم", transliteration: "Ibrahim", clue: "Father of prophets", hint: "Starts with إ", category: "Prophet" },
        { name: "نوح", transliteration: "Nuh", clue: "Prophet who built the ark", hint: "Short 3-letter name", category: "Prophet" },
        { name: "سارة", transliteration: "Sara", clue: "Wife of Prophet Ibrahim", hint: "Starts with س", category: "Prophet" },
        { name: "مريم", transliteration: "Maryam", clue: "Mother of Prophet Isa (Jesus)", hint: "Starts with م", category: "Prophet" },
        { name: "زينب", transliteration: "Zainab", clue: "Granddaughter of Prophet Muhammad", hint: "Starts with ز", category: "Religious" },
        { name: "بلال", transliteration: "Bilal", clue: "First muezzin in Islam", hint: "Starts with ب", category: "Companion" },
        { name: "سلمان", transliteration: "Salman", clue: "Persian companion of Prophet", hint: "Starts with س", category: "Companion" },
        { name: "خالد", transliteration: "Khalid", clue: "Sword of Allah", hint: "Starts with خ", category: "Companion" },
        { name: "سعد", transliteration: "Saad", clue: "Companion known for generosity", hint: "Starts with س", category: "Companion" },
        { name: "أمير", transliteration: "Amir", clue: "Means 'prince' or 'commander'", hint: "Starts with أ", category: "Modern" },
        { name: "ليلى", transliteration: "Layla", clue: "Famous in Arabic poetry as beloved", hint: "Starts with ل", category: "Modern" },
        { name: "نور", transliteration: "Nour", clue: "Means 'light'", hint: "Short 3-letter name", category: "Modern" },
        { name: "رنا", transliteration: "Rana", clue: "Means 'beautiful' or 'gazing'", hint: "Starts with ر", category: "Modern" },
        { name: "كريم", transliteration: "Karim", clue: "Means 'generous'", hint: "Starts with ك", category: "Modern" },
        { name: "راشد", transliteration: "Rashid", clue: "Means 'rightly guided'", hint: "Starts with ر", category: "Modern" },
        { name: "نادية", transliteration: "Nadia", clue: "Means 'caller' or 'beginning'", hint: "Starts with ن", category: "Modern" },
        { name: "طارق", transliteration: "Tariq", clue: "Means 'morning star' or 'knocker'", hint: "Starts with ط", category: "Modern" }
    ],

    english: [
        { name: "William", clue: "Conqueror of England in 1066", hint: "Starts with W", category: "Royal" },
        { name: "Elizabeth", clue: "Longest-reigning British queen", hint: "Starts with E", category: "Royal" },
        { name: "Victoria", clue: "Empress of India, British queen", hint: "Starts with V", category: "Royal" },
        { name: "Henry", clue: "Had six wives, British king", hint: "Starts with H", category: "Royal" },
        { name: "Arthur", clue: "Legendary king with round table", hint: "Starts with A", category: "Legend" },
        { name: "Guinevere", clue: "Wife of King Arthur", hint: "Starts with G", category: "Legend" },
        { name: "Merlin", clue: "Wizard in Arthurian legend", hint: "Starts with M", category: "Legend" },
        { name: "Lancelot", clue: "Greatest knight of round table", hint: "Starts with L", category: "Legend" },
        { name: "John", clue: "Most common English name", hint: "Starts with J", category: "Common" },
        { name: "Mary", clue: "Second most common English name", hint: "Starts with M", category: "Common" },
        { name: "James", clue: "Biblical name, many kings had it", hint: "Starts with J", category: "Common" },
        { name: "Sarah", clue: "Wife of Abraham in Bible", hint: "Starts with S", category: "Biblical" },
        { name: "David", clue: "Defeated Goliath with a stone", hint: "Starts with D", category: "Biblical" },
        { name: "Rachel", clue: "Jacob's favorite wife in Bible", hint: "Starts with R", category: "Biblical" },
        { name: "Thomas", clue: "Doubting apostle in Bible", hint: "Starts with T", category: "Biblical" },
        { name: "Alice", clue: "Girl in Wonderland", hint: "Starts with A", category: "Literary" },
        { name: "Sherlock", clue: "Famous detective created by Doyle", hint: "Starts with S", category: "Literary" },
        { name: "Dracula", clue: "Famous vampire character", hint: "Starts with D", category: "Literary" },
        { name: "Heidi", clue: "Swiss girl in children's book", hint: "Starts with H", category: "Literary" },
        { name: "Oliver", clue: "Boy who asked for more porridge", hint: "Starts with O", category: "Literary" },
        { name: "Sophia", clue: "Wisdom personified", hint: "Starts with S", category: "Modern" },
        { name: "Liam", clue: "Strong-willed protector", hint: "Starts with L", category: "Modern" },
        { name: "Emma", clue: "Universal, complete", hint: "Starts with E", category: "Modern" },
        { name: "Noah", clue: "Rest, comfort", hint: "Starts with N", category: "Modern" },
        { name: "Ava", clue: "Life, living one", hint: "Short 3-letter name", category: "Modern" },
        { name: "Charlotte", clue: "Free woman", hint: "Starts with C", category: "Modern" },
        { name: "James", clue: "Supplanter", hint: "Starts with J", category: "Modern" },
        { name: "Benjamin", clue: "Son of the right hand", hint: "Starts with B", category: "Modern" },
        { name: "Mia", clue: "Mine or bitter", hint: "Short 3-letter name", category: "Modern" },
        { name: "Lucas", clue: "Bringer of light", hint: "Starts with L", category: "Modern" }
    ],

    scramble: function(name) {
        let arr = name.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    },

    getRandomName: function(type) {
        const list = type === 'arabic' ? this.arabic : this.english;
        return list[Math.floor(Math.random() * list.length)];
    },

    getHint: function(nameObj, level) {
        if (level === 1) return nameObj.hint;
        if (level === 2) return `Category: ${nameObj.category}`;
        return `Transliteration: ${nameObj.transliteration}`;
    }
};
