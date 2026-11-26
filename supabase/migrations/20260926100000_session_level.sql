-- Every session gets a level so attendees can pick talks that match their
-- experience. Like `track`, it is an enum: the allowed values live in the
-- schema and `pnpm db:types` generates a union type from them.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Add the column nullable first so the existing rows can be filled in, then
-- make it required. Re-running the update is harmless.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions
set level = case id
  when 'opening-keynote' then 'beginner'::public.session_level
  when 'build-your-agentic-workflow' then 'intermediate'::public.session_level
  when 'server-components-deep-dive' then 'advanced'::public.session_level
  when 'rsc-payload-budget' then 'advanced'::public.session_level
  when 'agent-context-windows' then 'intermediate'::public.session_level
  when 'micro-frontends-2026' then 'intermediate'::public.session_level
  when 'testing-ai-generated-code' then 'beginner'::public.session_level
  when 'closing-panel' then 'beginner'::public.session_level
  else 'intermediate'::public.session_level
end
where level is null;

alter table public.sessions
  alter column level set not null;
