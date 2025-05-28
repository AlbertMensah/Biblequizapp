// questions.js
// ... (previous question data remains the same) ...

const allQuestions = [
    // LEVEL 1 (Normal Difficulty) - Very basic, well-known characters/stories
    // ... (Your existing questions for level 1 normal, 2 normal, 3 normal) ...
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
    // ... (Your existing questions for level 1 difficult, 2 difficult) ...
    // IMPORTANT: ADD MORE QUESTIONS HERE TO REACH OVER 20 LEVELS AND 500+ QUESTIONS
    // Remember to increment IDs, levels, and adjust difficulty.
    // Example:
    // {
    //     id: 51, level: 3, difficulty: "difficult", character_focus: "King Josiah",
    //     question_text: "Which young king of Judah repaired the Temple and found the Book of the Law?",
    //     options: ["Hezekiah", "Manasseh", "Josiah", "Amon"], correct_answer: "Josiah",
    //     motivation_message: "Fantastic! Josiah was a righteous king!"
    // },
    // {
    //     id: 52, level: 4, difficulty: "normal", character_focus: "Hannah",
    //     question_text: "Who prayed earnestly for a child and promised to dedicate him to the Lord?",
    //     options: ["Sarah", "Rebekah", "Rachel", "Hannah"], correct_answer: "Hannah",
    //     motivation_message: "Great job! Hannah was the mother of Samuel."
    // }
    // ... continue for many more levels and questions!
];

// Map questions by level and difficulty for easier access
const questionsByLevel = {};

allQuestions.forEach(q => {
    if (!questionsByLevel[q.level]) {
        questionsByLevel[q.level] = { normal: [], difficult: [] };
    }
    questionsByLevel[q.level][q.difficulty].push(q);
});

// No need to shuffle here initially, as script.js will shuffle
// when loading questions for a specific level/difficulty.
// This prevents modifying the original 'questionsByLevel' data
// if you were to access it multiple times for the same level.

// Function to shuffle an array (moved from global to local scope as it's used directly in script.js)
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }