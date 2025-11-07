export interface EmotionOption {
  id: string;
  label: string;
  emoji: string;
  image: string;
  color: string;
  bgColor: string;
  borderColor: string;
  verses: Array<{
    reference: string;
    text: string;
    encouragement: string;
  }>;
}

export const emotionOptions: EmotionOption[] = [
  {
    id: "very-anxious",
    label: "Very Anxious",
    emoji: "😰",
    image: "/assets/anxious.webp",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "#dc2626",
    verses: [
      {
        reference: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        encouragement: "God invites you to bring your worries to Him. His peace is available to you right now."
      }
    ]
  },
  {
    id: "stressed",
    label: "Stressed/Overwhelmed",
    emoji: "😫",
    image: "/assets/stressed.webp",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "#ea580c",
    verses: [
      {
        reference: "Matthew 11:28-30",
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        encouragement: "Jesus offers you rest. Take a deep breath and remember that you can find peace in Him."
      }
    ]
  },
  {
    id: "sad",
    label: "Sad/Depressed",
    emoji: "😔",
    image: "/assets/sad.webp",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "#2563eb",
    verses: [
      {
        reference: "Psalm 34:18",
        text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        encouragement: "God is near to you in your pain. He sees your tears and wants to bring you comfort."
      }
    ]
  },
  {
    id: "okay",
    label: "Okay/Neutral",
    emoji: "👍",
    image: "/assets/normal.webp",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "#4b5563",
    verses: [
      {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you.",
        encouragement: "Even in neutral moments, God has wonderful plans for you."
      }
    ]
  },
  {
    id: "good",
    label: "Good/Calm",
    emoji: "😊",
    image: "/assets/calm.webp",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "#16a34a",
    verses: [
      {
        reference: "Psalm 28:7",
        text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
        encouragement: "It's wonderful that you're feeling good! Remember to give thanks to God for this peaceful moment."
      }
    ]
  },
  {
    id: "great",
    label: "Great/Peaceful",
    emoji: "😌",
    image: "/assets/peaceful.webp",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "#9333ea",
    verses: [
      {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him.",
        encouragement: "This joy and peace you're experiencing comes from God! Let it overflow and share this blessing with others."
      }
    ]
  }
];

