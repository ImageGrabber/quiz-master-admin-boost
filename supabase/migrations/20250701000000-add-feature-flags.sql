-- Create feature_flags table for admin UI toggles
create table if not exists feature_flags (
  id serial primary key,
  key text unique not null,
  value boolean not null default false
);

-- Insert initial flag for hiding membership section
insert into feature_flags (key, value) values ('hide_membership_section', false)
on conflict (key) do nothing; 