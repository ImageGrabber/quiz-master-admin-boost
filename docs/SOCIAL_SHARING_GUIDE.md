# Social Sharing System

A comprehensive social sharing system for the Bible Quiz Competition website with multiple components and variants.

## Components

### 1. SocialShare Component

The main social sharing component with multiple variants and customization options.

#### Props

```typescript
interface SocialShareProps {
  url: string;                    // URL to share
  title: string;                  // Share title
  description: string;            // Share description
  className?: string;             // Additional CSS classes
  variant?: "card" | "inline" | "minimal";  // Display variant
  showTitle?: boolean;            // Show/hide title
  showDescription?: boolean;      // Show/hide description
  showUrl?: boolean;             // Show/hide URL
  size?: "sm" | "md" | "lg";     // Button size
  platforms?: ("facebook" | "twitter" | "linkedin" | "email" | "whatsapp")[];  // Which platforms to show
}
```

#### Variants

**Card Variant (Default)**
```tsx
<SocialShare
  url="https://biblequizcompetition.com/public-quiz/genesis"
  title="Genesis Quiz - Free Bible Quiz"
  description="Test your knowledge of Genesis with this free interactive Bible quiz."
  variant="card"
/>
```

**Inline Variant**
```tsx
<SocialShare
  url="https://biblequizcompetition.com/public-quiz/genesis"
  title="Genesis Quiz - Free Bible Quiz"
  description="Test your knowledge of Genesis with this free interactive Bible quiz."
  variant="inline"
  showTitle={false}
  showDescription={false}
/>
```

**Minimal Variant**
```tsx
<SocialShare
  url="https://biblequizcompetition.com/public-quiz/genesis"
  title="Genesis Quiz - Free Bible Quiz"
  description="Test your knowledge of Genesis with this free interactive Bible quiz."
  variant="minimal"
  platforms={["facebook", "twitter"]}
  size="sm"
/>
```

### 2. ShareButton Component

A simple share button that uses native sharing when available.

```tsx
<ShareButton
  url="https://biblequizcompetition.com/public-quiz/genesis"
  title="Genesis Quiz - Free Bible Quiz"
  description="Test your knowledge of Genesis with this free interactive Bible quiz."
  variant="outline"
  size="md"
>
  Share This Quiz
</ShareButton>
```

### 3. useSocialShare Hook

A custom hook for programmatic sharing.

```tsx
import { useSocialShare } from "@/hooks/useSocialShare";

const MyComponent = () => {
  const { share, copyToClipboard, shareToNative, copied } = useSocialShare();

  const handleShare = () => {
    share("facebook", {
      url: "https://biblequizcompetition.com/public-quiz/genesis",
      title: "Genesis Quiz - Free Bible Quiz",
      description: "Test your knowledge of Genesis with this free interactive Bible quiz."
    });
  };

  return (
    <button onClick={handleShare}>
      Share on Facebook
    </button>
  );
};
```

## Usage Examples

### Quiz Pages

```tsx
// Before quiz starts
<SocialShare
  url={`https://biblequizcompetition.com/public-quiz/${bookName.toLowerCase()}`}
  title={`${title} - Free Bible Quiz`}
  description={`Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding.`}
  variant="card"
/>

// After quiz completion
<SocialShare
  url={`https://biblequizcompetition.com/public-quiz/${bookName.toLowerCase()}`}
  title={`I scored ${score}% on the ${bookName} Bible Quiz!`}
  description={`I just took the ${bookName} Bible quiz and scored ${score}%! Test your knowledge too with this free interactive Bible quiz.`}
  variant="inline"
/>
```

### Article Pages

```tsx
<SocialShare
  url={`https://biblequizcompetition.com/articles/${articleId}`}
  title={article.title}
  description={article.excerpt}
  variant="card"
  showTitle={true}
  showDescription={true}
/>
```

### Header/Navigation

```tsx
<SocialShare
  url="https://biblequizcompetition.com"
  title="Bible Quiz Competition"
  description="Join weekly Bible quizzes, host live sessions, and climb the leaderboard."
  variant="minimal"
  platforms={["facebook", "twitter"]}
  size="sm"
/>
```

### Mobile-Friendly Sharing

```tsx
<ShareButton
  url="https://biblequizcompetition.com/public-quiz/genesis"
  title="Genesis Quiz - Free Bible Quiz"
  description="Test your knowledge of Genesis with this free interactive Bible quiz."
  variant="outline"
  size="sm"
>
  <Share2 className="w-4 h-4" />
  Share
</ShareButton>
```

## Supported Platforms

- **Facebook** - Opens Facebook share dialog
- **Twitter** - Opens Twitter compose with pre-filled text
- **LinkedIn** - Opens LinkedIn sharing interface
- **Email** - Opens email client with pre-filled subject/body
- **WhatsApp** - Opens WhatsApp with pre-filled message
- **Telegram** - Opens Telegram with pre-filled message
- **Native Sharing** - Uses device's native share sheet when available

## Features

- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Accessibility** - Proper ARIA labels and keyboard navigation
- ✅ **Toast Notifications** - User feedback for copy actions
- ✅ **Multiple Variants** - Card, inline, and minimal layouts
- ✅ **Customizable** - Choose platforms, sizes, and content
- ✅ **Native Sharing** - Uses device sharing when available
- ✅ **Fallback Support** - Graceful degradation for older browsers

## Best Practices

1. **Use appropriate variants** for different contexts
2. **Customize platforms** based on your audience
3. **Provide meaningful titles and descriptions** for better sharing
4. **Test on different devices** to ensure native sharing works
5. **Use minimal variant** for header/footer areas
6. **Use card variant** for main content areas
7. **Use inline variant** for article footers

## Integration

The social sharing system is now integrated into:

- ✅ Quiz pages (before and after completion)
- ✅ Article pages
- ✅ Homepage
- ✅ All public pages

Simply import and use the components anywhere in your app!
