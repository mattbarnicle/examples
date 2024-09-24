export const videoModule1 = {
  _id: 201,
  title: 'Warm-Up and Cool-Down Essentials',
  description: `
    Explains the importance of warming up and cooling down before and after exercise.
    Demonstrates effective warm-up exercises for different muscle groups.
    Guides you through a comprehensive cool-down routine to stretch and relax muscles.
  `,
};

export const videoModule2 = {
  _id: 202,
  title: 'Basic Gym Equipment Guide',
  description: `
    Introduction to common gym equipment such as treadmills, weight machines, free weights, and resistance bands.
    Explains how to use each piece of equipment safely and effectively.
    Provides tips on selecting the right equipment for different fitness goals.
  `,
};

export const videoModule3 = {
  _id: 203,
  title: 'Fundamental Bodyweight Exercises',
  description: `
    Covers essential bodyweight exercises like push-ups, squats, lunges, planks, and burpees.
    Demonstrates proper form and technique for each exercise.
    Offers modifications for different fitness levels and abilities.
  `,
};

export const videoModule4 = {
  _id: 204,
  title: 'Strength Training Workouts',
  description: `
    Contains comprehensive strength training workouts that target all major muscle groups.
    Focuses on compound exercises that work multiple muscles simultaneously.
    Provides tips for choosing appropriate weights and repetitions.
  `,
};

export const videoModule5 = {
  _id: 205,
  title: 'Cardiovascular Workouts',
  description: `
    Contains engaging cardio workouts that elevate heart rate and improve endurance.
    Includes a mix of steady-state cardio (like running or cycling) and interval training (like HIIT).
    Offers options for different fitness levels and preferences.
  `,
};

export const videoModule6 = {
  _id: 206,
  title: 'Flexibility and Mobility Exercises',
  description: `
    Guides you through stretches and mobility drills to improve flexibility, range of motion, and joint health.
    Targets major muscle groups and focus on holding stretches for 30-60 seconds.
    Addresses common tight spots and postural issues.
  `,
};

export const videoModule7 = {
  _id: 207,
  title: 'Targeted Muscle Group Workouts',
  description: `
    Contains specialized workouts for specific muscle groups, such as chest, back, shoulders, arms, legs, and core.
    Includes exercises that target the desired muscles and provide progressive overload.
    Uses a variety of exercises to keep workouts interesting and effective.
  `,
};

export const videoModule8 = {
  _id: 208,
  title: 'Workout Routines for Different Fitness Goals',
  description: `
    Create workout programs tailored to specific fitness goals, such as weight loss, muscle building, endurance improvement, or overall fitness.
    Provide guidance on designing workouts that balance strength training, cardio, and flexibility.
    Offer tips for tracking progress and modifying workouts as needed.
  `,
};

export const videoModule9 = {
  _id: 209,
  title: 'Nutrition Tips for Optimal Results',
  description: `
    Discusses the importance of nutrition for supporting gym workouts and achieving fitness goals.
    Provides guidance on macronutrient intake (protein, carbohydrates, and fat) and calorie needs.
    Offers tips on meal planning, pre- and post-workout nutrition, and hydration.
  `,
};

export const videoModule10 = {
  _id: 210,
  title: 'Preventing Injuries and Overtraining',
  description: `
    Educates on common gym injuries and how to prevent them.
    Emphasizes the importance of proper form, warm-ups, cool-downs, and rest periods.
    Provides tips for identifying signs of overtraining and taking appropriate steps to recover.
  `,
};

export const videoCourse = {
  _id: 100,
  type: 'module',
  name: 'Example video module course',
  modules: [
    {
      videoModule: videoModule1,
      prerequisiteLevels: { allOf: [], oneOfEach: [] },
      level: 1,
    },
    {
      videoModule: videoModule2,
      prerequisiteLevels: { allOf: [ 1 ], oneOfEach: [] },
      level: 2,
    },
    {
      videoModule: videoModule3,
      prerequisiteLevels: { allOf: [ 1 ], oneOfEach: [] },
      level: 3,
    },
    {
      videoModule: videoModule4,
      prerequisiteLevels: { allOf: [ 1 ], oneOfEach: [] },
      level: 4,
    },
    {
      videoModule: videoModule5,
      prerequisiteLevels: { allOf: [ 1 ], oneOfEach: [] },
      level: 5,
    },
    {
      videoModule: videoModule6,
      prerequisiteLevels: { allOf: [ 1, 8 ], oneOfEach: [] },
      level: 6,
    },
    {
      videoModule: videoModule7,
      prerequisiteLevels: { allOf: [ 1, 3 ], oneOfEach: [] },
      level: 7,
    },
    {
      videoModule: videoModule8,
      prerequisiteLevels: { allOf: [ 1 ], oneOfEach: [ [ 4, 5 ] ] },
      level: 8,
    },
    {
      videoModule: videoModule9,
      prerequisiteLevels: { allOf: [ 1, 6, 8 ], oneOfEach: [] },
      level: 9,
    },
    {
      videoModule: videoModule10,
      prerequisiteLevels: { allOf: [ 1, 3, 7 ], oneOfEach: [ [ 4, 5 ], [ 6, 9, 11 ] ] },
      level: 10,
    },
  ],
};
