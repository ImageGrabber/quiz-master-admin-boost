DO $$
BEGIN
    -- 1. Posts -> Profiles (Author)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'posts_user_id_profiles_fkey') THEN
        ALTER TABLE public.posts ADD CONSTRAINT posts_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
    END IF;

    -- 2. Comments -> Profiles (Commenter)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_user_id_profiles_fkey') THEN
        ALTER TABLE public.comments ADD CONSTRAINT comments_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
    END IF;
    
    -- 3. Likes -> Profiles (Liker - Optional but good for integrity)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'likes_user_id_profiles_fkey') THEN
        ALTER TABLE public.likes ADD CONSTRAINT likes_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
    END IF;

    -- 4. Connections -> Profiles (Requester)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'connections_requester_id_profiles_fkey') THEN
        ALTER TABLE public.connections ADD CONSTRAINT connections_requester_id_profiles_fkey FOREIGN KEY (requester_id) REFERENCES public.profiles(id);
    END IF;

    -- 5. Connections -> Profiles (Receiver)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'connections_receiver_id_profiles_fkey') THEN
        ALTER TABLE public.connections ADD CONSTRAINT connections_receiver_id_profiles_fkey FOREIGN KEY (receiver_id) REFERENCES public.profiles(id);
    END IF;
END $$;
