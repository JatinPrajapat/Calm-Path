const gameConfig = {
  reaction: {
    id: "reaction",
    title: "Reaction Test",
    description: "Measure your neural processing speed and focus resilience.",
    skill: "Speed",
    skillTag: "speed",
    type: "reaction",
    instructions: "Click the screen as soon as it turns GREEN. Let's see how fast you are!",
    icon: "Zap",
    difficulty: "Basic"
  },
  memory: {
    id: "memory",
    title: "Memory Match",
    description: "Train your short-term memory by matching pairs.",
    skill: "Memory",
    skillTag: "memory",
    instructions: "Memorize the card positions and find all matching pairs in the shortest time.",
    icon: "Brain",
    type: "memory",
    difficulty: "Intermediate",
    route: "/games/memory",
  },
  focus: {
    id: "focus",
    title: "Focus Click",
    description: "Improve attentional control by tracking and clicking dynamic targets.",
    skill: "Focus",
    skillTag: "focus",
    type: "focus",
    instructions: "Click the targets as they appear on the screen. Try to be as fast and accurate as possible!",
    icon: "Target",
    difficulty: "Advanced"
  },
  pattern: {
    id: "pattern",
    title: "Pattern Recall",
    description: "Enhance working memory by recreating complex visual sequences.",
    skill: "Memory",
    skillTag: "memory",
    type: "pattern",
    instructions: "Watch the pattern of blocks lighting up and repeat it exactly in the same order.",
    icon: "Layers",
    difficulty: "Advanced"
  },
  zen: {
    id: "zen",
    title: "Zen Flow",
    description: "Meditative visual exercise to reduce cortisol and improve focus.",
    skill: "Focus",
    skillTag: "focus",
    type: "zen",
    instructions: "Keep your cursor on the moving target to maintain focus. The goal is fluid, steady tracking.",
    icon: "Activity",
    difficulty: "Basic"
  }
};

export default gameConfig;
