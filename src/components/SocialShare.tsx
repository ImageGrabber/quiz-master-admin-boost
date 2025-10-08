import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  className?: string;
  variant?: "card" | "inline" | "minimal";
  showTitle?: boolean;
  showDescription?: boolean;
  showUrl?: boolean;
  size?: "sm" | "md" | "lg";
  platforms?: ("facebook" | "twitter" | "linkedin" | "email" | "whatsapp")[];
}

const SocialShare = ({ 
  url, 
  title, 
  description, 
  className = "",
  variant = "card",
  showTitle = true,
  showDescription = true,
  showUrl = true,
  size = "md",
  platforms = ["facebook", "twitter", "linkedin", "email", "whatsapp"]
}: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareData = {
    url,
    title,
    description,
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Quiz link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const allShareButtons = [
    {
      platform: "facebook",
      label: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      platform: "twitter",
      label: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      platform: "email",
      label: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  const shareButtons = allShareButtons.filter(button => 
    platforms.includes(button.platform as any)
  );

  const sizeClasses = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3", 
    lg: "text-base px-8 py-4"
  };

  const buttonSizeClasses = {
    sm: "w-8 h-8",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  // Minimal variant - just buttons
  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {shareButtons.map(({ platform, label, icon: Icon, color }) => (
            <Button
              key={platform}
              onClick={() => handleShare(platform)}
              className={`${color} text-white ${sizeClasses[size]} min-w-[120px]`}
              size={size}
              title={`Share on ${label}`}
            >
            <Icon className={buttonSizeClasses[size]} />
            <span className="hidden sm:inline ml-1">{label}</span>
          </Button>
        ))}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          size={size}
          title="Copy link"
        >
          {copied ? (
            <Check className={buttonSizeClasses[size]} />
          ) : (
            <Copy className={buttonSizeClasses[size]} />
          )}
        </Button>
      </div>
    );
  }

  // Inline variant - horizontal layout
  if (variant === "inline") {
    return (
      <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
        {showTitle && (
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">Share</h3>
          </div>
        )}
        
        {showDescription && (
          <p className="text-xs text-gray-600 mb-3">
            Help others discover this content by sharing it!
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {shareButtons.map(({ platform, label, icon: Icon, color }) => (
            <Button
              key={platform}
              onClick={() => handleShare(platform)}
              className={`${color} text-white ${sizeClasses[size]} min-w-[120px]`}
              size={size}
            >
              <Icon className={buttonSizeClasses[size]} />
              <span className="ml-1">{label}</span>
            </Button>
          ))}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className={`${sizeClasses[size]} min-w-[120px]`}
            size={size}
          >
            {copied ? (
              <>
                <Check className={buttonSizeClasses[size]} />
                <span className="ml-1">Copied!</span>
              </>
            ) : (
              <>
                <Copy className={buttonSizeClasses[size]} />
                <span className="ml-1">Copy Link</span>
              </>
            )}
          </Button>
        </div>

        {showUrl && (
          <div className="mt-2 text-xs text-gray-500">
            <strong>URL:</strong> {url}
          </div>
        )}
      </div>
    );
  }

  // Card variant (default) - full card layout
  return (
    <Card className={`shadow-lg border-0 ${className}`}>
      <CardContent className="p-6">
        {showTitle && (
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Share This Content</h3>
          </div>
        )}
        
        {showDescription && (
          <p className="text-sm text-gray-600 mb-4">
            Help others discover this content by sharing it on social media!
          </p>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          {shareButtons.map(({ platform, label, icon: Icon, color }) => (
            <Button
              key={platform}
              onClick={() => handleShare(platform)}
              className={`${color} text-white flex items-center gap-2 ${sizeClasses[size]} min-w-[120px]`}
              size={size}
            >
              <Icon className={buttonSizeClasses[size]} />
              <span className="hidden sm:inline">{label}</span>
            </Button>
          ))}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className={`flex items-center gap-2 ${sizeClasses[size]} min-w-[120px]`}
            size={size}
          >
            {copied ? (
              <>
                <Check className={buttonSizeClasses[size]} />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className={buttonSizeClasses[size]} />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </Button>
        </div>

        {showUrl && (
          <div className="mt-3 text-xs text-gray-500">
            <strong>Share URL:</strong> {url}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialShare;
