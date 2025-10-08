import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSocialShare } from "@/hooks/useSocialShare";

interface WhatsAppShareProps {
  url: string;
  title: string;
  description?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppShare = ({ 
  url, 
  title, 
  description = "",
  variant = "default",
  size = "md",
  className = "",
  children
}: WhatsAppShareProps) => {
  const { share } = useSocialShare();

  const handleShare = () => {
    share("whatsapp", { 
      url, 
      title, 
      description: description || title 
    });
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      {children || (
        <>
          <MessageCircle className="w-4 h-4 mr-2" />
          Share on WhatsApp
        </>
      )}
    </Button>
  );
};

export default WhatsAppShare;
