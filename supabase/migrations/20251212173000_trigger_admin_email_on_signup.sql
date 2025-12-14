-- Enable the pg_net extension to make HTTP requests
create extension if not exists "pg_net";

-- Function to handle new user signup
create or replace function public.handle_new_user_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  project_url text := 'https://kejiqzpfiyamjznpdjrp.supabase.co';
  admin_email text := 'mathewsteven1996@gmail.com';
  user_email text;
  user_name text;
  email_subject text := 'New User Registration';
  email_message text;
  request_body jsonb;
begin
  -- Get user email from the new record
  user_email := new.email;
  -- Try to get name from metadata, fallback to 'New User'
  user_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New User');

  -- Construct message
  email_message := format('A new user has registered with the following details:<br/><br/>Name: %s<br/>Email: %s<br/>Provider: %s', user_name, user_email, new.raw_app_meta_data->>'provider');

  -- Construct JSON body for the Edge Function
  request_body := jsonb_build_object(
    'email', admin_email,
    'userName', 'Admin',
    'subject', email_subject,
    'message', email_message,
    'emailType', 'custom'
  );

  -- Send POST request to the Edge Function
  -- Note: We are not sending an Authorization header, so the Edge Function must have 'Verify JWT' disabled
  -- OR you must provide a valid service_role key in the headers.
  perform net.http_post(
    url := project_url || '/functions/v1/send-admin-email',
    body := request_body,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlamlxenBmaXlhbWp6bnBkanJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTAzNzE2OCwiZXhwIjoyMDY2NjEzMTY4fQ.a-Yw-aRiBc7EICgveVTFfDOSYUXwRjm5Yu827cRRF6Q'
    )
  );
  
  return new;
end;
$$;

-- Create the trigger
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_signup();
