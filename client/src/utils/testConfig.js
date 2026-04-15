const testConfig = {
  stress: {
    title: "Stress Analysis",
    description: "Identify physiological strain and recovery patterns using biometric markers.",
    time: "2-3 min",
    questions: [
      { q: "How often have you felt unable to control the important things in your life?", r: false },
      { q: "How often have you felt nervous and stressed during the past month?", r: false },
      { q: "How often have you felt confident about your ability to handle personal problems?", r: true },
      { q: "How often have you felt that things were going your way?", r: true },
      { q: "How often have you found that you could not cope with all the things you had to do?", r: false },
      { q: "How often have you been able to control irritations in your life?", r: true },
      { q: "How often have you felt that you were on top of things?", r: true },
      { q: "How often have you been angered because of things that were outside of your control?", r: false },
      { q: "How often have you felt difficulties were piling up so high that you could not overcome them?", r: false },
      { q: "How often have you felt that you were effectively coping with important changes?", r: true }
    ],
    categories: [
      { min: 0, max: 25, label: "Low", msg: "You're handling things well. Your stress levels are minimal.", tips: ["Continue healthy routines", "5-min morning meditation"] },
      { min: 26, max: 50, label: "Mild", msg: "You're experiencing some pressure, but it's manageable.", tips: ["Organize tasks", "Light stretching session"] },
      { min: 51, max: 75, label: "Moderate", msg: "Your stress levels are elevated. Relaxation techniques could help.", tips: ["Take a walk in nature", "Check in with a friend"] },
      { min: 76, max: 100, label: "High", msg: "Significant strain. Prioritize your mental health right now.", tips: ["Deep breathing exercises", "Consider professional support"] }
    ]
  },
  anxiety: {
    title: "Anxiety Test",
    description: "Advanced pattern detection for state and trait anxiety indices.",
    time: "3 min",
    questions: [
      { q: "How often have you felt nervous, anxious, or on edge?", r: false },
      { q: "How often have you been unable to stop or control worrying?", r: false },
      { q: "How often have you worried too much about different things?", r: false },
      { q: "How often have you had trouble relaxing?", r: false },
      { q: "How often have you been so restless that it's hard to sit still?", r: false },
      { q: "How often have you felt easily annoyed or irritable?", r: false },
      { q: "How often have you felt afraid as if something awful might happen?", r: false },
      { q: "How often have you felt confident in social situations?", r: true }
    ],
    categories: [
      { min: 0, max: 25, label: "Low", msg: "Minimal anxiety detected. You appear socially and emotionally calm.", tips: ["Maintain social connections", "Practice gratitude"] },
      { min: 26, max: 50, label: "Mild", msg: "Mild anxiety. Some worrying is present but likely not disruptive.", tips: ["Limit caffeine", "Try journaling"] },
      { min: 51, max: 75, label: "Moderate", msg: "Moderate anxiety. Worrying may be affecting your daily tasks.", tips: ["Cognitive reframing", "Consistent sleep schedule"] },
      { min: 76, max: 100, label: "High", msg: "High anxiety. Systematic support is recommended.", tips: ["Grounding techniques", "Talk to a therapist"] }
    ]
  },
  depression: {
    title: "Depression Check",
    description: "Clinical-grade screening for depressive states and emotional resonance.",
    time: "3 min",
    questions: [
      { q: "How often have you had little interest or pleasure in doing things?", r: false },
      { q: "How often have you felt down, depressed, or hopeless?", r: false },
      { q: "How often have you had trouble falling or staying asleep?", r: false },
      { q: "How often have you felt tired or had little energy?", r: false },
      { q: "How often have you had a poor appetite or been overeating?", r: false },
      { q: "How often have you felt like a failure or let yourself down?", r: false },
      { q: "How often have you had trouble concentrating on activities?", r: false },
      { q: "How often have you felt moving or speaking so slowly people noticed?", r: false }
    ],
    categories: [
      { min: 0, max: 25, label: "Minimal", msg: "Minimal symptoms of depression.", tips: ["Get sunlight exposure", "Stay active"] },
      { min: 26, max: 50, label: "Mild", msg: "Mild symptoms. Monitor your mood carefully.", tips: ["Socialize with loved ones", "Improve diet"] },
      { min: 51, max: 75, label: "Moderate", msg: "Moderate symptoms. Seeking support is advisable.", tips: ["Set small daily goals", "Therapeutic activities"] },
      { min: 76, max: 100, label: "Severe", msg: "Severe symptoms detected. Please seek professional help.", tips: ["Emergency contacts", "Professional counseling"] }
    ]
  },
  personality: {
    title: "Personality Scan",
    description: "Jungian-inspired behavioral archetype profiling and trait analysis.",
    time: "5 min",
    questions: [
      { q: "I feel energized after spending time with a large group of people.", r: false },
      { q: "I prefer working alone rather than in a team.", r: true },
      { q: "I am usually the first to start a conversation with strangers.", r: false },
      { q: "I spend a lot of time reflecting on my internal thoughts.", r: true },
      { q: "I enjoy being the center of attention at social events.", r: false },
      { q: "I find small talk exhausting and prefer deep conversations.", r: true },
      { q: "I handle multi-tasking and busy environments with ease.", r: false },
      { q: "I need significant 'alone-time' to recharge my batteries.", r: true }
    ],
    categories: [
      { min: 0, max: 35, label: "Introvert", msg: "You gain energy from within. You value depth and reflection.", tips: ["Schedule quiet periods", "Deep-work focus"] },
      { min: 36, max: 65, label: "Balanced", msg: "You scale between social and solitary needs effectively.", tips: ["Balance social & solo appts", "Versatile networking"] },
      { min: 66, max: 100, label: "Extrovert", msg: "You thrive on external stimulus and social interaction.", tips: ["Engage in group activities", "Public speaking roles"] }
    ]
  },
  emotional: {
    title: "Emotional Balance",
    description: "Measures affective regulation, mood stability, and internal harmony.",
    time: "3 min",
    questions: [
      { q: "My mood remains consistent even when things go wrong.", r: false },
      { q: "I find it easy to let go of negative emotions quickly.", r: false },
      { q: "I often feel overwhelmed by my feelings.", r: true },
      { q: "I can accurately identify what am I feeling in the moment.", r: false },
      { q: "Recent events have caused my mood to swing significantly.", r: true },
      { q: "I have effective ways to calm myself down when upset.", r: false },
      { q: "I react strongly to small irritations.", r: true },
      { q: "I feel in control of my emotional responses.", r: false }
    ],
    categories: [
      { min: 0, max: 35, label: "Imbalanced", msg: "You may be struggling with emotional regulation currently.", tips: ["Emotional labeling", "Mindful breathing"] },
      { min: 36, max: 65, label: "Slightly Imbalanced", msg: "Your balance is generally good, with occasional swings.", tips: ["Self-reflection", "Stress management"] },
      { min: 66, max: 100, label: "Stable", msg: "You demonstrate high emotional resilience and stability.", tips: ["Help others regulate", "Maintain current practices"] }
    ]
  },
  focus: {
    title: "Focus Patterns",
    description: "Analyze cognitive clarity, attentional resilience, and mental flow.",
    time: "4 min",
    questions: [
      { q: "I can stay focused on a single task for over 30 minutes.", r: false },
      { q: "I get distracted easily by my surroundings or devices.", r: true },
      { q: "I can quickly return to my flow state after an interruption.", r: false },
      { q: "I have trouble following long instructions or complex texts.", r: true },
      { q: "I find myself daydreaming when I'm supposed to be working.", r: true },
      { q: "I can manage my priorities without losing site of the goal.", r: false },
      { q: "I often feel 'brain fog' during productive hours.", r: true },
      { q: "I am able to direct my attention where I want it to go.", r: false }
    ],
    categories: [
      { min: 0, max: 35, label: "Low Focus", msg: "Your attention may be fractured or overwhelmed.", tips: ["Pomodoro technique", "Digital detox"] },
      { min: 36, max: 65, label: "Average", msg: "Your focus is functional but has room for optimization.", tips: ["Single-tasking", "Organized workspace"] },
      { min: 66, max: 100, label: "High Focus", msg: "You have excellent cognitive control and flow state access.", tips: ["Deep work sessions", "Strategic planning"] }
    ]
  }
};

export default testConfig;
