-- Create devotionals table
CREATE TABLE IF NOT EXISTS devotionals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE UNIQUE NOT NULL,
    title TEXT NOT NULL,
    verse TEXT NOT NULL,
    scripture TEXT NOT NULL,
    reflection TEXT NOT NULL,
    application TEXT NOT NULL,
    prayer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookup by date
CREATE INDEX IF NOT EXISTS idx_devotionals_date ON devotionals(date);

-- Seed with 15 sample devotionals
INSERT INTO devotionals (date, title, verse, scripture, reflection, application, prayer)
VALUES
('2025-07-01', 'Finding Peace in Prayer', 'Philippians 4:6-7', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'In today''s fast-paced world, anxiety can easily overwhelm us. Paul reminds us that prayer is our direct line to God''s peace.', 'Take time today to pray about your specific concerns. Thank God for His presence and trust in His peace.', 'Lord, help me to bring all my worries to You in prayer. Teach me to trust in Your peace that surpasses all understanding. Amen.'),
('2025-07-02', 'Strength in Weakness', '2 Corinthians 12:9', 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness."', 'God''s strength is most evident when we admit our weaknesses and rely on Him.', 'Acknowledge your weaknesses to God and ask Him to show His strength through you today.', 'Father, let Your strength be made perfect in my weakness. Help me to depend on You. Amen.'),
('2025-07-03', 'God''s Unfailing Love', 'Psalm 36:7', 'How priceless is your unfailing love, O God! People take refuge in the shadow of your wings.', 'God''s love is a safe haven in every storm. His love never fails.', 'Rest in God''s love today. Remember you are always safe in His care.', 'Thank You, Lord, for Your unfailing love. Help me to trust in Your protection. Amen.'),
('2025-07-04', 'Trusting God''s Plan', 'Jeremiah 29:11', '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."', 'God has a good plan for your life, even when you can''t see it.', 'Surrender your plans to God and trust Him for your future.', 'God, I trust Your plans for me. Lead me in hope and faith. Amen.'),
('2025-07-05', 'Light in Darkness', 'John 8:12', 'When Jesus spoke again to the people, he said, "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."', 'Jesus is our light in every dark situation. Follow Him and you will never be lost.', 'Ask Jesus to guide you today and shine His light on your path.', 'Jesus, be my light and guide me through every darkness. Amen.'),
('2025-07-06', 'The Lord is My Shepherd', 'Psalm 23:1', 'The Lord is my shepherd, I lack nothing.', 'God provides for all our needs as a loving Shepherd.', 'Trust God to provide for you today. He knows what you need.', 'Shepherd, thank You for caring for me and providing for all my needs. Amen.'),
('2025-07-07', 'New Mercies Every Morning', 'Lamentations 3:22-23', 'Because of the Lord''s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.', 'God''s mercy is new every day. No matter what happened yesterday, today is a fresh start.', 'Receive God''s mercy today and extend it to others.', 'Thank You, Lord, for Your new mercies every morning. Help me to walk in Your faithfulness. Amen.'),
('2025-07-08', 'Courage to Obey', 'Joshua 1:9', 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'God calls us to courage, not fear. He is always with us.', 'Step out in faith today, knowing God is with you.', 'God, give me courage to obey You and trust Your presence. Amen.'),
('2025-07-09', 'God''s Perfect Peace', 'Isaiah 26:3', 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.', 'Peace comes from trusting God, not from circumstances.', 'Fix your mind on God and trust Him for peace today.', 'Lord, keep me in Your perfect peace as I trust in You. Amen.'),
('2025-07-10', 'The Power of Forgiveness', 'Ephesians 4:32', 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.', 'Forgiveness frees us from bitterness and reflects God''s heart.', 'Forgive someone today as God has forgiven you.', 'Father, help me to forgive as You have forgiven me. Amen.'),
('2025-07-11', 'Hope in God', 'Romans 15:13', 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.', 'God is the source of true hope, joy, and peace.', 'Place your hope in God today, no matter your situation.', 'God of hope, fill me with Your joy and peace. Amen.'),
('2025-07-12', 'God''s Faithfulness', '1 Corinthians 1:9', 'God is faithful, who has called you into fellowship with his Son, Jesus Christ our Lord.', 'God always keeps His promises. He is faithful even when we are not.', 'Remember God''s faithfulness in your life and give thanks.', 'Thank You, Lord, for Your faithfulness. Help me to trust You more. Amen.'),
('2025-07-13', 'Joy in the Lord', 'Nehemiah 8:10', 'Do not grieve, for the joy of the Lord is your strength.', 'God''s joy gives us strength to face any challenge.', 'Choose joy today, regardless of your circumstances.', 'Lord, let Your joy be my strength today. Amen.'),
('2025-07-14', 'God Hears Our Prayers', '1 John 5:14', 'This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.', 'God always hears us when we pray according to His will.', 'Pray boldly today, knowing God is listening.', 'Father, thank You for hearing my prayers. Help me to pray according to Your will. Amen.'),
('2025-07-15', 'Rest for the Weary', 'Matthew 11:28', 'Come to me, all you who are weary and burdened, and I will give you rest.', 'Jesus invites us to find rest in Him when we are tired and overwhelmed.', 'Bring your burdens to Jesus and receive His rest today.', 'Jesus, I come to You for rest. Refresh my soul and give me peace. Amen.'); 