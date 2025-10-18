-- Create daily verses table with image support
CREATE TABLE IF NOT EXISTS daily_verses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  verse_reference VARCHAR(100) NOT NULL,
  verse_text TEXT NOT NULL,
  verse_text_hindi TEXT,
  explanation TEXT,
  explanation_hindi TEXT,
  application TEXT,
  application_hindi TEXT,
  prayer TEXT,
  prayer_hindi TEXT,
  image_url TEXT,
  image_alt_text VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_daily_verses_active ON daily_verses(is_active);
CREATE INDEX IF NOT EXISTS idx_daily_verses_display_order ON daily_verses(display_order);

-- Enable RLS
ALTER TABLE daily_verses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow everyone to read active daily verses
CREATE POLICY "Allow public read access to active daily verses" ON daily_verses
  FOR SELECT USING (is_active = true);

-- Allow authenticated users with admin role to manage daily verses
CREATE POLICY "Allow admin users to manage daily verses" ON daily_verses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_daily_verses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_daily_verses_updated_at
  BEFORE UPDATE ON daily_verses
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_verses_updated_at();

-- Insert some sample daily verses with images
INSERT INTO daily_verses (
  verse_reference,
  verse_text,
  verse_text_hindi,
  explanation,
  explanation_hindi,
  application,
  application_hindi,
  prayer,
  prayer_hindi,
  image_url,
  image_alt_text,
  display_order
) VALUES 
(
  'John 3:16',
  'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
  'क्योंकि परमेश्वर ने जगत से ऐसा प्रेम किया कि उसने अपना एकलौता पुत्र दे दिया, कि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।',
  'This is perhaps the most well-known verse in the Bible, often called ''the gospel in a nutshell.'' It reveals God''s incredible love for humanity - so great that He was willing to sacrifice His only Son for our salvation.',
  'यह शायद बाइबल में सबसे प्रसिद्ध पद है, जिसे अक्सर ''सुसमाचार का सार'' कहा जाता है। यह मानवता के लिए परमेश्वर के अविश्वसनीय प्रेम को प्रकट करता है।',
  'Remember that God''s love is unconditional and available to you right now. If you haven''t already, consider accepting this gift of eternal life through faith in Jesus Christ.',
  'याद रखें कि परमेश्वर का प्रेम बिना शर्त है और आपके लिए अभी उपलब्ध है।',
  'Thank you, God, for your incredible love that sent Jesus to save us. Help me to share this love with others today.',
  'हे परमेश्वर, हमें बचाने के लिए यीशु को भेजने वाले आपके अविश्वसनीय प्रेम के लिए धन्यवाद।',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  'Cross and light representing God''s love and salvation',
  1
),
(
  'Joshua 1:9',
  'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  'क्या मैं तुझे आज्ञा नहीं दी है? हियाव बान्धकर दृढ़ हो, और भयभीत न हो, और न हतोत्साहित हो; क्योंकि तेरा परमेश्वर यहोवा जहां कहीं तू जाए वहां तेरे संग रहेगा।',
  'God spoke these words to Joshua as he was about to lead the Israelites into the Promised Land. God''s promise wasn''t just about physical presence, but about His constant support, guidance, and protection.',
  'परमेश्वर ने ये शब्द यहोशू से कहे जब वह इस्राएलियों को वादा किए गए देश में ले जाने वाला था। परमेश्वर का वादा केवल शारीरिक उपस्थिति के बारे में नहीं था।',
  'When facing new challenges or stepping into unknown territory, remember that God is with you. His presence gives you the strength and courage to face whatever lies ahead.',
  'जब नई चुनौतियों का सामना करें या अज्ञात क्षेत्र में कदम रखें, तो याद रखें कि परमेश्वर आपके साथ है।',
  'Lord, help me to be strong and courageous, knowing that you are with me wherever I go. Remove my fear and discouragement with your presence.',
  'हे प्रभु, मुझे मजबूत और साहसी बनने में मदद करें, यह जानते हुए कि आप जहां भी मैं जाऊं वहां मेरे साथ हैं।',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  'Mountain landscape representing courage and strength',
  2
),
(
  'Philippians 4:6-7',
  'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
  'किसी भी बात की चिन्ता न करो, परन्तु हर एक बात में प्रार्थना और बिनती के द्वारा धन्यवाद के साथ अपनी बिनतियां परमेश्वर के सामने प्रगट करो।',
  'Paul wrote this while in prison, showing that God''s peace is available even in difficult circumstances. The key is bringing our worries to God in prayer with a thankful heart.',
  'पौलुस ने इसे जेल में रहते हुए लिखा, यह दिखाते हुए कि परमेश्वर की शांति कठिन परिस्थितियों में भी उपलब्ध है।',
  'When anxiety strikes, stop and pray. Thank God for His goodness, present your concerns to Him, and trust that He will provide peace that goes beyond what we can understand.',
  'जब चिंता आए, तो रुकें और प्रार्थना करें। उसकी भलाई के लिए परमेश्वर का धन्यवाद करें।',
  'Lord, I bring my worries to you now. Help me to trust in your peace that surpasses all understanding. Guard my heart and mind in Christ Jesus.',
  'हे प्रभु, मैं अब अपनी चिंताओं को आपके सामने लाता हूं। मुझे आपकी शांति में भरोसा करने में मदद करें।',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
  'Peaceful sunset representing God''s peace',
  3
);

-- Create function to get today's daily verse
CREATE OR REPLACE FUNCTION get_todays_daily_verse()
RETURNS TABLE (
  id UUID,
  verse_reference VARCHAR(100),
  verse_text TEXT,
  verse_text_hindi TEXT,
  explanation TEXT,
  explanation_hindi TEXT,
  application TEXT,
  application_hindi TEXT,
  prayer TEXT,
  prayer_hindi TEXT,
  image_url TEXT,
  image_alt_text VARCHAR(255)
) AS $$
DECLARE
  day_of_year INTEGER;
  total_verses INTEGER;
  verse_index INTEGER;
BEGIN
  -- Calculate day of year
  day_of_year := EXTRACT(DOY FROM CURRENT_DATE);
  
  -- Get total count of active verses
  SELECT COUNT(*) INTO total_verses 
  FROM daily_verses 
  WHERE is_active = true;
  
  -- Calculate which verse to show today (deterministic rotation)
  verse_index := (day_of_year % total_verses) + 1;
  
  -- Return the verse for today
  RETURN QUERY
  SELECT 
    dv.id,
    dv.verse_reference,
    dv.verse_text,
    dv.verse_text_hindi,
    dv.explanation,
    dv.explanation_hindi,
    dv.application,
    dv.application_hindi,
    dv.prayer,
    dv.prayer_hindi,
    dv.image_url,
    dv.image_alt_text
  FROM daily_verses dv
  WHERE dv.is_active = true
  ORDER BY dv.display_order
  LIMIT 1 OFFSET (verse_index - 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_todays_daily_verse() TO authenticated;
