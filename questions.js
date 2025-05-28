// questions.js

const allQuestions = [
    // LEVEL 1 (Normal Difficulty)
    {
        id: 1, level: 1, difficulty: "normal", character_focus: "Noah",
        question_text: "Who built a large ark to save his family and animals from a great flood?",
        options: ["Abraham", "Moses", "Noah", "David"], correct_answer: "Noah",
        motivation_message: "Excellent! Noah listened to God."
    },
    {
        id: 2, level: 1, difficulty: "normal", character_focus: "Joseph",
        question_text: "Which character had a beautiful coat of many colors given to him by his father?",
        options: ["Isaac", "Jacob", "Joseph", "Benjamin"], correct_answer: "Joseph",
        motivation_message: "That's right! Joseph's coat was very special."
    },
    {
        id: 3, level: 1, difficulty: "normal", character_focus: "Moses",
        question_text: "Who led the Israelites out of Egypt through the Red Sea?",
        options: ["Joshua", "Aaron", "Moses", "Caleb"], correct_answer: "Moses",
        motivation_message: "Fantastic! Moses was a great leader."
    },
    {
        id: 4, level: 1, difficulty: "normal", character_focus: "Adam and Eve",
        question_text: "Who were the very first man and woman created by God?",
        options: ["Cain and Abel", "Abraham and Sarah", "Adam and Eve", "Noah and his wife"], correct_answer: "Adam and Eve",
        motivation_message: "You got it! They lived in the Garden of Eden."
    },
    {
        id: 5, level: 1, difficulty: "normal", character_focus: "David",
        question_text: "Which young shepherd boy defeated the giant Goliath?",
        options: ["Saul", "Jonathan", "Samuel", "David"], correct_answer: "David",
        motivation_message: "Awesome! David was courageous!"
    },
    {
        id: 6, level: 1, difficulty: "normal", character_focus: "Abraham",
        question_text: "Who was promised by God that he would become the father of many nations?",
        options: ["Isaac", "Jacob", "Abraham", "Joseph"], correct_answer: "Abraham",
        motivation_message: "Super! Abraham had great faith."
    },
    {
        id: 7, level: 1, difficulty: "normal", character_focus: "Jonah",
        question_text: "Which prophet was swallowed by a great fish?",
        options: ["Elijah", "Elisha", "Jonah", "Isaiah"], correct_answer: "Jonah",
        motivation_message: "Wow! Jonah learned a big lesson."
    },
    {
        id: 8, level: 1, difficulty: "normal", character_focus: "Daniel",
        question_text: "Who was thrown into the lions' den but God protected him?",
        options: ["Shadrach", "Meshach", "Abednego", "Daniel"], correct_answer: "Daniel",
        motivation_message: "Amazing! Daniel trusted God."
    },
    {
        id: 9, level: 1, difficulty: "normal", character_focus: "Esther",
        question_text: "Which queen bravely saved her people, the Jews, from destruction?",
        options: ["Ruth", "Deborah", "Miriam", "Esther"], correct_answer: "Esther",
        motivation_message: "You're brilliant! Queen Esther was very brave."
    },
    {
        id: 10, level: 1, difficulty: "normal", character_focus: "Samson",
        question_text: "Who was known for his incredible strength, which came from his long hair?",
        options: ["Gideon", "Joshua", "Samson", "Caleb"], correct_answer: "Samson",
        motivation_message: "You nailed it! Samson had a special gift."
    },

    // LEVEL 1 (Difficult Difficulty)
    {
        id: 11, level: 1, difficulty: "difficult", character_focus: "Job",
        question_text: "Who remained faithful to God despite losing everything and suffering greatly?",
        options: ["Ezekiel", "Job", "Jeremiah", "Isaiah"], correct_answer: "Job",
        motivation_message: "Remarkable! Job's patience was truly inspiring."
    },
    {
        id: 12, level: 1, difficulty: "difficult", character_focus: "Elisha",
        question_text: "Which prophet miraculously multiplied a widow's oil?",
        options: ["Elijah", "Elisha", "Samuel", "Hosea"], correct_answer: "Elisha",
        motivation_message: "Spot on! Elisha performed many wonders."
    },
    // Add more difficult questions for Level 1 or other levels if you have them.
    // For now, I'm providing an example to ensure the data structure is valid.
    {
        id: 13, level: 2, difficulty: "normal", character_focus: "Elijah",
        question_text: "Who challenged the prophets of Baal on Mount Carmel?",
        options: ["Elisha", "Isaiah", "Elijah", "Jeremiah"], correct_answer: "Elijah",
        motivation_message: "Excellent! Elijah called down fire from heaven."
    },
    {
        id: 14, level: 2, difficulty: "difficult", character_focus: "Nehemiah",
        question_text: "Who led the rebuilding of Jerusalem's walls despite opposition?",
        options: ["Ezra", "Nehemiah", "Zerubbabel", "Cyrus"], correct_answer: "Nehemiah",
        motivation_message: "That's right! Nehemiah was a determined leader."
    }
    // ... continue for many more levels and questions up to MAX_LEVELS (20)
    // Make sure to add enough questions per level for both difficulties (e.g., 10 per level as per QUESTIONS_PER_LEVEL)
];

// Map questions by level and difficulty for easier access
const questionsByLevel = {};

allQuestions.forEach(q => {
    if (!questionsByLevel[q.level]) {
        questionsByLevel[q.level] = { normal: [], difficult: [] };
    }
    questionsByLevel[q.level][q.difficulty].push(q);
});

// No need for shuffleArray here, as it's defined in script.js and used when loading questions.
