import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSocialShare } from "@/hooks/useSocialShare";

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const ShareButton = ({ 
  url, 
  title, 
  description, 
  variant = "outline",
  size = "md",
  className = "",
  children
}: ShareButtonProps) => {
  const { shareToNative } = useSocialShare();

  const handleShare = () => {
    shareToNative({ url, title, description });
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className={className}
    >
      {children || (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  );
};

export default ShareButton;
