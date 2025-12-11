-- Add missing DELETE policy for posts
create policy "Users can delete their own posts" on public.posts 
  for delete using (auth.uid() = user_id);
