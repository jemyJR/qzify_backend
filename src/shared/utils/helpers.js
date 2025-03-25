
exports.shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

exports.generateAttemptTitle = function (categories) {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return categories.length === 1 ? `${categories[0]} Quiz - ${date}` : `General Quiz - ${date}`;
}

exports.generateQuizTime= function (numQuestions) {
    const startTime = new Date()
    
    let totalMinutes;
    
    if (numQuestions <= 0) {
      throw new Error("No questions provided");
    } else if (numQuestions <= 5) {
      totalMinutes = 10; // Minimum 10 minutes for 1-5 questions
    } else if (numQuestions <= 15) {
      totalMinutes = numQuestions * 2; // 2 minutes per question for 6-15 questions
    } else if (numQuestions <= 30) {
      totalMinutes = numQuestions * 1.5; // 1.5 mins/question for 16-30 questions
    } else {
      totalMinutes = numQuestions * 1; // 1 minute per question for 30+ questions
    }
      const endTime = new Date(
      startTime.getTime() + (totalMinutes * 60 * 1000)
    );
  
    return {
      startTime,
      endTime,
      totalMinutes
    };
  }